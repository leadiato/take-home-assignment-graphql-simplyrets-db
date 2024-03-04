const Favorites = require("./favorites");
const Listings = require('./listings');

/**
 * Increments the total number of favorites for a listing
 * @param {*} _ apollo parent, unused.
 * @param {*} args An object that contains all GraphQL arguments provided for this field.
 * @param {*} contextValue An object shared across all resolvers that are executing for a particular operation
 * @returns listing-id & updated favorite count.
 */
const incrementFav = async (_, args, contextValue) => {

  const { input: { listingId } } = args;
  console.log('listingId:', listingId);

  // increment property fav count
  const favCount = await Favorites.incListingFavCount(listingId);

  return {
    listingId,
    favoriteCount: favCount
  };
};

/**
 * list properties Object including favorite-count.
 * An optional filter by City is supported
 * @param {*} _ apollo parent, unused.
 * @param {*} args An object that contains all GraphQL arguments provided for this field.
 * @param {*} contextValue An object shared across all resolvers that are executing for a particular operation
 * @returns List of Listings that matches the search criteria or an empty list.
 */
const listProperties = async (_, args, contextValue) => {
  const { city } = args;

  // query SimpleRest for list of listings by city
  const listings = await Listings.getListings(city);

  // query DB for fav-count by listings
  const ids = listings.map(l => l.listingId);
  const listingsCount = await Favorites.getListingsFavCount(ids);

  // creates a Map of ListingID:favCount for direct access
  const listingFavMap = listingsCount.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.listingId]: cur.favCount
    }
  }, {});
  
  // combines listing with fav count
  const listingWithFav = listings.map(l => ({
    ...l,
    favoriteCount: listingFavMap[l.listingId] || 0
  }));

  return listingWithFav;
};

module.exports = { incrementFav, listProperties }