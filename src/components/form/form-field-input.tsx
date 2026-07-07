"use client"

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type FormFieldInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  id: string
  label: string
  type?: React.ComponentProps<"input">["type"]
  autoComplete?: string
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export function FormFieldInput<T extends FieldValues>({
  control,
  name,
  id,
  label,
  type = "text",
  autoComplete,
  placeholder,
  disabled,
  maxLength,
  labelClassName,
  inputClassName,
  errorClassName,
}: FormFieldInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClassName}>
            {label}
          </FieldLabel>
          <Input
            {...field}
            id={id}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            maxLength={maxLength}
            aria-invalid={fieldState.invalid}
            disabled={disabled}
            className={inputClassName}
          />
          {fieldState.invalid ? (
            <FieldError className={errorClassName} errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  )
}

type FormRootErrorProps = {
  message?: string | null
  className?: string
}

export function FormRootError({ message, className }: FormRootErrorProps) {
  if (!message) {
    return null
  }

  return (
    <Field data-invalid className={cn("mt-4", className)}>
      <FieldError>{message}</FieldError>
    </Field>
  )
}
