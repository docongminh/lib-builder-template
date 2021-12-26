import {add, sub, div, multiple} from '~/index';

//
test('Add 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

//
test('sub 2 - 1 to equal 1', () => {
expect(sub(2, 1)).toBe(1);
});
//
test('div 4 + 2 to equal 2', () => {
  expect(div(4, 2)).toBe(2);
});
//
test('Add 3 + 2 to equal 6', () => {
expect(multiple(3, 2)).toBe(6);
});