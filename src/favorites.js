const { DB_NAME } = require('./constants');
const {connectIfNeeded, client } = require('./db');

const COL_LISTINGS = 'listings';


/**
 * Finds multiple listing by ListingId
 * @param {Array} ids 
 * @returns {Array} list of listingId + favCount
 */
const getListingsFavCount = async (ids) => {
  await connectIfNeeded();

  const listingFav = await client.db(DB_NAME)
    .collection(COL_LISTINGS)
    .find({ listingId: { $in: ids } }).toArray();

  return listingFav;
}

/**
 * Increments by 1 the favorite count of the specified filter
 * @param {string} listingId 
 * @returns {int} new count of number of favorites for the listing.
 */
const incListingFavCount = async (listingId) => {
  await connectIfNeeded();

  const listingCol = client.db(DB_NAME).collection(COL_LISTINGS);

  const query = { listingId };
  const update = { $inc: { favCount: 1 }};
  const options = { upsert: true, returnDocument: 'after' };

  const result = await listingCol.findOneAndUpdate(
    query,
    update,
    options
  );

  return result.value?.favCount || 0;
}

module.exports = { client, connectIfNeeded, getListingsFavCount, incListingFavCount }