import { ForwardedRef, forwardRef } from 'react';
import { Button as RadixButton } from '@radix-ui/themes';
import type { ButtonProps } from '@radix-ui/themes/components/button';

import * as styles from './style.css';

type Props = ButtonProps & {

};

export const Button = forwardRef(({className = '', ...props} :Props, ref: ForwardedRef<HTMLButtonElement>) => {
  return <RadixButton ref={ref} className={`${styles.highlight} ${className} `} {...props}>
    {props.children}
  </RadixButton>
});