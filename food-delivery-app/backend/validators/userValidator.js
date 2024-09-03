import {nameValidation, emailValidation, passwordValidation} from './validators.js'

const userValidator = [nameValidation,emailValidation,passwordValidation];

export default userValidator;