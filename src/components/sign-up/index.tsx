import { Button, Modal } from 'antd';
import CustomRequiredMarkForm from '../../form/components/CustomRequiredMarkForm';
import useRHFForm from '../../form/hooks/useRHFForm';
import { useRules } from '../../form/hooks/useRules';
import { useSignUp } from '../../queries/user.query';

type SignInProps = {
  open: boolean;
  onClose: () => void;
};

type SignInForm = {
  name: string;
  username: string;
  password: string;
};

const SignUp = ({ open, onClose }: SignInProps) => {
  const rules = useRules();

  const { methods, ControlledInput } = useRHFForm<SignInForm>();

  const { handleSubmit: handleFinish } = methods;

  const signUpMutation = useSignUp({ onSuccess: () => onClose() });

  const handleSubmit = (data: SignInForm) => {
    signUpMutation.mutate(data);
  };

  return (
    <Modal open={open} onCancel={onClose} title='Sign Up' footer={null}>
      <CustomRequiredMarkForm layout='vertical' methods={methods} onFinish={handleFinish(handleSubmit)}>
        <ControlledInput.Input name='name' label='Full Name' rules={rules().addRequired()} />
        <ControlledInput.Input name='username' label='Username' rules={rules().addRequired()} />
        <ControlledInput.Input type='password' name='password' label='Password' rules={rules().addRequired()} />

        <Button type='primary' htmlType='submit' loading={signUpMutation.isPending}>
          Submit
        </Button>
      </CustomRequiredMarkForm>
    </Modal>
  );
};

export default SignUp;
