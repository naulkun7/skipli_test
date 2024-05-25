import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  FC,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (contact: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userContact = localStorage.getItem("userContact");
    if (userContact) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (contact: string) => {
    localStorage.setItem("userContact", contact);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userContact");
    setIsAuthenticated(false);
  };

  const authContextValue = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
