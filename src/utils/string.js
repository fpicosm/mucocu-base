import { upperFirst, camelCase, words } from 'lodash'

export const pascalCase = string => words(string)
  .map(s => upperFirst(camelCase(s)))
  .join(' ')
