import { useNavigate } from 'react-router';

import { AuthLayout } from '~/components/auth/AuthLayout';
import * as layout from '~/components/auth/AuthLayout/styles.css';
import { LoginForm } from '~/components/auth/LoginForm';

import { paths } from '~/constant/routes';

export default function Login() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      brand={
        <>
          <h2 className={layout.brandTitle}>
            다시 오신 걸
            <br />
            환영해요.
          </h2>
          <p className={layout.brandText}>프로젝트마다 이어지던 대화가 그대로 기다리고 있어요.</p>
        </>
      }
    >
      {/* 목업: 인증 API 가 생기면 로그인 요청 결과에 따라 이동하거나 error 를 넘긴다 */}
      <LoginForm onSubmit={() => void navigate(paths.app)} />
    </AuthLayout>
  );
}
