import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [user, setUser] = useState({});
  const [isPlaylistMenu, setIsPlaylistMenu] = useState(false);
  const [isAccountMenu, setIsAccountMenu] = useState(false);

  const noMenus = () => {
    if (isPlaylistMenu) {
      setIsPlaylistMenu(!isPlaylistMenu)
    }
    if (isAccountMenu) {
      setIsAccountMenu(!isAccountMenu)
    }
  }
  // const noMenuCont = (props, setProps) => {
  //   if (props) {
  //     setProps(!props);
  //     console.log(props)
  //   }
  // }

  return (
    <ThemeContext.Provider value={{ user, setUser, isPlaylistMenu, setIsPlaylistMenu, isAccountMenu, setIsAccountMenu, noMenus }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
