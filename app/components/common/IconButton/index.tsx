import { IconButton as RadixIconButton } from '@radix-ui/themes';
import type { IconButtonProps } from '@radix-ui/themes/components/icon-button';
import { ForwardedRef, forwardRef } from 'react';

import * as styles from './style.css';

type Props = IconButtonProps & {
  bgType?: 'primary' | 'highlight';
};

export const IconButton = forwardRef(
  ({ bgType = 'primary', className = '', ...props }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const getBg = () => {
      switch(bgType) {
        case 'primary':
          return styles.primary;
        case 'highlight':
          return styles.highlight;
        default:
          return styles.primary;
      }
    };
    return (
      <RadixIconButton ref={ref} className={`${styles.highlight} ${className} `} {...props}>
        {props.children}
      </RadixIconButton>
    );
  }
);
