
import { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from "./Components/Header";
import LeftNav from "./Components/LeftNav";
import Main from './Components/Main';
import "./Firebase";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadVideo from './Components/UploadVideo';
import VideoDetail from './Components/VideoDetail';
import { getDocs } from 'firebase/firestore';
import { database } from './Firebase';


const navigationContext = createContext();

function App() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [user, setUser] = useState();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getDocs(database.videos).then((res) => {
      let dataArr = [...res.docs];        
      dataArr = dataArr.map((ele) => {
        return {...ele.data(), videoId: ele.id};
      });
      setVideos(dataArr);
    })
  }, []);

  function changeLeftOpen(val) {
    setLeftOpen(val);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <navigationContext.Provider value={{ leftOpen, changeLeftOpen, user, setUser, videos, setVideos }}>
          <Header />
          <div style={{ display: 'flex' }}>
            {
              leftOpen && <LeftNav />
            }
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/upload" element={<UploadVideo />}></Route>
              <Route path="/video/:id" element={<VideoDetail/>}></Route>
            </Routes>
          </div>
        </navigationContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

export { navigationContext };
