import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  UseControllerProps,
  useForm,
  UseFormProps
} from 'react-hook-form';

import {
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  InputProps,
  RadioGroupProps,
  TimePickerProps,
  Form
} from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import { FocusEvent, memo, useMemo } from 'react';

import { formItemPropsKeys } from '../type';
import { useFormSchema } from './useFormSchema';
import {
  controlledInputComponents,
  ControlledInputRefType,
  OmitControlControlledInputProps
} from '../components/ControlledInput';
import { isFieldRequired } from '../utils';
import classNames from 'classnames';

/* -------------------------------------------------------------------------- */
/*                           Controlled Input Types                           */
/* -------------------------------------------------------------------------- */

// #region Compound components

type BaseControlledInputProps<FV extends FieldValues> = Omit<FormItemProps, 'rules' | 'name'> &
  UseControllerProps<FV> &
  ControlledInputRefType;

type InputControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: InputProps;
} & InputProps;

type Rule<FV extends FieldValues> = Omit<
  RegisterOptions<FV>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

type InputFormMatchCondition<FV extends FieldValues> = {
  name: Path<FV>;
  value: any;
};

type SelectControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: SelectProps;
} & SelectProps;

type RadioGroupControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: RadioGroupProps;
} & RadioGroupProps;

type CheckboxControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: CheckboxProps;
} & CheckboxProps;

type CheckboxGroupControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: CheckboxGroupProps;
} & CheckboxGroupProps;

type DatePickerControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
  inputProps?: DatePickerProps;
} & DatePickerProps;

// #endregion Compound components

//

//

//

export type ListInputFormInputConfig<FV extends FieldValues> = OmitControlControlledInputProps<FV> & {
  /**
   * Defines dependencies for conditional rendering of the input field.
   * The input will only render if the specified conditions match, depending on the `dependType`.
   * Each dependency is an object with a name representing the field to observe
   * and value representing the expected value in that field.
   */
  dependsOn?: InputFormMatchCondition<FV>[];

  /**
   * Specifies the matching rule for the dependencies. If set to `"every"`,
   * all conditions in dependsOn must match for the field to render.
   * If set to `"some"`, the field renders if any of the specified conditions in `dependsOn` match.
   * @default `"every"`.
   */
  dependType?: 'some' | 'every';
};

type ListInputFormProps<FV extends FieldValues> = UseFormProps<FV> & {
  /**
   * Array of input configurations, each containing settings for the ControlledInput fields.
   * This includes dependencies for conditional rendering, validation rules, and custom `onChange` handlers.
   */
  inputs?: ListInputFormInputConfig<FV>[];

  /**
   * Default validation rules applied to all inputs. These rules will be overridden if
   * individual inputs specify their own rules.
   */
  defaultRules?: Rule<FV>;

  /**
   * Required validation rules for all inputs. These rules will not be overridden by individual input rules,
   * ensuring they are always enforced.
   */
  mustHaveRules?: Rule<FV>;

  /**
   * Specifies fields that act as group points for inputs. When the name of an input matches
   * a group point, the form will break input rendering into groups, separating sections
   * as defined by the grouped fields.
   */
  groupPoints?: Path<FV>[];
};

// const getInputValue = (e: any, inputType: RHFInputType) => {
//   switch (inputType) {
//     case 'input':
//     case 'radioGroup':
//       return e.target.value;

//     case 'checkbox':
//       return e.target.checked;

//     default:
//       return e;
//   }
// };

