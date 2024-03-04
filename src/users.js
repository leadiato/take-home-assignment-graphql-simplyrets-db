const { DB_NAME } = require('./constants');
const {connectIfNeeded, client } = require('./db');

const COL_USERS = 'users';

/**
 * finds a user by token
 * @param {Object} contextValue 
 * @returns User object if found, or throws an error if not.
 */
const getAuthUser = async (authToken) => {
  await connectIfNeeded();

  const user = await client.db(DB_NAME).collection(COL_USERS).findOne({ token: authToken });
  return user;
}

module.exports = { getAuthUser };