import { Link } from '@remix-run/react';
import { Form } from "radix-ui";
import { Flex, Text } from '@radix-ui/themes';

import { Button, InputText } from '~/components';
import utils from '~/styles/utils.css';
import * as styles from './form.css';

export const LoginForm = () => {
    return (
        <Form.Root className={styles.loginForm}>
            <h1 className={styles.heading}>Login</h1>
            <Form.Field className={styles.formField} name="email">
                <Flex justify='between'>
                    <Form.Label className={styles.formLabel}>Email</Form.Label>
                    <Form.Message className={styles.formMessage} match="valueMissing">
                        Please enter your Email
                    </Form.Message>
                    <Form.Message className={styles.formMessage} match="typeMismatch">
                        Please provide a valid email
                    </Form.Message>
                </Flex>
                <Form.Control asChild>
                    <InputText type='email' required/>
                </Form.Control>
            </Form.Field>
            <Form.Field className={styles.formField} name="question">
                <Flex justify='between'>
                    <Form.Label className={styles.formLabel}>Password</Form.Label>
                    <Form.Message className={styles.formMessage} match="valueMissing">
                        Please enter your password
                    </Form.Message>
                </Flex>
                <Form.Control asChild>
                    <InputText type='password' required/>
                </Form.Control>
            </Form.Field>
            <Link to='/find-password' className={styles.formLink} style={{ alignSelf: 'end' }}>
                Forgot password?
            </Link>
            <Form.Submit asChild>
                <Button className={utils.w100}>Log In</Button>
            </Form.Submit>
            <Flex gap='3'>
                <Text>Not a Member?</Text>
                <Text><Link to='/signup' className={styles.formLink}>Sign up</Link></Text>
            </Flex>
        </Form.Root>
    );
};