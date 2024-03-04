Please read the PLEASE_READ_FIRST.md first. ✅

Please document your code & design decisions here. ✅

## What's included
- New GraphQL mutation that increments the favorite counter of a property.
  > Note: it is by design that I'm not validating if the property exists previously to increment the counter.
- New GraphQL query to list properties from SimplyRETS API + the count of favorite stored on Mongo.
- Added Bearer HTTP Authentication to restrict access to all GraphQL endpoints using Apollo context definition.
- Unit Test for every method.

## What's not included
- In order to keep the project simple, usernames and password to access SimpleRest are located in `src/constants.js` file in plain text.


## Architecture design
- Every GraphQL API its implemented in `src/controller.js` file. The controller has the business logic to retrieve the information that needs, and what to do with it.
- Every model encapsulates the mechanism to access its data, for example, database entities like `users` and `favorites` implement methods to read and write to mongoDb.
- In a simmilar way, all operations related Properties are under `src/listings.js` to hide the implementaion aspect of where and how to retreive information about properties via SimpleREST apis.

## Challenges
- MongoDB: I was not familiarized with mongoDb operations. For example, when increasing the favorite count of a property, my initial though was to search by ID, if the records is found, increase the count with an Update operation, if the record is not present use the Insert operation. Instead I learned that I could use the "upsert" option to to perform the search + insert|update in single atomic command.
- Unit Test: it took me some time mock mongodb when writting test for those entities that required access to mongoDb. Searching online pointed me to use localmongo to seed my test db, instead I choose to use jest.mock to validate what apis were used, what arguments passed and control the output.

## Notes
- Dependencies hasn't been upgraded.
- `axios` has been included as dependency to access simpleRest APIs.