import { ref, Ref } from "vue";

export interface ValidationRule {
  test: (value: unknown) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormField {
  value: unknown;
  rules: ValidationRule[];
  errors: string[];
}

export function useFormValidation() {
  const fields: Record<string, FormField> = {};

  const registerField = (
    name: string,
    initialValue: unknown,
    rules: ValidationRule[],
  ) => {
    fields[name] = {
      value: initialValue,
      rules,
      errors: [],
    };
  };

  const validateField = (name: string, value: unknown): ValidationResult => {
    const field = fields[name];
    if (!field) {
      throw new Error(`Field ${name} not registered`);
    }

    field.errors = [];
    field.value = value;

    field.rules.forEach((rule) => {
      if (!rule.test(value)) {
        field.errors.push(rule.message);
      }
    });

    return {
      isValid: field.errors.length === 0,
      errors: field.errors,
    };
  };

  const validateAll = (): boolean => {
    let isValid = true;
    Object.keys(fields).forEach((fieldName) => {
      const result = validateField(fieldName, fields[fieldName].value);
      if (!result.isValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const getFieldErrors = (name: string): string[] => {
    return fields[name]?.errors || [];
  };

  const clearErrors = () => {
    Object.values(fields).forEach((field) => {
      field.errors = [];
    });
  };

  return {
    registerField,
    validateField,
    validateAll,
    getFieldErrors,
    clearErrors,
  };
}

// Common validation rules
export const rules = {
  required: (message = "This field is required"): ValidationRule => ({
    test: (value: unknown) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined;
    },
    message,
  }),

  email: (message = "Please enter a valid email address"): ValidationRule => ({
    test: (value: unknown) => {
      if (typeof value !== "string") return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message,
  }),

  phone: (message = "Please enter a valid phone number"): ValidationRule => ({
    test: (value: unknown) => {
      if (typeof value !== "string") return false;
      return /^\d+$/.test(value.replace(/[\s-]/g, ""));
    },
    message,
  }),

  minLength: (
    length: number,
    message = `Must be at least ${length} characters`,
  ): ValidationRule => ({
    test: (value: unknown) => {
      if (typeof value !== "string") return false;
      return value.length >= length;
    },
    message,
  }),

  maxLength: (
    length: number,
    message = `Must be no more than ${length} characters`,
  ): ValidationRule => ({
    test: (value: unknown) => {
      if (typeof value !== "string") return false;
      return value.length <= length;
    },
    message,
  }),
};
