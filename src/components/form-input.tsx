import React from "react";

interface FormInputProps {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  prefix?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  isTextArea,
  prefix,
}) => {
  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex items-center">
        {prefix && (
          <span className="px-3 py-2 text-sm rounded-l-md border border-input bg-muted">
            {prefix}
          </span>
        )}
        {isTextArea ? (
          <textarea
            id={id}
            className={`flex w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              prefix ? "rounded-l-none" : ""
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            type="text"
            id={id}
            className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              prefix ? "rounded-l-none" : ""
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};