import self from './normalize-comment.js';

describe('src/parts/transformer/normalize-comment.ts', () => {
  const cases = [
    { given: 'foo bar baz', expected: 'foo bar baz' },
    { given: 'foo    bar   baz', expected: 'foo bar baz' },
    { given: 'foo\nbar\n\nbaz', expected: 'foo bar baz' },
    { given: 'foo\nbar baz', expected: 'foo bar baz' },
    { given: 'foo \nbar    baz', expected: 'foo bar baz' },
  ];

  for (const c of cases) {
    const result = self(c.given);

    it(`given ${c.given} should return ${c.expected}`, () => {
      expect(result).toBe(c.expected);
    });
  }
});
