const { MongoClient, ServerApiVersion } = require("mongodb");
const { DB_URI, DB_NAME } = require('./constants');

const COL_LISTINGS = 'listings';

const client = new MongoClient(DB_URI,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

let connected = false;

// opens a connection to Mongo
const connectIfNeeded = async () => {
  try {
    if (!connected) {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      await client.db('admin').command({ ping: 1 });
      console.log('You successfully connected to MongoDB!');
      connected = true;
    }
  } catch(e) {
    console.error('Connection error:', e);
    throw new Error('DB error');
  }
}

// /**
//  * Finds multiple listing by ListingId
//  * @param {Array} ids 
//  * @returns {Array} list of listingId + favCount
//  */
// const getListingsFavCount = async (ids) => {
//   await connectIfNeeded();

//   const listingFav = await client.db(DB_NAME)
//     .collection(COL_LISTINGS)
//     .find({ listingId: { $in: ids } }).toArray();

//   return listingFav;
// }

// /**
//  * Increments by 1 the favorite count of the specified filter
//  * @param {string} listingId 
//  * @returns {int} new count of number of favorites for the listing.
//  */
// const incListingFavCount = async (listingId) => {
//   await connectIfNeeded();

//   const listingCol = client.db(DB_NAME).collection(COL_LISTINGS);

//   const query = { listingId };
//   const update = { $inc: { favCount: 1 }};
//   const options = { upsert: true, returnDocument: 'after' };

//   const result = await listingCol.findOneAndUpdate(
//     query,
//     update,
//     options
//   );

//   return result.value?.favCount || 0;
// }

module.exports = { client, connectIfNeeded };