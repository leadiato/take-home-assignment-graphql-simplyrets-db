const constructorSpy = jest.fn();
const connectSpy = jest.fn();
const databaseSpy = jest.fn();
const commandSpy = jest.fn();
const collectionSpy = jest.fn();
const findSpy = jest.fn();
const findOneSpy = jest.fn();
const findOneAndUpdateSpy = jest.fn();

class MongoClient {
  constructor(url, options) {
    constructorSpy(url, options);
  }

  connect() {
    return connectSpy();
  }

  db() {
    return {
      command: commandSpy.mockResolvedValue(true),
      collection: collectionSpy.mockImplementation(() => ({
        find: findSpy,
        findOne: findOneSpy,
        findOneAndUpdate: findOneAndUpdateSpy
      }))
    };
  }
}

const ServerApiVersion = { v1: '1' };

module.exports = { 
  constructorSpy, 
  connectSpy, 
  commandSpy,
  databaseSpy,
  collectionSpy,
  findSpy,
  findOneSpy,
  findOneAndUpdateSpy,
  MongoClient, 
  ServerApiVersion 
};