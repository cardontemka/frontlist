import { BrowserRouter as Router} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { SignUp, Login, Playlist, Header, Menu, Home, Artist } from "./pages";
import { ThemeProvider } from "./providers/ThemeContext";
import styles from './App.module.css'

function App() {
  return (
    <ThemeProvider>
      <div className={styles.App}>
        <Router>
          <Menu />
          <div className={styles.contain}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="*" element={<Home />} /> */}
            </Routes>
          </div>
          <Routes>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;