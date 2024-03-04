const mongodb = require('mongodb');
jest.mock('mongodb');
const {
  getListingsFavCount, incListingFavCount 
} = require('../../src/favorites');

describe('Favorites', ()=> {
  const {
    findSpy,
    findOneAndUpdateSpy
  } = jest.requireMock('mongodb');

  afterEach(() => {
    findSpy.mockClear();
    findOneAndUpdateSpy.mockClear();
  });

  test('getListingsFavCount', async () => {
    expect.assertions(2);

    const ids = ['a', 'b'];
    const listings = [{
      listingId: 'a',
      favCount: 20
    }];


    findSpy.mockImplementation((query) => {
      expect(query).toEqual({ listingId: { $in: ids } });
      return {
        toArray: () => listings
      };
    });

    expect(await getListingsFavCount(ids)).toEqual(listings);
  });

  test('incListingFavCount finds expected counter', async () => {
    expect.assertions(4);

    const listingId = 'a';

    findOneAndUpdateSpy.mockImplementation((query, update, options) => {
      expect(query).toEqual({ listingId });
      expect(update).toEqual({ $inc: { favCount: 1 }});
      expect(options).toEqual({ upsert: true, returnDocument: 'after' });
      return {
        value: {
          favCount: 29
        }
      };
    });

    expect(await incListingFavCount(listingId)).toEqual(29);
  });

  test('incListingFavCount returns 0 when no record found', async () => {
    expect.assertions(4);

    const listingId = 'a';

    findOneAndUpdateSpy.mockImplementation((query, update, options) => {
      expect(query).toEqual({ listingId });
      expect(update).toEqual({ $inc: { favCount: 1 }});
      expect(options).toEqual({ upsert: true, returnDocument: 'after' });
      return {};
    });

    expect(await incListingFavCount(listingId)).toEqual(0);
  });
});
