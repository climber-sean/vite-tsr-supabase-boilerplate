import * as React from 'react';
import { createClient } from '@supabase/supabase-js';

export interface AuthContext {
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const localStorageKey = 'chores.auth.username';

const setStorageUsername = (username: string) => {
  localStorage.setItem(localStorageKey, username);
};

const getStorageUsername = () => {
  return localStorage.getItem(localStorageKey);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = React.useState<string | null>(
    getStorageUsername()
  );
  const isAuthenticated = !!username;
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  const login = (username: string) => {
    setUsername(username);
    setStorageUsername(username);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem(localStorageKey);
  };

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        login(session?.user?.email as string);
      } else {
        logout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ username, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
