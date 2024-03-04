const { incrementFav, listProperties } = require('../../src/controller');
const Listings = require('../../src/listings');
const Users = require('../../src/users');
const Favorites = require('../../src/favorites');

jest.mock('../../src/users');
jest.mock('../../src/listings.js');


describe('Controller', ()=> {

  beforeEach(() => {
    // mock auth user dependency
    Users.getAuthUser = jest.fn().mockResolvedValue();
  });

  afterEach(() => {
    Users.getAuthUser.mockReset();
  });

  test('incrementFav', async () => {
    expect.assertions(2);
    const listingId = '123';

    // mock update values on DB
    Favorites.incListingFavCount = jest.fn().mockResolvedValue(1);

    expect(await incrementFav(null, {input: { listingId }}, 'contextValue')).toEqual({
        listingId,
        favoriteCount: 1
    })
    expect(Favorites.incListingFavCount).toHaveBeenCalledWith(listingId);
  });

  test('listProperties', async () => {
    expect.assertions(3);
    const city = 'sf';

    // mock update values on DB
    Favorites.getListingsFavCount = jest.fn().mockResolvedValue([
      {listingId: 'a', favCount: 1},
      {listingId: 'b', favCount: 2}
    ]);

    // mock SimpleRest APIs
    Listings.getListings = jest.fn().mockResolvedValue([
      { listingId: 'a', price: 100 },
      { listingId: 'b', price: 200 },
      { listingId: 'c', price: 300 }
    ]);

    expect(await listProperties(null, { city })).toEqual([
      { listingId: 'a', price: 100, favoriteCount: 1 },
      { listingId: 'b', price: 200, favoriteCount: 2 },
      { listingId: 'c', price: 300, favoriteCount: 0 }
    ]);
    expect(Listings.getListings).toHaveBeenCalledWith(city);
    expect(Favorites.getListingsFavCount).toHaveBeenCalledWith(['a', 'b', 'c']);
  });
  
});
