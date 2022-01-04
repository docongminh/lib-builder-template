const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.module.json');
module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests/'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' })
  // moduleNameMapper: {
  //   '^~/(.+)': '<rootDir>/src/$1'
  // }
}