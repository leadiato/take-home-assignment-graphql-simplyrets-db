const axios = require('axios');
const { getListings } = require('../../src/listings.js');

jest.mock('axios');

describe('Listings', ()=> {

  test('getListings accepts empty city', async () => {
    expect.assertions(8);

    const resp = {statusText: 'OK', data: [{listingId: 'a'}, {listingId: 'b'}]};
    axios.get.mockImplementation((url) => {
      expect(url.includes('cities')).toBeFalsy()
      return resp;
    });

    expect(await getListings()).toHaveLength(2);
    expect(await getListings("")).toHaveLength(2);
    expect(await getListings(undefined)).toHaveLength(2);
    expect(await getListings(null)).toHaveLength(2);
  });

  test('getListings creates valid query-param', async () => {
    expect.assertions(2);

    const resp = {statusText: 'OK', data: [{listingId: 'a'}, {listingId: 'b'}]};
    
    let city = 'sf';
    axios.get.mockImplementation((url) => {
      expect(url.includes(`cities=${city}`)).toBeTruthy();
      return resp;
    });

    expect(await getListings(city)).toHaveLength(2);
  });

  test('getListings returns empty list if error', async () => {
    expect.assertions(2);

    const resp = { statusText: 'ERROR' };
    
    let city = 'sf';
    axios.get.mockImplementation((url) => {
      expect(url.includes(`cities=${city}`)).toBeTruthy();
      return resp;
    });

    expect(await getListings(city)).toHaveLength(0);
  });
});
