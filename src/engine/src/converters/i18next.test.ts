import { valueEscape } from './i18next';

test('escape format string', () => {
  expect(valueEscape(undefined)).toBe('');
  expect(valueEscape('')).toBe('');
  expect(valueEscape('hello')).toBe('hello');
  expect(valueEscape('hello %s')).toBe('hello {{v1}}');
  expect(valueEscape('hello %1$s')).toBe('hello {{arg1}}');
  expect(valueEscape('hello %1$s %2$s')).toBe('hello {{arg1}} {{arg2}}');
  expect(valueEscape('hello %1$s %s')).toBe('hello {{arg1}} {{v1}}');
  expect(valueEscape('%d %f')).toBe('{{v1}} {{v2}}');
  expect(valueEscape('%4d %.2f')).toBe('{{v1, minimumIntegerDigits: 4}} {{v2, minimumFractionDigits: 2}}');
  expect(valueEscape('%4.2f')).toBe('{{v1, minimumIntegerDigits: 4, minimumFractionDigits: 2}}');
  expect(() => valueEscape('%hogefuga')).toThrow();
});
