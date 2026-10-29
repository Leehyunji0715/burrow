import { useState } from 'react';
import { useNavigate } from 'react-router';

import { AuthLayout } from '~/components/auth/AuthLayout';
import * as layout from '~/components/auth/AuthLayout/styles.css';
import { type LoginIdStatus, SignupForm } from '~/components/auth/SignupForm';

import { paths } from '~/constant/routes';

const steps = ['계정 만들기', '프로젝트 만들기 또는 초대받기', '채널에서 바로 대화 시작'];

// 목업: 서버와 같은 검증 스키마가 생기면 그 결과로 바꾼다
const passwordRules = (pw: string) => [
  { label: '8자 이상', ok: pw.length >= 8 },
  { label: '영문 포함', ok: /[a-zA-Z]/.test(pw) },
  { label: '숫자 포함', ok: /\d/.test(pw) },
  { label: '특수문자 포함 (권장)', ok: /[^a-zA-Z\d]/.test(pw) },
];

export default function Signup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loginIdStatus, setLoginIdStatus] = useState<LoginIdStatus>('idle');

  return (
    <AuthLayout
      brand={
        <>
          <p className={layout.brandTitle}>
            1분이면
            <br />
            프로젝트 공간이 생겨요.
          </p>
          <ol className={layout.brandSteps}>
            {steps.map((s, i) => (
              <li key={s} className={layout.brandStep}>
                <span className={layout.brandStepNo} aria-hidden='true'>
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </>
      }
    >
      <SignupForm
        loginIdStatus={loginIdStatus}
        passwordRules={passwordRules(password)}
        onPasswordChange={setPassword}
        // 목업: 중복 확인 API 가 생기면 응답으로 상태를 정한다
        onCheckLoginId={(id) => setLoginIdStatus(id === 'taken' ? 'taken' : 'available')}
        onSubmit={() => void navigate(paths.app)}
      />
    </AuthLayout>
  );
}
