import { add } from '../src/index';
import { expect } from 'chai';

describe('Add test', () => {
    it('returns 1+1=2', () => {
        const sum = add(1, 1);
        expect(sum).to.equal(2);
    });
});