import { Flex, Text } from '@radix-ui/themes';
import { Link } from '@remix-run/react';
import { Form } from 'radix-ui';
import { Button, InputText } from '~/components';

import * as styles from './form.css';

export const SignUpForm = () => {
  return (
    <Form.Root className={styles.loginForm}>
      <h1 className={styles.heading}>Sign up</h1>
      <Form.Field className={styles.formField} name='email'>
        <Flex justify='between'>
          <Form.Label className={styles.formRequiredLabel}>Email</Form.Label>
          <Form.Message className={styles.formMessage} match='valueMissing'>
            Please enter Email
          </Form.Message>
          <Form.Message className={styles.formMessage} match='typeMismatch'>
            Please provide a valid email
          </Form.Message>
        </Flex>
        <Form.Control asChild>
          <InputText type='email' required />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.formField} name='password'>
        <Flex justify='between'>
          <Form.Label className={styles.formRequiredLabel}>Create Password</Form.Label>
          <Form.Message className={styles.formMessage} match='valueMissing'>
            Please enter password
          </Form.Message>
        </Flex>
        <Form.Control asChild>
          <InputText type='password' required />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.formField} name='passwordConfirm'>
        <Flex justify='between'>
          <Form.Label className={styles.formRequiredLabel}>Confirm Password</Form.Label>
          <Form.Message className={styles.formMessage} match='valueMissing'>
            Please enter password
          </Form.Message>
        </Flex>
        <Form.Control asChild>
          <InputText color='red' type='password' required />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button bgType='highlight' style={{ width: '100%' }}>
          Sign up
        </Button>
      </Form.Submit>
      <Flex gap='3'>
        <Text>Already have an account?</Text>
        <Text>
          <Link to='/login' className={styles.formLink}>
            Login
          </Link>
        </Text>
      </Flex>
    </Form.Root>
  );
};
