import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../../firebase.config";

interface IAuthContext {
  user: User | null;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function signup(email: string, password: string) {
    setLoading(true);
    try {
      const credencials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (credencials && credencials.user) {
        setUser(credencials.user);
      } else {
        setLoading(false);
      }
      return Promise.resolve();
    } catch (e) {
      console.error(e);
      return Promise.reject();
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const credencials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (credencials && credencials.user) {
        setUser(credencials.user);
      } else {
        setLoading(false);
      }
      return Promise.resolve();
    } catch (e) {
      console.error(e);
      return Promise.reject();
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
