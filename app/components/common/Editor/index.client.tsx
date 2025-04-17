import type Quill from 'quill';
import type { Delta, EmitterSource, Op, Range } from 'quill';
import 'quill/dist/quill.snow.css';
import { ForwardedRef, forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

type Props = {
  readOnly: boolean;
  defaultValue: Delta | Op[];
  onTextChange(delta: Delta, oldContent: Delta, source: EmitterSource): void;
  onSelectionChange(range: Range, oldRange: Range, source: EmitterSource): void;
};

// Editor is an uncontrolled React component
export const Editor = forwardRef(
  (
    { readOnly, defaultValue, onTextChange, onSelectionChange }: Props,
    ref: ForwardedRef<Quill>
  ) => {
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
      let quill: any = null;
      let editorContainer: HTMLDivElement | null = null;
      const container = containerRef.current;

      // SSR 방지: 동적 import (document is not defined 에러 남)
      import('quill').then(({ default: Quill }) => {
        if (!container || container.hasChildNodes()) return;

        editorContainer = document.createElement('div');
        containerRef.current.appendChild(editorContainer);

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
          }
        );

        quill.on(
          Quill.events.SELECTION_CHANGE,
          (range: Range, oldRange: Range, source: EmitterSource) => {
            onSelectionChangeRef.current?.(range, oldRange, source);
          }
        );
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
  }
);

Editor.displayName = 'Editor';
