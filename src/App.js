import ComingSoonPage from "./Pages/ComingSoonPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePageWithLogin from "./Pages/HomePageWithLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" exact element = {<HomePageWithLogin/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
