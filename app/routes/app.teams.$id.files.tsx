import { Flex } from '@radix-ui/themes';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router';
import { Button } from '~/components';

import * as styles from '~/styles/app.teams.css';

export default function AppContent() {
  const { id = '' } = useParams();
  return (
    <div className={styles.contentContainer}>
      <Flex justify='end'>
        <FileInputButton />
      </Flex>
      {id}-Files
    </div>
  );
}

const FileInputButton = () => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileAddButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInput.current!.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 선택한 파일 정보
    // console.log(e.target.files);
    if (e.target.form) {
      e.target.form.requestSubmit();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = new FormData(e.currentTarget).getAll('filename'); // 이름이 filename 인 input 의 파일들
    console.log({ files }); // TODO: 업로드 API 연결
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type='button' onClick={handleFileAddButtonClick}>
        <FaPlus />
        파일 추가
      </Button>
      <input
        ref={fileInput}
        type='file'
        name='filename'
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </form>
  );
};
