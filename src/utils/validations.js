import i18n from '../i18n'
import { validate as isValidEmail } from 'email-validator'

const getError = (key, props) => i18n.t(`validations.${key}`, props)

export default {
  required: val => !!val || getError('required'),
  email: val => isValidEmail(val) || getError('email'),
  minLength: min => val => val.length >= min || getError('minLength', { min }),
  sameAs: same => val => val === same || getError('sameAs'),
  numeric: val => !isNaN(val) || getError('numeric'),
  integer: val => (!isNaN(val) && Math.trunc(val) === Number(val)) || getError('integer')
}
