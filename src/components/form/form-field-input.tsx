"use client"

import { useEffect, useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
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

type FormFieldTextareaProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  id: string
  label: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export function FormFieldTextarea<T extends FieldValues>({
  control,
  name,
  id,
  label,
  placeholder,
  rows = 3,
  disabled,
  labelClassName,
  inputClassName,
  errorClassName,
}: FormFieldTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClassName}>
            {label}
          </FieldLabel>
          <Textarea
            {...field}
            id={id}
            rows={rows}
            placeholder={placeholder}
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

type FormFieldFileProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  id: string
  label: string
  accept?: string
  disabled?: boolean
  showImagePreview?: boolean
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export function FormFieldFile<T extends FieldValues>({
  control,
  name,
  id,
  label,
  accept = "image/*",
  disabled,
  showImagePreview = false,
  labelClassName,
  inputClassName,
  errorClassName,
}: FormFieldFileProps<T>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClassName}>
            {label}
          </FieldLabel>
          <Input
            id={id}
            name={name}
            ref={ref}
            type="file"
            accept={accept}
            aria-invalid={fieldState.invalid}
            disabled={disabled}
            className={inputClassName}
            onBlur={onBlur}
            onChange={(event) => {
              const files = event.target.files
              onChange(files)

              if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
              }

              const file = files?.[0]
              setPreviewUrl(file ? URL.createObjectURL(file) : null)
            }}
          />
          {showImagePreview && previewUrl ? (
            <div
              className="mt-2 size-24 rounded-lg border border-border bg-cover bg-center"
              style={{ backgroundImage: `url(${previewUrl})` }}
              role="img"
              aria-label="File preview"
            />
          ) : null}
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
