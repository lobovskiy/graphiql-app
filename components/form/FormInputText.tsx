'use client';

import { HTMLInputTypeAttribute } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';

import { Namespaces } from '@/app/i18n/data/i18n.enum';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium';
  margin?: 'none' | 'normal' | 'dense';
}

const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  rules,
  required,
  disabled,
  size,
  margin,
}: Props<T>) => {
  const { t } = useTranslation(Namespaces.ERRORS);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, ...props }, fieldState: { error } }) => (
        <TextField
          helperText={error ? t(`validation.${error.message!}`) : ' '}
          error={!!error}
          size={size}
          margin={margin}
          required={required}
          onChange={onChange}
          fullWidth
          label={label}
          variant="outlined"
          type={type ?? 'text'}
          sx={{ mb: 2 }}
          data-testid={name}
          slotProps={{ input: { disabled }, inputLabel: { shrink: true } }}
          {...props}
        />
      )}
    />
  );
};

export default FormInputText;
