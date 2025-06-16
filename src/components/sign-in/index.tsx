import { Button, Modal } from 'antd';
import useRHFForm from '../../form/hooks/useRHFForm';
import { useRules } from '../../form/hooks/useRules';
import CustomRequiredMarkForm from '../../form/components/CustomRequiredMarkForm';
import { useSignIn } from '../../queries/user.query';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../queries/query.keys';

type SignInForm = {
  username: string;
  password: string;
};

type SignInProps = {
  open: boolean;
  onClose: () => void;
};

const SignIn = ({ open, onClose }: SignInProps) => {
  const rules = useRules();

  const queryClient = useQueryClient();

  const { methods, ControlledInput } = useRHFForm<SignInForm>();

  const { handleSubmit: handleFinish } = methods;

  const signInMutation = useSignIn({
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data.data));

      queryClient.invalidateQueries({
        queryKey: queryKeys.user.invalidateDetailsKey()
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.product.invalidateListsKey()
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.product.invalidateDetailsKey()
      });
      onClose();
    }
  });

  const handleSubmit = (data: SignInForm) => {
    signInMutation.mutate(data);
  };

  return (
    <Modal open={open} onCancel={onClose} title='Sign In' footer={null}>
      <CustomRequiredMarkForm layout='vertical' methods={methods} onFinish={handleFinish(handleSubmit)}>
        <ControlledInput.Input name='username' label='Username' rules={rules().addRequired()} />
        <ControlledInput.Input type='password' name='password' label='Password' rules={rules().addRequired()} />

        <Button type='primary' htmlType='submit' loading={signInMutation.isPending}>
          Sign In
        </Button>
      </CustomRequiredMarkForm>
    </Modal>
  );
};

export default SignIn;
