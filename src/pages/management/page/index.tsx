import { Button, Flex } from 'antd';
import CustomRequiredMarkForm from '../../../form/components/CustomRequiredMarkForm';
import useRHFForm from '../../../form/hooks/useRHFForm';
import { useRules } from '../../../form/hooks/useRules';
import { CATEGORY, CreateProduct, DiscountType } from '../../../types/product.type';
import { toCapitalize } from '../../../utils';
import { useCreateProduct } from '../../../queries/product.query';
import { notification } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../queries/query.keys';

const Management = () => {
  const [api, contextHolder] = notification.useNotification();

  const queryClient = useQueryClient();

  const rules = useRules();

  const { methods, ControlledInput } = useRHFForm<CreateProduct>();

  const { handleSubmit: handleFinish, reset } = methods;

  const categoryOptions = Object.values(CATEGORY).map((value) => ({ label: toCapitalize(value), value }));

  const discountTypeOptions = [
    { label: 'Percentage', value: DiscountType.PERCENTAGE },
    { label: 'Amount', value: DiscountType.AMOUNT }
  ];

  const createProductMutation = useCreateProduct({
    onSuccess: () => {
      api.success({
        message: 'Product created successfully'
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.product.invalidateListsKey()
      });

      reset();
    }
  });

  const handleSubmit = (data: CreateProduct) => {
    createProductMutation.mutate(data);
  };

  return (
    <>
      {contextHolder}
      <h1>Add Product</h1>

      <CustomRequiredMarkForm layout='vertical' methods={methods} onFinish={handleFinish(handleSubmit)}>
        <ControlledInput.Input name='name' label='Name' rules={rules().addRequired()} />

        <ControlledInput.Numeric name='price' label='Price' rules={rules().addRequired()} />

        <ControlledInput.Select name='discountType' label='Discount Type' options={discountTypeOptions} />

        <ControlledInput.Numeric name='discount' label='Discount' />

        <ControlledInput.Input name='description' label='Description' rules={rules().addRequired()} />

        <ControlledInput.Numeric name='stock' label='Stock' rules={rules().addRequired()} />

        <ControlledInput.Input name='image' label='Image' rules={rules().addRequired()} />

        <ControlledInput.Select
          name='category'
          label='Category'
          options={categoryOptions}
          rules={rules().addRequired()}
        />

        <ControlledInput.Input name='brand' label='Brand' rules={rules().addRequired()} />

        <Flex gap={20} justify='end'>
          <Button size='large' onClick={() => reset()}>
            Reset
          </Button>

          <Button size='large' type='primary' htmlType='submit' loading={createProductMutation.isPending}>
            Submit
          </Button>
        </Flex>
      </CustomRequiredMarkForm>
    </>
  );
};

export default Management;
