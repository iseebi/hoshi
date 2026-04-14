import { validateXmlAttributes } from './androidXml';

test('valid XML attributes', () => {
  expect(() => validateXmlAttributes('xmlns:tools="http://schemas.android.com/tools"')).not.toThrow();
  expect(() => validateXmlAttributes('tools:ignore="TypographyDashes"')).not.toThrow();
  expect(() => validateXmlAttributes(`xmlns:tools="http://schemas.android.com/tools" tools:ignore="MissingTranslation"`)).not.toThrow();
  expect(() => validateXmlAttributes(`_attr="value"`)).not.toThrow();
  expect(() => validateXmlAttributes(`attr-attr="value"`)).not.toThrow();
  expect(() => validateXmlAttributes(`attr='single-quoted'`)).not.toThrow();
  expect(() => validateXmlAttributes('attr="any" attr="any"')).not.toThrow();
  expect(() => validateXmlAttributes('attr="any"   attr="any"')).not.toThrow();
  expect(() => validateXmlAttributes('')).not.toThrow();
});

test('invalid XML attributes', () => {
  expect(() => validateXmlAttributes('123attr="value"')).toThrow();
  expect(() => validateXmlAttributes('attr=value')).toThrow();
  expect(() => validateXmlAttributes('attr="val<ue"')).toThrow();
  expect(() => validateXmlAttributes('attr="unclosed')).toThrow();
  expect(() => validateXmlAttributes('attr="any"attr="any"')).toThrow();
  expect(() => validateXmlAttributes('<script>')).toThrow();
});
