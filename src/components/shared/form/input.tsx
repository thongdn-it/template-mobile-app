import { forwardRef, Ref, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { Control, Controller } from 'react-hook-form';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react-native';

import {
  IInputFieldProps,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '../../ui/input';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '../../ui/form-control';

interface FormInputProps {
  control: Control<any>;
  name: string;
  className?: string;
  title?: string;
  helperText?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: 'text' | 'password';
  inputFieldProps?: IInputFieldProps;
}

export const FormInput = forwardRef<TextInput, FormInputProps>((props, ref) => {
  const isPasswordField =
    props.type === 'password' || props.inputFieldProps?.type === 'password';

  const [showPassword, setShowPassword] = useState(!isPasswordField);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { invalid, error },
      }) => (
        <FormControl isInvalid={invalid} className={props.className}>
          {props.title && (
            <FormControlLabel>
              <FormControlLabelText>{props.title}</FormControlLabelText>
            </FormControlLabel>
          )}
          <Input className="my-1">
            {props.leftIcon}

            <InputField
              ref={ref as Ref<TextInputProps>}
              {...props.inputFieldProps}
              placeholder={
                props.inputFieldProps?.placeholder ?? props.placeholder
              }
              type={
                isPasswordField
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : props.inputFieldProps?.type
              }
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />

            {props.rightIcon}
            {isPasswordField && (
              <InputSlot className="pr-3" onPress={togglePasswordVisibility}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            )}
          </Input>
          {!!props.helperText && (
            <FormControlHelper>
              <FormControlHelperText>{props.helperText}</FormControlHelperText>
            </FormControlHelper>
          )}
          {!!error?.message && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{error.message}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
      )}
    />
  );
});
