const mongodb = require('mongodb');
jest.mock('mongodb');
const { getAuthUser } = require('../../src/users.js');

describe('Users', ()=> {
  const {
    findOneSpy
  } = jest.requireMock('mongodb');

  afterEach(() => {
    findOneSpy.mockClear();
  });


  test('getAuthUser', async () => {
    expect.assertions(2);
    const token = '123';
    const user = {
      email: 'user1@sideinc.com',
      token: token
    };

    findOneSpy.mockImplementation((query) => {
      expect(query).toEqual({"token": token});
      return user
    });

    expect(await getAuthUser(token)).toEqual(user);
  });
});
