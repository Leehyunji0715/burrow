import { TextField } from '@radix-ui/themes';
import type { RootProps } from '@radix-ui/themes/components/text-field';
import { ForwardedRef, forwardRef } from 'react';

export const InputText = forwardRef((props: RootProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <TextField.Root ref={ref} {...props} />;
});
