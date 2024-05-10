import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  real_name: string | null;
  bio: string | null;
  profile_pic: string | null;
  posts: number;
  followers: number;
  following: number;
}

export interface PostObj {
  id: number;
  user_id: number;
  content: string;
  image: string;
  category: string | null;
  date_posted: string;
  likes: number;
  comments: number;
  user: User;
}

interface AuthContextType {
  isAuthenticated: boolean;
  uName: string;
  user: User;
  login: (userName: string, usr: User) => void;
  logout: () => void;
  updateUser: (
    uName: string,
    fName: string,
    bio: string,
    profPic: string
  ) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uName, setUName] = useState("");
  const [user, setUser] = useState<User>({
    id: 0,
    username: "ab",
    email: "ab",
    password: "ab",
    real_name: null,
    bio: null,
    profile_pic: null,
    posts: 0,
    followers: 0,
    following: 0
  });
  const history = useHistory();

  const login = (userName: string, usr: User) => {
    setIsAuthenticated(true);
    setUName(userName);
    setUser(usr);
    console.log(uName);
    localStorage.setItem("userData", JSON.stringify(usr));
    history.push("/home");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUName("");
    setUser({
      id: 0,
      username: "ab",
      email: "ab",
      password: "ab",
      real_name: null,
      bio: null,
      profile_pic: null,
      posts: 0,
      followers: 0,
    following: 0
    });
    localStorage.removeItem("userData");
    history.push("/login");
  };

  const updateUser = (
    uName: string,
    fName: string,
    bio: string,
    profPic: string
  ) => {
    user.username = uName;
    user.real_name = fName;
    user.bio = bio;
    user.profile_pic = profPic;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, uName, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
