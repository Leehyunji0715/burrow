import { IconButton as RadixIconButton } from '@radix-ui/themes';
import type { IconButtonProps } from '@radix-ui/themes/components/icon-button';
import type { Ref } from 'react';

import * as styles from './style.css';

type Props = IconButtonProps & {
  bgType?: 'primary' | 'highlight';
  // React 19 부터 ref 를 일반 prop 으로 받는다 (forwardRef 불필요)
  ref?: Ref<HTMLButtonElement>;
};

// FIXME: bgType prop 이 동작하지 않는다.
// Button 과 달리 className 에 styles.highlight 가 하드코딩되어 있어
// bgType="primary" 를 넘겨도 항상 highlight 가 적용된다.
// 아래 getBg() 를 호출하도록 고치면 되지만 화면 색이 바뀌므로
// 디자인 의도를 확인한 뒤 수정한다.
export const IconButton = ({ bgType = 'primary', className = '', ref, ...props }: Props) => {
  const getBg = () => {
    switch (bgType) {
      case 'primary':
        return styles.primary;
      case 'highlight':
        return styles.highlight;
      default:
        return styles.primary;
    }
  };
  void getBg; // FIXME 해소 시 제거

  return (
    <RadixIconButton ref={ref} className={`${styles.highlight} ${className} `} {...props}>
      {props.children}
    </RadixIconButton>
  );
};
