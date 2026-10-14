import { TextField } from '@radix-ui/themes';
import type { RootProps } from '@radix-ui/themes/components/text-field';
import type { Ref } from 'react';

// React 19 부터 ref 를 일반 prop 으로 받는다 (forwardRef 불필요)
type Props = RootProps & { ref?: Ref<HTMLInputElement> };

export const InputText = (props: Props) => {
  return <TextField.Root {...props} />;
};
