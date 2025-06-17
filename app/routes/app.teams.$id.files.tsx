import { Flex } from '@radix-ui/themes';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Form } from '@remix-run/react';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button } from '~/components';

import * as styles from '~/styles/app.teams.css';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const filename = formData.get('filename');
  console.log('filename', filename);
  console.log({
    params,
    request,
  });
  return null;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id });
};

export default function AppContent() {
  const { id = '' } = useLoaderData<typeof loader>();
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

  return (
    <Form method='post' encType='multipart/form-data'>
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
    </Form>
  );
};
