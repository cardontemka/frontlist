import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Home, SignUp, Login, Playlist } from "./pages";
import { ThemeProvider } from "./providers/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <div>
            <section>
              <Routes>
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/playlist" element={<Playlist />} />
                  {/* <Route path="" element={< />} /> */}
                  {/* <Route path="" element={< />} /> */}
                </>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </section>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;