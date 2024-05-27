import React, { createContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { auth, googleProvider } from "../config/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        try {
          const response = await api.get('/auth/current-user');
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, []);

  const updateUser = async () => {
    try {
      const response = await api.get('/auth/current-user');
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      // Save the token and user info in local storage
      localStorage.setItem("accessToken", token);
      const response = await api.post("/auth/login", {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser,signInWithGoogle }}>
      {children}
    </UserContext.Provider>
  );
};
