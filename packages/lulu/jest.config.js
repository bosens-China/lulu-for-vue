/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    // 哪些文件需要用 ts-jest 执行
    '^.+\\.tsx?$': 'babel-jest',
  },
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: [
    // jest 扫描的目录
    './src',
  ],
};
