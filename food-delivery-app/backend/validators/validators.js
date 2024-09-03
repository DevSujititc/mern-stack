import { body } from 'express-validator';

// Define validation rules as constants
export const nameValidation = body('name')
//   .optional()
  .isLength({ min: 1 }).withMessage('Name filed is required');

export const emailValidation = body('email')
  
  .isEmail().withMessage('Email is required and must be valid.');

// Custom password validation function
export const passwordValidation = body('password')
  .custom((value) => {
    if (!value) {
      throw new Error('Password is required');
    }

    const lengthValid = value.length >= 6 && value.length <= 8;
    const upperCaseValid = /[A-Z]/.test(value);
    const lowerCaseValid = /[a-z]/.test(value);
    const numberValid = /\d/.test(value);

    if (!lengthValid || !upperCaseValid || !lowerCaseValid || !numberValid) {
      throw new Error('Password must be 6-8 characters long, contain at least one uppercase, lowercase, and number.');
    }

    return true; // Indicate validation passed
  });