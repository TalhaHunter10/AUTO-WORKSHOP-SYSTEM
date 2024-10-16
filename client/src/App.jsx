import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/scrollToTop";
import UFooter from "./pages/uFooter";
import WMFooter from "./pages/wmFooter";
import LandingPage from "./pages/landingPage";
import UHeader from "./pages/uHeader";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import ForgotPassword from "./pages/forgotPassword";
import RecoverAccount from "./pages/recoverAccount";
import ConfirmEmail from "./pages/confirmEmail";
import PageNotFound from "./pages/pageNotFound";
import { useEffect, useRef, useState } from "react";
import TermsAndConditions from "./pages/termsAndConditions";
import PrivacyPolicy from "./pages/privacyPolicy";
import axios from "axios";
import UserProfile from "./pages/userProfile";
import ServicesDetails from "./pages/servicesDetails";
import Parts from "./pages/parts";
import BookAppointment from "./pages/bookAppointment";
import AppointmentHistory from "./pages/appointmentHistory";
import AllReviews from "./pages/allReview";
import { checkLoginStatus } from "./services/authService";
import WmLandingPage from "./pages/wmLandingPage";
import Chatbot from "./pages/chatbot";

axios.defaults.withCredentials = true;


function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);
  const servicesRef = useRef(null);

  const scrollToAboutUs = () => {
    if (aboutUsRef.current) {
      const offset = -150;
      const elementPosition = aboutUsRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToContactUs = () => {
    if (contactUsRef.current) {
      const offset = -150;
      const elementPosition = contactUsRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  const scrollToServices = () => {
    if (servicesRef.current) {
      const offset = -150;
      const elementPosition = servicesRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    LoginStatus();
  }, [navigate]);

  const LoginStatus = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        setUserType(res.data.user?.status);
      } else {
        setUserType("user");
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error(err);
    }
  };


  const renderLayout = () => {
    if (userType === "user") {
      return (
        <div className="bg-neutral-50">
          <div className="userheader">
            <UHeader onScrollToAboutUs={scrollToAboutUs} onScrollToContactUs={scrollToContactUs} onScrollToServices = {scrollToServices} />
          </div>
          <Routes>
            <Route path="/" element={<LandingPage aboutUsRef={aboutUsRef} servicesRef={servicesRef}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:email" element={<RecoverAccount />} />
            <Route path="/confirm-email/:email" element={<ConfirmEmail />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/services" element={<ServicesDetails />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/appointment" element={<BookAppointment />} />
            <Route path="/myappointments" element={<AppointmentHistory />} />
            <Route path="/reviews" element={<AllReviews />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="*" element={<PageNotFound />} />\
          </Routes>
          <div className="userfooter">
            <UFooter contactUsRef={contactUsRef} />
          </div>
        </div>
      );
    } else if (userType === "wm") {
      return (
        <div className="bg-neutral-50">
          <div className="min-h-[95vh]">
          <Routes>
          <Route path="/" element={<WmLandingPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </div>
          <div className="wmfooter">
            <WMFooter />
          </div>
        </div>
      );
    }
  };

  return <div className="content">
    <ScrollToTop />
      <ToastContainer
        limit={3}
        bodyClassName={"customtoastbody"}
        position="bottom-left"
      />
    {renderLayout()}
    </div>;
}

export default App;
