import { forwardRef, ButtonHTMLAttributes, ForwardedRef, ReactNode } from "react";
import * as styles from "./style.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const Button = forwardRef(
  ({ children, ...props }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        {...props}
        ref={ref}
        className={styles.root}
      >
        {children}
      </button>
    );
  });
Button.displayName = "Button";
