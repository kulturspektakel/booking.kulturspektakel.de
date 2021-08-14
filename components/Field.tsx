import {Input, InputProps, useFormControlContext} from '@chakra-ui/react';
import {useFormikContext} from 'formik';
import React from 'react';

export default function Field({
  as = Input,
  onBlur: onBlurUser,
  ...props
}: InputProps) {
  const {id, isRequired} = useFormControlContext();
  const {getFieldProps, touched, errors} =
    useFormikContext<{[key: string]: string}>();
  const {name, value: v, onBlur, ...fieldProps} = getFieldProps(id);
  const value = v ?? '';

  const isInvalid =
    isRequired && touched[id] && (Boolean(errors[id]) || !value);

  const inputProps: InputProps = {
    name: id,
    isInvalid,
    bg: 'white',
    value,
    onBlur: onBlurUser
      ? (e) => {
          onBlurUser(e);
          onBlur(e);
        }
      : onBlur,
    ...fieldProps,
    ...props,
  };

  return React.createElement(as ?? Input, inputProps);
}
