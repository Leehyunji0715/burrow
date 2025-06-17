import { Button as RadixButton } from '@radix-ui/themes';
import type { ButtonProps } from '@radix-ui/themes/components/button';
import { ForwardedRef, forwardRef } from 'react';

import * as styles from './style.css';

type Props = ButtonProps & {
  bgType?: 'primary' | 'highlight';
};

export const Button = forwardRef(
  (
    { bgType = 'primary', className = '', ...props }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
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
  }
);
