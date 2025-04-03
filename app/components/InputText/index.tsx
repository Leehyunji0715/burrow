import { forwardRef, ForwardedRef } from 'react';
import { TextField } from '@radix-ui/themes';
import type { RootProps } from '@radix-ui/themes/components/text-field';

export const InputText = forwardRef((props: RootProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <TextField.Root ref={ref} {...props}/>;
});