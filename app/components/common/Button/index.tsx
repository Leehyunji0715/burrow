import { Button as RadixButton } from '@radix-ui/themes';
import type { ButtonProps } from '@radix-ui/themes/components/button';
import type { Ref } from 'react';

import * as styles from './style.css';

type Props = ButtonProps & {
  bgType?: 'primary' | 'highlight';
  // React 19 부터 ref 를 일반 prop 으로 받는다 (forwardRef 불필요)
  ref?: Ref<HTMLButtonElement>;
};

export const Button = ({ bgType = 'primary', className = '', ref, ...props }: Props) => {
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
  return (
    <RadixButton ref={ref} className={`${getBg()} ${className} `} {...props}>
      {props.children}
    </RadixButton>
  );
};
