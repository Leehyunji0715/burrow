import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { formText } from '~/utils/form';

import * as layout from '~/components/auth/AuthLayout/styles.css';
import { Button } from '~/components/ui/Button';
import { Checkbox } from '~/components/ui/Checkbox';
import { PasswordField, TextField } from '~/components/ui/TextField';

import { paths } from '~/constant/routes';

export type LoginValues = { loginId: string; password: string; rememberId: boolean };

type Props = {
  onSubmit: (values: LoginValues) => void;
  /** 서버가 돌려준 실패 문구. 아이디·비밀번호 중 무엇이 틀렸는지 나누지 않는다 */
  error?: string;
  defaultLoginId?: string;
  pending?: boolean;
};

export function LoginForm({ onSubmit, error, defaultLoginId, pending = false }: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit({
      loginId: formText(data, 'loginId'),
      password: formText(data, 'password'),
      rememberId: data.get('rememberId') === 'on',
    });
  };

  return (
    <form className={layout.form} onSubmit={handleSubmit} noValidate>
      <div className={layout.formHead}>
        <h1 className={layout.formTitle}>로그인</h1>
        <p className={layout.formSub}>
          계정이 없나요?{' '}
          <Link to={paths.signup} className={layout.inlineLink}>
            회원가입
          </Link>
        </p>
      </div>

      <TextField
        label='아이디'
        name='loginId'
        autoComplete='username'
        placeholder='아이디를 입력하세요'
        defaultValue={defaultLoginId}
      />
      <PasswordField
        label='비밀번호'
        name='password'
        autoComplete='current-password'
        placeholder='비밀번호를 입력하세요'
        error={error}
      />

      <div className={layout.optionsRow}>
        <Checkbox name='rememberId' defaultChecked={Boolean(defaultLoginId)}>
          아이디 저장
        </Checkbox>
      </div>

      <Button type='submit' size='lg' block disabled={pending}>
        로그인
      </Button>
    </form>
  );
}
