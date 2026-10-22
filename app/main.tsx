import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { AppRoutes } from '~/router';
import '~/styles/font.css';
import '~/styles/global.css';
import { lightTheme } from '~/styles/themes.css';

// 테마 클래스는 <html> 에 붙어야 CSS 변수가 문서 전체에 적용된다.
// index.html 은 정적 파일이라 빌드 시 생성되는 클래스명을 알 수 없으므로 여기서 붙인다.
document.documentElement.classList.add(lightTheme);

const container = document.getElementById('root');
if (!container) throw new Error('#root 요소가 index.html 에 없다');

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <AppRoutes />
      </Theme>
    </BrowserRouter>
  </StrictMode>,
);
