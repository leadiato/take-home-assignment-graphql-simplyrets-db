const { getToken } = require('../../src/utils.js');

describe('Utils', ()=> {
  test('getToken extract bearer token', () => {
    expect(getToken('Bearer 123')).toEqual('123');

    expect(() => getToken(null)).toThrow();
    expect(() => getToken(undefined)).toThrow();
    expect(getToken('')).toBeFalsy();
    expect(getToken('Bearer')).toBeFalsy();
    expect(getToken('no 123')).toBeFalsy();
  });
});
