import { Client, Databases, ID, Models, Query } from 'react-native-appwrite';

// setup
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const METRICS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_METRICS_COLLECTION_ID!;
const WATCHLIST_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_WATCHLIST_COLLECTION_ID!;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);
const db = new Databases(client);

// adds a movie to the watchlist of the active user
export const addToWatchlist = async (user: Models.User<Models.Preferences>, movie_id: string, title: string, poster_url: string) => {
  try {
    const alreadyOnWatchlist = await checkIfWatchlisted(user, movie_id);

    // double checks that the movie is not already on the wishlist of the user
    if (!alreadyOnWatchlist) {
      await db.createDocument(
        DATABASE_ID,
        WATCHLIST_COLLECTION_ID,
        ID.unique(),
        {
          userId: user.$id,
          movieId: parseInt(movie_id),
          title: title,
          poster_url: `https://image.tmdb.org/t/p/w500${poster_url}`
        }
      );
    }
  } catch (error) {
    console.log('Error while adding the movie to the watchlist: ' + error);
    throw error;
  }
}

// removes a movie from the watchlist of the active user
export const removeFromWatchlist = async (user: Models.User<Models.Preferences>, movie_id: string): Promise<void> => {
  try {
    const result = await db.listDocuments(
      DATABASE_ID,
      WATCHLIST_COLLECTION_ID,
      [Query.equal('movieId', parseInt(movie_id)), Query.equal('userId', user.$id)]
    );

    // double checks if the movie is actually on the users watchlist
    if (result.documents.length > 0) {
      await db.deleteDocument(
        DATABASE_ID,
        WATCHLIST_COLLECTION_ID,
        result.documents[0].$id
      );
    }
  } catch (error) {
    console.log('Error while removing the movie from the watchlist: ' + error);
    throw error;
  }
}

// creates / updates the count for the queried movie
export const updateSearchCount = async (query: string, movie: Movie): Promise<void> => {
  try {
    const result = await db.listDocuments(
      DATABASE_ID,
      METRICS_COLLECTION_ID,
      [Query.equal('searchTerm', query)]
    );

    // check if a record of that search has already been stored
    if (result.documents.length > 0) {
      // if yes, increment the searchCount field
      const existingMovie = result.documents[0];

      await db.updateDocument(
        DATABASE_ID,
        METRICS_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      );
    } else {
      // if no, create a new document and set the initial count to 1
      await db.createDocument(
        DATABASE_ID,
        METRICS_COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
      );
    }
  } catch (error) {
    console.log('Error while creating / updating the search count: ' + error);
    throw error;
  }
}

// gets and returns the trending movies in the app
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await db.listDocuments(
      DATABASE_ID,
      METRICS_COLLECTION_ID,
      [Query.limit(5), Query.orderDesc('count')]
    );

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log('Error while getting the trending movies: ' + error);
    return undefined;
  }
}

// gets the entire watchlist for a user
export const getUserWatchlist = async (user: Models.User<Models.Preferences> | null): Promise<WatchlistMovie[] | undefined> => {
  if (user) {
    try {
      const result = await db.listDocuments(
        DATABASE_ID,
        WATCHLIST_COLLECTION_ID,
        [Query.equal('userId', user.$id), Query.orderDesc('$createdAt')]
      );

      // double checks if the user has movies on the watchlist
      if (result.documents.length > 0) {
        return result.documents as unknown as WatchlistMovie[];
      }

    } catch (error) {
      console.log('Error while getting the user watchlist: ' + error);
      throw error;
    }
  }
}

// checks if a specific movie is on the watchlist of the user
export const checkIfWatchlisted = async (user: Models.User<Models.Preferences> | null, movie_id: string): Promise<boolean | null> => {
  if (user) {
    try {
      const result = await db.listDocuments(
        DATABASE_ID,
        WATCHLIST_COLLECTION_ID,
        [Query.equal('movieId', parseInt(movie_id)), Query.equal('userId', user.$id)]
      );

      // checks if the movie is on the list and returns a boolean value accordingly
      if (result.documents.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error while checking if watchlisted: ' + error);
      throw error;
    }
  } else {
    return null;
  }
}