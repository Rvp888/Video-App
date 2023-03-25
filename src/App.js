
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
import SearchPage from './Components/SearchPage';


const navigationContext = createContext();

function App() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState([]);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [searchedChannels, setSearchedChannels] = useState([]);

  useEffect(() => {
    setInterval(() => {
      getDocs(database.videos).then((res) => {
        let dataArr = [...res.docs];
        dataArr = dataArr.map((ele) => {
          return { ...ele.data(), videoId: ele.id };
        });
        setVideos(dataArr);
      })
      getDocs(database.users).then((res) => {
        let dataarr = [...res.docs]
        dataarr = dataarr.map((ele) => {
          return { ...ele.data() };
        });
        setUsers(dataarr);
      });
    }, 1000);
  }, []);

  function changeLeftOpen(val) {
    setLeftOpen(val);
  }

  function searchFunction(text) {
    const filterVideos = videos.filter((ele) => ele.displayName.includes(text));
    setSearchedVideos(filterVideos);
    const filterUsers = users.filter((ele) => ele.displayName.includes(text));
    setSearchedChannels(filterUsers);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <navigationContext.Provider value={{ leftOpen, changeLeftOpen, user, setUser, videos, setVideos, searchFunction, searchedVideos }}>
          <Header />
          <div style={{ display: 'flex' }}>
            {
              leftOpen && <LeftNav />
            }
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/upload" element={<UploadVideo />}></Route>
              <Route path="/video/:id" element={<VideoDetail/>}></Route>
              <Route path="/search" element={<SearchPage/>}></Route>
            </Routes>
          </div>
        </navigationContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

export { navigationContext };
