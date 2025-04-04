import { Client, Databases, ID, Query } from 'react-native-appwrite';

const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

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