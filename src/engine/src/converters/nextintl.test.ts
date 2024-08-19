import { makeNesting } from './nextintl';

it('should return empty object', () => expect(makeNesting({})).toEqual({}));
it('should return same object', () =>
  expect(makeNesting({ a: 'valueA', b: 'valueB' })).toEqual({ a: 'valueA', b: 'valueB' }));
it('should return nested object', () =>
  expect(makeNesting({ 'Account.new': 'valueA' })).toEqual({ Account: { new: 'valueA' } }));
it('should return nested object(complex sample)', () =>
  expect(
    makeNesting({
      'Account.new': '新規アカウント',
      'Account.login': 'ログイン',
      'Editor.new': '新規作成',
      'Editor.form.text': 'テキスト',
      'Editor.form.save': '保存',
      logout: 'ログアウト',
    }),
  ).toEqual({
    Account: {
      login: 'ログイン',
      new: '新規アカウント',
    },
    Editor: {
      form: {
        text: 'テキスト',
        save: '保存',
      },
      new: '新規作成',
    },
    logout: 'ログアウト',
  }));
it('should return object keys as sorted', () =>
  expect(
    Object.keys(
      makeNesting({
        'a.a': 'A',
        'a.c': 'C',
        'a.b': 'B',
      }).a,
    ),
  ).toEqual(['a', 'b', 'c']));
it('should throw error (already defined as value)', () =>
  expect(() => makeNesting({ 'a.a': 'A', 'a.a.b': 'B' })).toThrow());
it('should throw error (already defined as object)', () =>
  expect(() =>
    makeNesting({
      'a.a.b': 'B',
      'a.a.c': 'C',
      'a.a': 'A',
    }),
  ).toThrow());
