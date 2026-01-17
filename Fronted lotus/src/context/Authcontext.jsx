
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Backend base URL
const backendurl = "http://localhost:5000";
axios.defaults.baseURL = backendurl;

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use auth context easily
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  if (!children) {
    throw new Error('AuthProvider requires children');
  }

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batingdetails, setBetingDetial] = useState("");
const [balance, setBalance] = useState(null);
  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
    }
  }, []);

  // Register API call
  const register = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/users/register', data);
      toast.success(response.data.message || 'Registered successfully');
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Login API call
  const login = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/users/login', data);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
    toast.info('Logged out');
  };

  // AuthProvider component (add this inside it)

const checkUsernameUnique = async (username) => {
  if (!username) return false;

  try {
    const response = await fetch(`${backendurl}/api/users/check-username-prefix`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    // API returns { exists: false } => username is unique
    return !data.exists;  // Correct logic
  } catch (error) {
    console.error("Failed to check username uniqueness", error);
    return false;
  }
};
//  for balanece fetching
 


// Inside AuthProvider (before return)
const fetchBalance = async () => {
  if (!user?.id) return;
  try {
    const response = await fetch(`${backendurl}/api/deposit/total-deposited/` + user.id);
    if (!response.ok) throw new Error("Failed to fetch balance");
    const data = await response.json();
    setBalance(data.totalDeposited);
  } catch (error) {
    console.error("Error fetching balance:", error);
    setBalance(0);
  }
};

// Automatically call it when user logs in or changes
useEffect(() => {
  if (user?.id) {
    fetchBalance();
  }
}, [user]);





  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout ,checkUsernameUnique ,
      batingdetails, setBetingDetial,backendurl,balance, setBalance,fetchBalance 
     }}>
      {children}
    </AuthContext.Provider>
  );
};
