const mongodb = require('mongodb');
jest.mock('mongodb');
const { 
  connectIfNeeded, 
  // getListingsFavCount, incListingFavCount 
} = require('../../src/db.js');

describe('DB Access', ()=> {
  const {
    constructorSpy,
    connectSpy,
    commandSpy
  } = jest.requireMock('mongodb');

  afterEach(() => {
    constructorSpy.mockClear();
    connectSpy.mockClear();
    commandSpy.mockClear();
  });

  test('connectIfNeeded only opens one connection', async () => {
    
    expect(constructorSpy).toHaveBeenCalledTimes(1);

    expect(await connectIfNeeded()).toBeUndefined();
    expect(await connectIfNeeded()).toBeUndefined();

    expect(connectSpy).toHaveBeenCalledTimes(1);
    expect(commandSpy).toHaveBeenCalledTimes(1);
  });
});
