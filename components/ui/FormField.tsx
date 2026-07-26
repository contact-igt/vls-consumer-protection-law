import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface FieldWrapperProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FieldWrapper({ id, label, error, required, children }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brand-black">
        {label} {required && <span className="text-brand-red-600">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-brand-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBaseStyles =
  "w-full rounded-lg border bg-white px-4 py-2.5 text-base text-brand-black placeholder:text-brand-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red-500 min-h-11";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
};

export function TextInput({ id, label, error, required, className, ...props }: TextInputProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} required={required}>
      <input
        id={id}
        className={cn(inputBaseStyles, error ? "border-brand-red-500" : "border-brand-gray-300", className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldWrapper>
  );
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  options: string[];
  placeholder?: string;
};

export function SelectInput({
  id,
  label,
  error,
  required,
  options,
  placeholder = "Select an option",
  className,
  ...props
}: SelectInputProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} required={required}>
      <select
        id={id}
        className={cn(inputBaseStyles, error ? "border-brand-red-500" : "border-brand-gray-300", className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

type CheckboxInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: React.ReactNode;
  error?: string;
};

export function CheckboxInput({ id, label, error, className, ...props }: CheckboxInputProps) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-brand-gray-700">
        <input
          id={id}
          type="checkbox"
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 rounded border-brand-gray-300 text-brand-red-600 focus:ring-2 focus:ring-brand-red-500",
            className
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-brand-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
