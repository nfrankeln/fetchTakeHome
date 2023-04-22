
[See it live](https://stellar-sprinkles-826280.netlify.app/)

## Installation Steps:

1. Fork and clone the repository.
2. Navigate to the `fetchFrontEnd` directory.
3. Run `npm install`.
4. Run `npm run dev`.

## About the Project:

This was a takehome project for [fetch](https://fetch.com/).

### General Requirements:

You first should have users enter their name and email on a login screen. Then, you should use this information to hit our login endpoint to authenticate with our service.

Once a user is successfully authenticated, they should be brought to a search page where they can browse available dogs. This page must meet the following requirements:

- Users must be able to filter by breed
- Results should be paginated
- Results should be sorted alphabetically by breed by default. Users should be able to modify this sort to be ascending or descending.
- All fields of the Dog object (except for id) must be presented in some form
- Users should be able to select their favorite dogs from the search results. When finished searching, they should be able to generate a match, which will be a single dog.

### Technologies used:

- React
- Chakra UI
- React Hook Forms

### Issues and Learning Experience:

#### Issues:

1. Encountered a CORS issue when trying to call API from localhost solution need to set react dev to `--host` to expose the network.
2. Did not realize an endpoint sorts param was asking for the object response fields not the query param field.
3. Found a bug? While the API endpoint `/dogs/search` has a response limit of 10,000 dogs when called with the `from 9875` parameter returns a next URL that will cause an internal server error if called.
4. Found another bug: `/locations/search` docs mention it can take in "This object must contain one of the following combinations of properties: top, left, bottom, right bottom_left, top_right bottom_right, top_left," yet the first combination resulted in internal server error.
5. Didn't realize `([...set])` gave an extra space by default which caused API calls to fail.

#### Learning Experience:

1. Create autocomplete for breed search - implement a trie.
2. Learning how to use loader data vs useEffect.
3. Learning Chakra UI.
4. learned How to promp chat gpt to make docstrings!
5. Learning about how to set and parse search query params.
6. Trying out ES Lint and Prettier


#### Next Steps 
1. learn how to effectivly order routes to avoid unessary rereders 
2. learn how to use chakra ui themes to avoid having to add styles directly on components
3. start with a testing framework
4. learn storybook to document my work

