// react + react native
import { createContext, useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { Models } from "react-native-appwrite";

// service calls
import { getUser, signinUser, signoutUser, checkActiveSession } from "@/services/appwrite_auth";

// context setup
const AuthContext = createContext<AuthentificationContext | null>(null);

const AuthProvider = ({ children }: AuthContextProps) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const activeSession = await checkActiveSession();
      setSession(activeSession);
      const activeSessionUser = await getUser();
      setUser(activeSessionUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const session = await signinUser(email, password);
      setSession(session);
      const sessionUser = await getUser()
      setUser(sessionUser);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);
    await signoutUser();
    setSession(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ session, user, signin, signout }}>
      {loading ? (
        <Text> Loading ...</Text>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Can't use AuthContext here!");
  };

  return context;
};

export { useAuth, AuthContext, AuthProvider };