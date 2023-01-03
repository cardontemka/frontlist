import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [user, setUser] = useState('');

  return (
    <ThemeContext.Provider value={{ user, setUser }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
