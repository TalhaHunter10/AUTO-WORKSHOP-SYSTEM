import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import UFooter from "./pages/uFooter";
import WMFooter from "./pages/wmFooter";
import LandingPage from "./pages/landingPage";
import UHeader from "./pages/uHeader";
import Login from "./pages/login";
import SignUp from "./pages/signUp";

const userType = "user";

const renderLayout = () => {
  if (userType === "user") {
    return (
      <div className="bg-neutral-50">
        <div className="userheader">
          <UHeader />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <div className="userfooter">
          <UFooter />
        </div>
      </div>
    );
  } else if (userType === "wm") {
    return (
      <div className="bg-neutral-50">
        <Routes></Routes>
        <div className="wmfooter">
          <WMFooter />
        </div>
      </div>
    );
  }
};

function App() {
  return <div className="content">{renderLayout()}</div>;
}

export default App;
