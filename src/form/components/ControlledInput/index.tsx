import {
  Checkbox,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Form,
  FormItemProps,
  Input,
  InputProps,
  Radio,
  RadioGroupProps,
  Select,
  SelectProps,
  TimePicker,
  TimePickerProps
} from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { DefaultOptionType } from 'antd/es/select';
import classNames from 'classnames';
import { ComponentType, FocusEvent, memo, Ref, useMemo } from 'react';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { formItemPropsKeys } from '../../type';

export type RHFInputType =
  | 'input'
  | 'select'
  | 'checkbox'
  | 'datePicker'
  | 'timePicker'
  | 'radioGroup'
  | 'checkboxGroup'
  | 'numeric';

export const controlledInputComponents: Record<RHFInputType, ComponentType<any>> = {
  input: Input,
  numeric: Input,
  select: Select,
  checkbox: Checkbox,
  datePicker: DatePicker,
  timePicker: TimePicker,
  radioGroup: Radio.Group,
  checkboxGroup: Checkbox.Group
};

/* -------------------------------------------------------------------------- */
/*                            Main Controlled Input                           */
/* -------------------------------------------------------------------------- */

// #region Main controlled input

export type InputTypePropsMap = {
  input: InputProps;
  numeric: InputProps;
  select: SelectProps;
  checkbox: CheckboxProps;
  datePicker: DatePickerProps;
  timePicker: TimePickerProps;
  radioGroup: RadioGroupProps;
  checkboxGroup: CheckboxGroupProps;
};

export type ControlledInputRefType = {
  /** Reference to the input element, preferred for handling refs. */
  inputRef?: Ref<any>;

  /** @deprecated Please use inputRef instead of ref due to forwardRef limitations and creator's skill issue hihi */
  ref?: `Use "inputRef" instead`;
};

/** This type does not require control */
export type OmitControlControlledInputProps<FV extends FieldValues> = Omit<FormItemProps, 'rules' | 'name'> &
  UseControllerProps<FV> &
  {
    [K in keyof InputTypePropsMap]: {
      inputType: K;
      inputProps?: InputTypePropsMap[K];
    } & InputTypePropsMap[K];
  }[keyof InputTypePropsMap] &
  ControlledInputRefType;

export type ControlledInputProps<FV extends FieldValues> = OmitControlControlledInputProps<FV> & {
  control: Control<FV>;
};

const BaseControlledInput = <FV extends FieldValues>(props: ControlledInputProps<FV>) => {
  const {
    name,
    rules,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value,
    control,
    required,
    className,
    inputType,
    inputProps,
    onChange,
    inputRef: userInputRef,
    ...rest
  } = props;

  const formItemProps = Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (formItemPropsKeys.includes(key)) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, unknown>
  );

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, rules });

  const Component = useMemo(() => controlledInputComponents[inputType ?? 'input'], [inputType]);

  const handleChange = (arg0: any, arg1: (DefaultOptionType | DefaultOptionType[]) & (string | string[])) => {
    if (inputType !== 'numeric') {
      onChange?.(arg0, arg1);
      inputProps?.onChange?.(arg0, arg1);
      field.onChange(arg0, arg1);

      return;
    }

    const { value: inputValue } = arg0?.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange?.(inputValue);
      inputProps?.onChange?.(inputValue);
      field.onChange(inputValue);
    }
  };

  const handleBlur = (arg0: FocusEvent<HTMLElement, Element> & FocusEvent<HTMLInputElement, Element>, info: any) => {
    if (inputType !== 'checkboxGroup') {
      props?.onBlur?.(arg0, info);
      inputProps?.onBlur?.(arg0, info);
    }
    field.onBlur();
  };

  const requiredRule = !!rules?.required || required;

  const componentProps = useMemo(() => {
    const baseProps = {
      ...rest,
      ...inputProps,
      ...field
    };

    if (inputType === 'checkbox') {
      return { ...baseProps, checked: field.value };
    }

    return baseProps;
  }, [field, inputProps, inputType, rest]);

  return (
    <Form.Item
      {...formItemProps}
      help={error?.message}
      required={requiredRule}
      validateStatus={error ? 'error' : ''}
      className={classNames(className, 'rhf-controlled-input')}
    >
      <Component
        {...componentProps}
        loading={(componentProps as unknown as Record<string, unknown>)?.loading ? 1 : 0}
        ref={(instance: unknown) => {
          field.ref(instance);
          if (typeof userInputRef === 'function') {
            userInputRef(instance);
          } else if (userInputRef) {
            (userInputRef as React.MutableRefObject<unknown>).current = instance;
          }
        }}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form.Item>
  );
};

// #endregion

const ControlledInput = memo(BaseControlledInput) as unknown as typeof BaseControlledInput;

