import type Quill from 'quill';
import { Delta, Op } from 'quill';
import { useEffect, useRef, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';

import { Editor } from '~/components/common/Editor/index.client';

export const EditableDashboardCard = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [testValue, setTestValue] = useState<Delta | Op[]>([]);

  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill>(null);

  useEffect(() => {
    import('quill').then(({ Delta }) => {
      setTestValue(
        new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n')
      );
    });
  }, []);

  return (
    <ClientOnly fallback={<div>로딩 중...</div>}>
      {() => (
        <div style={{ width: '50rem' }}>
          <Editor
            ref={quillRef}
            readOnly={readOnly}
            defaultValue={testValue}
            onSelectionChange={(...args) => {
              console.log(args);
            }}
            onTextChange={(...args) => {
              console.log(args);
            }}
          />
        </div>
      )}
    </ClientOnly>
  );
};
