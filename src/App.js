import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import './App.css'
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import Show from "./components/Show";
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<Main baseUrl="https://www.episodate.com/api/most-popular?" showsData={[]} />}>
          </Route>
          <Route path="/show/:name" element={<Show />} />
          <Route path="/search/:query" element={<Main baseUrl="https://www.episodate.com/api/search?" search={true} showsData={[]} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