/* -------------------------------------------------------------------------- */
/*                             Compound Components                            */
/* -------------------------------------------------------------------------- */

// #region Compound components

type BaseControlledInputProps<FV extends FieldValues> = Omit<FormItemProps, 'rules' | 'name'> &
  UseControllerProps<FV> & { control: Control<FV> } & ControlledInputRefType;

/* -------------------------------------------------------------------------- */
/*                                    Input                                   */
/* -------------------------------------------------------------------------- */

type InputControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: InputProps;
} & InputProps;

BaseControlledInput.Input = <FV extends FieldValues>(props: InputControlledInputProps<FV>) => {
  return <BaseControlledInput {...props} inputType='input' />;
};

ControlledInput.Input = memo(BaseControlledInput.Input) as typeof BaseControlledInput.Input;

/* -------------------------------------------------------------------------- */
/*                                   Select                                   */
/* -------------------------------------------------------------------------- */

type SelectControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: SelectProps;
} & SelectProps;

BaseControlledInput.Select = <FV extends FieldValues>(props: SelectControlledInputProps<FV>) => {
  return <BaseControlledInput {...props} inputType='select' />;
};

ControlledInput.Select = memo(BaseControlledInput.Select) as typeof BaseControlledInput.Select;

/* -------------------------------------------------------------------------- */
/*                                 Radio Group                                */
/* -------------------------------------------------------------------------- */

type RadioGroupControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: RadioGroupProps;
} & RadioGroupProps;

BaseControlledInput.RadioGroup = <FV extends FieldValues>(props: RadioGroupControlledInputProps<FV>) => {
  return <BaseControlledInput {...props} inputType='radioGroup' />;
};

ControlledInput.RadioGroup = memo(BaseControlledInput.RadioGroup) as typeof BaseControlledInput.RadioGroup;

/* -------------------------------------------------------------------------- */
/*                                  Checkbox                                  */
/* -------------------------------------------------------------------------- */

type CheckboxControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: CheckboxProps;
} & CheckboxProps;

BaseControlledInput.Checkbox = <FV extends FieldValues>(props: CheckboxControlledInputProps<FV>) => {
  return <BaseControlledInput {...props} inputType='checkbox' />;
};

ControlledInput.Checkbox = memo(BaseControlledInput.Checkbox) as typeof BaseControlledInput.Checkbox;

/* -------------------------------------------------------------------------- */
/*                               Checkbox Group                               */
/* -------------------------------------------------------------------------- */

type CheckboxGroupControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: CheckboxGroupProps;
} & CheckboxGroupProps;

BaseControlledInput.CheckboxGroup = <FV extends FieldValues>(props: CheckboxGroupControlledInputProps<FV>) => {
  return <BaseControlledInput {...props} inputType='checkboxGroup' />;
};

ControlledInput.CheckboxGroup = memo(BaseControlledInput.CheckboxGroup) as typeof BaseControlledInput.CheckboxGroup;

/* -------------------------------------------------------------------------- */
/*                                 Date Picker                                */
/* -------------------------------------------------------------------------- */

type DatePickerControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: DatePickerProps;
} & DatePickerProps;

BaseControlledInput.DatePicker = <FV extends FieldValues>(props: DatePickerControlledInputProps<FV>) => {
  return <BaseControlledInput {...props} inputType='datePicker' />;
};

ControlledInput.DatePicker = memo(BaseControlledInput.DatePicker) as typeof BaseControlledInput.DatePicker;

/* -------------------------------------------------------------------------- */
/*                                 Time Picker                                */
/* -------------------------------------------------------------------------- */

type TimePickerControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: TimePickerProps;
} & TimePickerProps;

BaseControlledInput.TimePicker = <FV extends FieldValues>(props: TimePickerControlledInputProps<FV>) => {
  return <BaseControlledInput {...props} inputType='timePicker' />;
};

ControlledInput.TimePicker = memo(BaseControlledInput.TimePicker) as typeof BaseControlledInput.TimePicker;

// #endregion

export default ControlledInput;

/* -------------------------------------------------------------------------- */
/*                                  Examples                                  */
/* -------------------------------------------------------------------------- */

// #region Examples

/* -------------------------------------------------------------------------- */

//       <ControlledInput
//         name="select"
//         control={control}
//         inputType="select"
//         options={[
//           {
//             label: "option 1",
//             value: "option1",
//           },
//         ]}
//       />

/* -------------------------------------------------------------------------- */

//       <ControlledInput.Select
//         name="select"
//         control={control}
//         inputProps={{
//           options: [
//             {
//               label: "option 1",
//               value: "option1",
//             },
//           ],
//         }}
//       />
