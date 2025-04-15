import { Account, Client, Databases, ID, Models, Query } from 'react-native-appwrite';

const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const WATCHLIST_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_WATCHLIST_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const db = new Databases(client);

// tracks searches made by a user
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await db.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('searchTerm', query)]
    );

    // check if a record of that search has already been stored
    if (result.documents.length > 0) {
      // if yes, increment the searchCount field
      const existingMovie = result.documents[0];

      await db.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      )
    } else {
      // if no, create a new document and set the initial count to 1
      await db.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
      )
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// gets and returns the trending movies in the app
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await db.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(5), Query.orderDesc('count')]
    );

    return result.documents as unknown as TrendingMovie[];
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

// adds a movie to the watchlist
export const addToWatchlist = async (user: Models.User<Models.Preferences>, movie_id: string, title: string, poster_url: string) => {
  try {
    const alreadyOnWatchlist = await checkIfMovieOnWatchlist(user, movie_id);

    // double checks that the movie is not yet on the wishlist of the user
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
      )
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// removes a movie from the watchlist
export const removeFromWatchlist = async (user: Models.User<Models.Preferences>, movie_id: string) => {
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
      )
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// gets the entire watchlist for a user
export const fetchWatchlistForUser = async (user: Models.User<Models.Preferences> | null): Promise<WatchlistMovie[] | undefined> => {
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

    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

// checks if a specific movie is on the watchlist of the user
export const checkIfMovieOnWatchlist = async (user: Models.User<Models.Preferences> | null, movie_id: string): Promise<boolean | null> => {
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
    } catch (e) {
      console.log(e);
      throw e;
    }
  } else {
    return null;
  }
}

export const signinUser = async (email: string, password: string): Promise<Models.Session> => {
  try {
    const responseSession = await account.createEmailPasswordSession(
      email,
      password
    );

    return responseSession;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getUser = async () => {
  try {
    const activeUser = await account.get();
    return activeUser;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const signoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const getActiveSession = async () => {
  try {
    const activeSession = await account.getSession('current');
    return activeSession;
  } catch (e) {
    console.log(e);
    throw e;
  }
}