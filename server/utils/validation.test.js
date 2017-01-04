/**
 * Created by Terry on 2017-01-04.
 */
const expect = require('expect');
var { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const isString = isRealString(12342);
        expect(isString).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const isString = isRealString('     ');
        expect(isString).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        const isString = isRealString('   wow this is awesome  ');
        expect(isString).toBe(true);
    });
})