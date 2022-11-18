export const isEmptySpace = (str) => {
  return /^[^\s]*$/.test(str);
};

export const isEmail = (str) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(str);
};

export const isSpecialCharacter = (str) => {
  return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(str);
};

export const isDigit = (str) => {
  return /\d{1,}/.test(str);
};

export const isEmpty = (str) => {
  return /^$/.test(str);
};

export const isMoreThen = (str, amount) => {
  const regex = new RegExp(`.{${amount},}`);
  return regex.test(str);
};

export const invalidUsername = () => {
  return "The username cannot be empty, must be at least 4 characters long and cannot contain whitespace.";
};

export const invalidEmail = () => {
  return "The email cannot be empty, must not contain whitespace and must be a valid email address.";
};

export const invalidPassword = () => {
  return "Password cannot be empty, must be at least 6 characters long, contain at least 1 number and 1 special character.";
};

export const invalidRepeatPassword = () => {
  return "The passwords don't match.";
};
