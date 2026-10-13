import { Flex } from '@radix-ui/themes';
import DOMPurify from 'dompurify';
import type Quill from 'quill';
import { Delta, Op } from 'quill';
import { useEffect, useRef, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';

import { Button } from '~/components/common/Button';
import { Editor } from '~/components/common/Editor/index.client';
import { InputText } from '~/components/common/InputText';

import { TeamAvatar } from '../TeamAvatar';
import * as styles from './editableDashboardCard.css';

export const EditableDashboardCard = () => {
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [testValue, setTestValue] = useState<Delta | Op[]>([]);
  const [html, setHTML] = useState('');

  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill>(null);

  useEffect(() => {
    import('quill').then(({ Delta }) => {
      // setTestValue(new Delta().insert('메세지를 입력하세요\n'));
    });
  }, []);

  return (
    <Flex direction='column' className={styles.container}>
      <Flex className={styles.headerContainer} align='center' gap='3'>
        <TeamAvatar radius='full' fallback={'user name'} size='2' />
        User name
      </Flex>
      <div className={styles.titleContainer}>
        <InputText placeholder='제목 추가' />
      </div>
      <ClientOnly fallback={<div>로딩 중...</div>}>
        {() => (
          <div className={styles.editorContainer}>
            <Editor
              ref={quillRef}
              readOnly={readOnly}
              defaultValue={testValue}
              onSelectionChange={() => {}}
              onTextChange={() => {
                setHTML(DOMPurify.sanitize(quillRef.current?.root.innerHTML || ''));
              }}
            />
            {/* <div
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            /> */}
          </div>
        )}
      </ClientOnly>
      <div className={styles.footerContainer}>
        <Button className={styles.footerButton}>게시</Button>
      </div>
    </Flex>
  );
};
