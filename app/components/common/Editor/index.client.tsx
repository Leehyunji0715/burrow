import type Quill from 'quill';
import type { Delta, EmitterSource, Op, Range } from 'quill';
import 'quill/dist/quill.snow.css';
import { type Ref, useEffect, useLayoutEffect, useRef } from 'react';

type Props = {
  readOnly: boolean;
  defaultValue: Delta | Op[];
  // 메서드 축약 문법(onTextChange(...): void) 대신 함수 프로퍼티로 선언한다.
  // 축약 문법은 this 바인딩을 느슨하게 검사해 unbound-method 경고가 난다.
  onTextChange: (delta: Delta, oldContent: Delta, source: EmitterSource) => void;
  onSelectionChange: (range: Range, oldRange: Range, source: EmitterSource) => void;
  // React 19 부터 ref 를 일반 prop 으로 받는다 (forwardRef 불필요)
  ref?: Ref<Quill>;
};

// Editor is an uncontrolled React component
export const Editor = ({ readOnly, defaultValue, onTextChange, onSelectionChange, ref }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.enable(!readOnly);
    }
  }, [ref, readOnly]);

  useEffect(() => {
    // any 대신 Quill 타입을 쓴다. any 로 두면 이후 모든 사용이
    // no-unsafe-call / no-unsafe-member-access 로 걸린다.
    let quill: Quill | null = null;
    let editorContainer: HTMLDivElement | null = null;
    const container = containerRef.current;

    // SSR 방지: 동적 import (document is not defined 에러 남)
    import('quill')
      .then(({ default: Quill }) => {
        if (!container || container.hasChildNodes()) return;

        editorContainer = document.createElement('div');
        // container 로 이미 null 체크를 했으므로 그것을 쓴다.
        // (containerRef.current 를 다시 읽으면 체크가 무의미하다)
        container.appendChild(editorContainer);

        quill = new Quill(editorContainer, {
          theme: 'snow',
          readOnly,
          placeholder: '메시지를 입력하세요',
        });

        if (typeof ref === 'function') {
          ref(quill); // 함수형 ref 처리
        } else if (ref) {
          ref.current = quill; // 객체형 ref 처리
        }

        if (defaultValue) {
          quill.setContents(defaultValue);
        }

        quill.on(
          Quill.events.TEXT_CHANGE,
          (delta: Delta, oldContent: Delta, source: EmitterSource) => {
            onTextChangeRef.current?.(delta, oldContent, source);
          },
        );

        quill.on(
          Quill.events.SELECTION_CHANGE,
          (range: Range, oldRange: Range, source: EmitterSource) => {
            onSelectionChangeRef.current?.(range, oldRange, source);
          },
        );
      })
      .catch((error: unknown) => {
        console.error('Quill 로드 실패:', error);
      });

    return () => {
      if (typeof ref === 'function') {
        ref(null);
      } else if (ref) {
        ref.current = null;
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [readOnly, defaultValue, ref]);

  return <div ref={containerRef}></div>;
};
