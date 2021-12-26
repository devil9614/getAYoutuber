import ComingSoonPage from "./Pages/ComingSoonPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePageWithLogin from "./Pages/HomePageWithLogin";
import DashboardRoute from "./Routes/DashboardRoute";
import LoginRoute from "./Routes/LoginRoute";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<DashboardRoute><HomePageWithLogin/></DashboardRoute>} />
        <Route path = "/login" element = {<LoginRoute><Login/></LoginRoute>}/>
        <Route path = "/register" element = {<LoginRoute><Register/></LoginRoute>}/>
        <Route path = "/user/:userId" element = {<DashboardRoute><ProfilePage/></DashboardRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
