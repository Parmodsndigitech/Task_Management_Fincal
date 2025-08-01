import React, {createContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Constants/Colors';
export const  ThemeContext = createContext();
export const ThemeProvider = ({children}) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);
  const toggleTheme = async newTheme => {
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };
  const themeStyles = {
    light: {
      backgroundColor: '#fff',
      textColor: '#000',
      textColorBtn:'#fff',
      buttonColor:'#000',
    },
    dark: {
      // backgroundColor: '#333',
      backgroundColor: '#000',
      textColor: '#fff',
      textColorBtn:'#000',
      buttonColor:'#fff',
    },
  };
  const currentTheme = themeStyles[theme] || themeStyles.light;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, currentTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
