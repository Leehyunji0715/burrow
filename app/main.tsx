import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import { Tooltip } from 'radix-ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from '~/router';
import { ThemeProvider } from '~/theme/ThemeProvider';

import '~/styles/global.css';
import '~/styles/tokens.css';

const container = document.getElementById('root');
if (!container) throw new Error('#root 요소가 index.html 에 없다');

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <Tooltip.Provider delayDuration={300}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Tooltip.Provider>
    </ThemeProvider>
  </StrictMode>,
);
