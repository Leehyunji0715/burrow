import { Flex } from '@radix-ui/themes';
import DOMPurify from 'dompurify';
import type Quill from 'quill';
import { Delta, Op } from 'quill';
import { useRef, useState } from 'react';

import { Button } from '~/components/common/Button';
import { Editor } from '~/components/common/Editor/index.client';
import { InputText } from '~/components/common/InputText';

import { TeamAvatar } from '../TeamAvatar';
import * as styles from './editableDashboardCard.css';

export const EditableDashboardCard = () => {
  // TODO: 편집/읽기 모드 전환이 필요해지면 useState 로 되돌린다.
  const readOnly = false;
  // TODO: 초기값(수정 모드에서 기존 내용 불러오기)이 필요해지면 prop 으로 받는다.
  const initialContent: Delta | Op[] = [];
  // TODO: 게시 기능 구현 시 서버 전송에 사용
  const [_html, setHTML] = useState('');

  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill>(null);

  return (
    <Flex direction='column' className={styles.container}>
      <Flex className={styles.headerContainer} align='center' gap='3'>
        <TeamAvatar radius='full' fallback={'user name'} size='2' />
        User name
      </Flex>
      <div className={styles.titleContainer}>
        <InputText placeholder='제목 추가' />
      </div>
      <div className={styles.editorContainer}>
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={initialContent}
          onSelectionChange={() => {}}
          onTextChange={() => {
            setHTML(DOMPurify.sanitize(quillRef.current?.root.innerHTML || ''));
          }}
        />
        {/* <div
              dangerouslySetInnerHTML={{
                __html: _html,
              }}
            /> */}
      </div>
      <div className={styles.footerContainer}>
        <Button className={styles.footerButton}>게시</Button>
      </div>
    </Flex>
  );
};
