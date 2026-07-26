export interface RegistrationFormValues {
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
  profession: string;
  consent: boolean;
}

export type RegistrationFormErrors = Partial<Record<keyof RegistrationFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

export function validateRegistrationForm(values: RegistrationFormValues): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Please enter a valid full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const cleanedMobile = values.mobileNumber.replace(/\D/g, "").slice(-10);
  if (!values.mobileNumber.trim()) {
    errors.mobileNumber = "Please enter your mobile number.";
  } else if (!INDIAN_MOBILE_PATTERN.test(cleanedMobile)) {
    errors.mobileNumber = "Please enter a valid 10-digit Indian mobile number.";
  }

  if (!values.city.trim()) {
    errors.city = "Please enter your city.";
  }

  if (!values.profession) {
    errors.profession = "Please select your current profession or status.";
  }

  if (!values.consent) {
    errors.consent = "Please provide consent to continue.";
  }

  return errors;
}

export function hasErrors(errors: RegistrationFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
