import { Form, FormProps } from 'antd';
import { memo, ReactNode } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { z, ZodTypeAny } from 'zod';
import CustomizeRequiredMark from '../CustomizeRequiredMark';
import { SchemaProvider } from '../../hooks/useFormSchema';

const CustomRequiredMarkForm = <FV extends FieldValues>(
  props: FormProps & {
    methods: UseFormReturn<FV>;
    schema?: ZodTypeAny;
  }
) => {
  const { children, methods, schema, ...rest } = props;

  return (
    <SchemaProvider schema={schema ?? z.object({})}>
      <FormProvider {...methods}>
        <Form requiredMark={CustomizeRequiredMark} {...rest}>
          {children as ReactNode}
        </Form>
      </FormProvider>
    </SchemaProvider>
  );
};

export default memo(CustomRequiredMarkForm) as typeof CustomRequiredMarkForm;
