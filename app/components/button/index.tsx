import { ButtonHTMLAttributes, ForwardedRef, ReactNode, forwardRef } from 'react';
import {vars} from "~/styles/gloabalTheme.css";

import * as styles from './style.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  size?: ButtonSize
};

type ButtonSize = "small" | "medium" | "large";

export const Button = forwardRef(
  ({ children, size = "medium", ...props }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button {...props} ref={ref} className={styles.root} style={{ ...props.style, fontSize: vars.fontSize[size] }}>
        {children}
      </button>
    );
  }
);
