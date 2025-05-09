export const isValidPhoneNumber = (num: string | null | undefined) => {
  const phoneRegex = /^\d{10}$/;
  return num && phoneRegex.test(num);
}

export const isValidEmail = (email: string | null | undefined) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email && pattern.test(email);
}

export const isValidLength = (value: string | null | undefined, length: number) => {
  if (!value || (value && value?.length < length)) {
    return false
  }
  return true
}


export const isNumeric = (value: string) => {
  return  /^-?\d+$/.test(value);
}