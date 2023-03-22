
import { createContext, useState } from 'react';
import './App.css';
import Header from "./Components/Header";
import LeftNav from "./Components/LeftNav";
import Main from './Components/Main';
import "./Firebase";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadVideo from './Components/UploadVideo';

const navigationContext = createContext();

function App() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [user, setUser] = useState();

  function changeLeftOpen(val) {
    setLeftOpen(val);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <navigationContext.Provider value={{ leftOpen, changeLeftOpen, user, setUser }}>
          <Header />
          <div style={{ display: 'flex' }}>
            {
              leftOpen && <LeftNav />
            }
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/upload" element={<UploadVideo />}></Route>
            </Routes>
          </div>
        </navigationContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

export { navigationContext };
