import { makeNesting } from './nextintl';

test('test nesting', () => {
  expect(makeNesting({})).toEqual({});
  expect(makeNesting({ a: 'valueA', b: 'valueB' })).toEqual({ a: 'valueA', b: 'valueB' });
  expect(makeNesting({ 'Account.new': 'valueA' })).toEqual({ Account: { new: 'valueA' } });
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
  });
  expect(
    Object.keys(
      makeNesting({
        'a.a': 'A',
        'a.c': 'C',
        'a.b': 'B',
      }).a,
    ),
  ).toEqual(['a', 'b', 'c']);
});