const useRHFForm = <FV extends FieldValues>(props: ListInputFormProps<FV> = {}) => {
  const { inputs, defaultRules, mustHaveRules, groupPoints, ...rest } = props;

  const methods = useForm<FV>({
    mode: 'all',
    ...rest
  });
  const { control } = methods;

  // const [, triggerRender] = useState(false);

  // const matchedConditionsRef = useRef<InputFormMatchCondition<FV>[]>([]);

  // const checkMatchedDependsOn = useCallback(
  //   (
  //     dependsOn: InputFormMatchCondition<FV>[] = [],
  //     dependType: 'some' | 'every' = 'every',
  //   ) => {
  //     const handleCheckDependsOn = (dep: InputFormMatchCondition<FV>) =>
  //       matchedConditionsRef.current.some(condition => {
  //         return (
  //           condition.name === dep.name &&
  //           (Array.isArray(dep.value)
  //             ? dep.value.includes(condition.value)
  //             : dep.value === condition.value)
  //         );
  //       });

  //     if (dependType === 'some') {
  //       return dependsOn.some(dep => handleCheckDependsOn(dep));
  //     }

  //     return !dependsOn.some(dep => !handleCheckDependsOn(dep));
  //   },
  //   [],
  // );

  // const filteredInputs = useMemo(() => {
  //   if (!inputs) return [];

  //   const dependentInputs = inputs.flatMap(input => input.dependsOn ?? []);

  //   return inputs.reduce((acc, fullPropsInput) => {
  //     const { dependsOn, dependType, rules, ...input } = fullPropsInput;

  //     if (!checkMatchedDependsOn(dependsOn, dependType)) return acc;

  //     const inputDependents = dependentInputs
  //       ?.filter(dep => dep.name === input.name)
  //       .flatMap(dep => dep.value);

  //     const newRules = { ...rules, ...mustHaveRules };

  //     const addedRulesInput = {
  //       ...input,
  //       rules: isEmpty(newRules) ? defaultRules : newRules,
  //     };

  //     if (!inputDependents?.length) return [...acc, addedRulesInput as any];

  //     const matchedConditionsRefWithoutInput =
  //       matchedConditionsRef.current.filter(
  //         condition => condition.name !== input.name,
  //       );

  //     const handleChange = (e: any, o: any) => {
  //       input?.onChange?.(e, o);

  //       const inputValue = getInputValue(e, input.inputType);
  //       const isArrayValue = Array.isArray(inputValue);

  //       let isMatched = false;

  //       if (isArrayValue) {
  //         isMatched = !inputValue.some(
  //           (value: any) => !inputDependents.includes(value),
  //         );
  //       } else {
  //         isMatched = inputDependents.includes(inputValue);
  //       }

  //       const beforeUpdate = matchedConditionsRef.current;

  //       matchedConditionsRef.current = [...matchedConditionsRefWithoutInput];

  //       if (isMatched) {
  //         if (isArrayValue) {
  //           matchedConditionsRef.current.push(
  //             ...inputValue.map((value: any) => ({ name: input.name, value })),
  //           );
  //         } else {
  //           matchedConditionsRef.current.push({
  //             name: input.name,
  //             value: inputValue,
  //           });
  //         }
  //       }

  //       if (isEqual(beforeUpdate, matchedConditionsRef.current)) return;

  //       triggerRender(prev => !prev);
  //     };

  //     return [
  //       ...acc,
  //       {
  //         ...addedRulesInput,
  //         onChange: handleChange,
  //       } as any,
  //     ];
  //   }, [] as ListInputFormInputConfig<FV>[]);
  // }, [
  //   inputs,
  //   defaultRules,
  //   mustHaveRules,
  //   checkMatchedDependsOn,
  // ]) as ListInputFormInputConfig<FV>[];

  // const groupedInputs = useMemo(() => {
  //   if (!groupPoints) return [];

  //   const groupedInputsArray = [];
  //   let cloneGroupingPoints = [...groupPoints];
  //   let subInputs: ListInputFormInputConfig<FV>[] = [];

  //   filteredInputs.forEach(input => {
  //     subInputs.push(input);

  //     if (cloneGroupingPoints.includes(input.name)) {
  //       groupedInputsArray.push(
  //         subInputs.map(input => (
  //           <RHFControlledInput control={control} key={input.name} {...input} />
  //         )),
  //       );
  //       subInputs = [];
  //     }
  //   });

  //   if (subInputs.length) {
  //     groupedInputsArray.push(
  //       subInputs.map(input => (
  //         <RHFControlledInput control={control} key={input.name} {...input} />
  //       )),
  //     );
  //   }

  //   return groupedInputsArray;
  // }, [control, filteredInputs, groupPoints]);

  // const renderInputs = useMemo(
  //   () => (
  //     <>
  //       {filteredInputs.map((input: any) => (
  //         <RHFControlledInput key={input.name} {...input} />
  //       ))}
  //     </>
  //   ),
  //   [filteredInputs],
  // );

  //

  //

  //

  /* -------------------------------------------------------------------------- */
  /*                              Controlled Input                              */
  /* -------------------------------------------------------------------------- */

  //#region Controlled Input

  const ControlledInput = useMemo(() => {
    const BaseControlledInput = (props: OmitControlControlledInputProps<FV>) => {
      const {
        name,
        rules,
        value,
        required,
        className,
        inputType,
        inputProps,
        onChange,
        inputRef: userInputRef,
        ...rest
      } = props;

      const formItemProps = useMemo(
        () =>
          Object.entries(props).reduce((acc, [key, value]) => {
            // console.log('hihi', props.name);

            if (formItemPropsKeys.includes(key)) {
              acc[key] = value;
            }
            return acc;
          }, {} as any),
        [props]
      );

      const {
        field,
        fieldState: { error }
      } = useController({ name, control, rules });

      const formSchema = useFormSchema();

      const zodRequired = isFieldRequired(formSchema, name);

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
        } else {
          field.onChange(null);
        }
      };

      const handleBlur = (
        arg0: FocusEvent<HTMLElement, Element> & FocusEvent<HTMLInputElement, Element>,
        info: any
      ) => {
        if (inputType !== 'checkboxGroup') {
          props?.onBlur?.(arg0, info);
          inputProps?.onBlur?.(arg0, info);
        }
        field.onBlur();
      };

      const requiredRule = !!rules?.required || required || zodRequired;

      const componentProps = useMemo(() => {
        const baseProps: any = {
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
            ref={(instance: any) => {
              field.ref(instance);
              if (typeof userInputRef === 'function') {
                userInputRef(instance);
              } else if (userInputRef) {
                (userInputRef as React.MutableRefObject<any>).current = instance;
              }
            }}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Form.Item>
      );
    };

    // #endregion

    const UnmemorizedControlledInput = memo(BaseControlledInput) as unknown as typeof BaseControlledInput;

    /* -------------------------------------------------------------------------- */
    /*                             Compound Components                            */
    /* -------------------------------------------------------------------------- */

    BaseControlledInput.Input = (props: InputControlledInputProps<FV>) => {
      return <BaseControlledInput {...props} inputType='input' />;
    };

    UnmemorizedControlledInput.Input = memo(BaseControlledInput.Input) as typeof BaseControlledInput.Input;

    BaseControlledInput.Numeric = (props: InputControlledInputProps<FV>) => {
      return <BaseControlledInput {...props} inputType='numeric' />;
    };

    UnmemorizedControlledInput.Numeric = memo(BaseControlledInput.Numeric) as typeof BaseControlledInput.Numeric;

    BaseControlledInput.Select = (props: SelectControlledInputProps<FV>) => {
      return <BaseControlledInput {...props} inputType='select' />;
    };

    UnmemorizedControlledInput.Select = memo(BaseControlledInput.Select) as typeof BaseControlledInput.Select;

    BaseControlledInput.RadioGroup = (props: RadioGroupControlledInputProps<FV>) => {
      return <BaseControlledInput {...props} inputType='radioGroup' />;
    };

    UnmemorizedControlledInput.RadioGroup = memo(
      BaseControlledInput.RadioGroup
    ) as typeof BaseControlledInput.RadioGroup;

    BaseControlledInput.Checkbox = (props: CheckboxControlledInputProps<FV>) => {
      return <BaseControlledInput {...props} inputType='checkbox' />;
    };

    UnmemorizedControlledInput.Checkbox = memo(BaseControlledInput.Checkbox) as typeof BaseControlledInput.Checkbox;

    BaseControlledInput.CheckboxGroup = (props: CheckboxGroupControlledInputProps<FV>) => {
      return <BaseControlledInput {...props} inputType='checkboxGroup' />;
    };

    UnmemorizedControlledInput.CheckboxGroup = memo(
      BaseControlledInput.CheckboxGroup
    ) as typeof BaseControlledInput.CheckboxGroup;

    BaseControlledInput.DatePicker = (props: DatePickerControlledInputProps<FV>) => {
      return <BaseControlledInput {...props} inputType='datePicker' />;
    };

    UnmemorizedControlledInput.DatePicker = memo(
      BaseControlledInput.DatePicker
    ) as typeof BaseControlledInput.DatePicker;

    type TimePickerControlledInputProps<FV extends FieldValues> = BaseControlledInputProps<FV> & {
      inputProps?: TimePickerProps;
    } & TimePickerProps;

    BaseControlledInput.TimePicker = (props: TimePickerControlledInputProps<FV>) => {
      return <BaseControlledInput {...props} inputType='timePicker' />;
    };

    UnmemorizedControlledInput.TimePicker = memo(
      BaseControlledInput.TimePicker
    ) as typeof BaseControlledInput.TimePicker;

    return UnmemorizedControlledInput;
  }, [control]);

  return {
    methods,
    // renderInputs,
    // groupedInputs,
    ControlledInput
  };
};

export default useRHFForm;
