"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Verifica se há um usuário no localStorage e atualiza o estado
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedData = JSON.parse(storedUser);
      // Verifica se o dado está no formato esperado e acessa o objeto correto
      const userData = parsedData.user ? parsedData.user : parsedData;
      console.log("User loaded from localStorage:", userData); // Exibe os dados do usuário
      setUser(userData);
    } else {
      console.log("No user found in localStorage"); // Caso não haja usuário no localStorage
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
