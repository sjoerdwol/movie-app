import { Account, Client, Models } from 'react-native-appwrite';

// setup
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);
const account = new Account(client);

// user sign in
export const signinUser = async (email: string, password: string): Promise<Models.Session> => {
  try {
    const responseSession = await account.createEmailPasswordSession(
      email,
      password
    );

    return responseSession;
  } catch (error) {
    console.log('Error in user signin: ' + error);
    throw error;
  }
}

// user sign out
export const signoutUser = async (): Promise<void> => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.log('Error in user signout: ' + error);
    throw error;
  }
}

// check if the user has a active session
export const checkActiveSession = async (): Promise<Models.Session> => {
  try {
    const activeSession = await account.getSession('current');
    return activeSession;
  } catch (error) {
    console.log('Error while retrieving active session on startup: ' + error);
    throw error;
  }
}

// get active user
export const getUser = async (): Promise<Models.User<Models.Preferences>> => {
  try {
    const activeUser = await account.get();

    return activeUser;
  } catch (error) {
    console.log('Error while getting active user: ' + error);
    throw error;
  }
}