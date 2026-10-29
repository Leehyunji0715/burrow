import { type FormEvent, useRef } from 'react';
import { Link } from 'react-router';
import { formText } from '~/utils/form';

import * as layout from '~/components/auth/AuthLayout/styles.css';
import { Button } from '~/components/ui/Button';
import { Checkbox } from '~/components/ui/Checkbox';
import { PasswordField, TextField } from '~/components/ui/TextField';
import * as field from '~/components/ui/TextField/styles.css';

import { paths } from '~/constant/routes';

export type SignupValues = {
  name: string;
  loginId: string;
  password: string;
  agreed: boolean;
};

export type SignupErrors = Partial<Record<keyof SignupValues, string>>;

export type LoginIdStatus = 'idle' | 'available' | 'taken';

/** 비밀번호 조건 표시. 실제 검증 규칙은 서버와 같은 스키마에서 계산해 넘긴다 */
export type PasswordRule = { label: string; ok: boolean };

type Props = {
  onSubmit: (values: SignupValues) => void;
  onCheckLoginId: (loginId: string) => void;
  onPasswordChange?: (password: string) => void;
  loginIdStatus: LoginIdStatus;
  passwordRules: PasswordRule[];
  errors?: SignupErrors;
  pending?: boolean;
};

export function SignupForm({
  onSubmit,
  onCheckLoginId,
  onPasswordChange,
  loginIdStatus,
  passwordRules,
  errors = {},
  pending = false,
}: Props) {
  const loginIdRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit({
      name: formText(data, 'name'),
      loginId: formText(data, 'loginId'),
      password: formText(data, 'password'),
      agreed: data.get('agreed') === 'on',
    });
  };

  return (
    <form className={layout.form} onSubmit={handleSubmit} noValidate>
      <div className={layout.formHead}>
        <h1 className={layout.formTitle}>회원가입</h1>
        <p className={layout.formSub}>
          이미 계정이 있나요?{' '}
          <Link to={paths.login} className={layout.inlineLink}>
            로그인
          </Link>
        </p>
      </div>

      <TextField label='이름' name='name' autoComplete='name' error={errors.name} />

      <TextField
        ref={loginIdRef}
        label='아이디'
        name='loginId'
        // 아이디는 영문 소문자라 모바일 자동 대문자·맞춤법 검사가 방해만 된다
        autoCapitalize='none'
        autoCorrect='off'
        spellCheck={false}
        autoComplete='username'
        placeholder='영문 소문자로 시작, 4~20자'
        error={
          errors.loginId ?? (loginIdStatus === 'taken' ? '이미 사용 중인 아이디예요' : undefined)
        }
        hint={
          loginIdStatus === 'available' ? (
            <span className={layout.ruleOk}>✓ 사용할 수 있는 아이디예요</span>
          ) : undefined
        }
        addon={
          <Button
            variant='outline'
            size='lg'
            onClick={() => onCheckLoginId(loginIdRef.current?.value ?? '')}
          >
            중복 확인
          </Button>
        }
      />

      <PasswordField
        label='비밀번호'
        name='password'
        autoComplete='new-password'
        onChange={(e) => onPasswordChange?.(e.target.value)}
        error={errors.password}
        hint={
          <ul className={layout.rules} aria-label='비밀번호 조건'>
            {passwordRules.map((r) => (
              <li key={r.label} className={r.ok ? layout.ruleOk : layout.rule}>
                {r.ok ? '✓' : '·'} {r.label}
              </li>
            ))}
          </ul>
        }
      />

      <div>
        <Checkbox name='agreed'>[필수] 이용약관 및 개인정보 처리방침에 동의해요</Checkbox>
        {errors.agreed && (
          <p className={field.error} role='alert'>
            {errors.agreed}
          </p>
        )}
      </div>

      <Button type='submit' size='lg' block disabled={pending}>
        가입하기
      </Button>
    </form>
  );
}
