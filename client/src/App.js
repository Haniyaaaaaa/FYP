import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeAdmin from "./components/HomeAdmin/index";
import HomeFarmer from "./components/HomeFarmer/index";
import HomeNormalvictim from "./components/HomeNormalvictim/index";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import EditProfile from "./components/EditProfile";
import LandingPage from "./components/LandingPage";
import VideosFarming from "./components/VideosFarming/index";
import FAQ from "./components/FAQ/index";
import FloodProtectionGuide from "./components/FloodProtectionGuide/index";
import Catchment from "./components/FloodProtectionGuide/Catchment";
import ScrolltoTop from "./components/ScrolltoTop";
import Riparian from "./components/FloodProtectionGuide/Riparian";
import SoilManagement from "./components/FloodProtectionGuide/SoilManagement";
import Sediment from "./components/FloodProtectionGuide/Sediment";
import Hedge from "./components/FloodProtectionGuide/Hedge";
import CrossDrains from "./components/FloodProtectionGuide/CrossDrains";
import WetlandCreation from "./components/FloodProtectionGuide/WetlandCreation";
import BankRestore from "./components/FloodProtectionGuide/BankRestore";
import InstreamObstruct from "./components/FloodProtectionGuide/InstreamObstruct";
import LocationBasedPrediction from "./components/LocationBasedPrediction/index";
import ParameterBasedPrediction from "./components/ParameterBasedPrediction/index";
import ErrorScreen from "./components/ErrorScreen";
import Documentaries from "./components/Documentries";
import ModelVideos from "./components/3dModelVideos";
import ElearningCourses from "./components/ElearningCourses";
import ResearchPaper from "./components/ResearchPaper";
import Resources from "./components/Resources";
import Play from "./components/Quiz/play";
import QuizSummary from "./components/Quiz/QuizSummary";
import UserDetails from "./components/AdminPanel/UserDetails";
import ThreeDModels from "./components/3dModels";
import ModelView from "./components/3dModels/ModelView";
import PredictionReport from "./components/AdminPanel/PredictionReport";
import Feedback from "./components/Feedback/index";
import Complaint from "./components/Complaint/MakeComplaint";
import UserFeedback from "./components/AdminPanel/UserFeedback";
import UserComplaints from "./components/AdminPanel/UserComplaints";
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import ViewComplaint from "./components/Complaint/ViewComplaint";
import PreFloodChecklist from "./components/RecoveryAndRenewalAssist/PreFloodChecklist";
import PostFloodChecklist from "./components/RecoveryAndRenewalAssist/PostFloodChecklist";
import Edit3dModels from "./components/AdminPanel/Edit3dModel";
import EditModelVideos from "./components/AdminPanel/EditModelVideos";
import EditSqftCost from "./components/AdminPanel/EditSqftCost";
import FloodConnect from "./components/FloodConnect/homePage";
import ProfilePage from "./components/FloodConnect/profilePage";
import PostModeration from "./components/AdminPanel/PostModeration";

function App() {
  // const userToken = localStorage.getItem("token");

  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    // Event listener to update userToken when local storage changes
    const handleStorageChange = () => {
      setUserToken(localStorage.getItem("token"));
      setUserRole(localStorage.getItem("role"));
    };

    // Add event listener for custom storage event
    window.addEventListener("storageChange", handleStorageChange, false);

    // Clean up the event listener
    return () => {
      window.removeEventListener("storageChange", handleStorageChange, false);
    };
  }, []);

  return (
    <div className="App">
      <ScrolltoTop />

      <Routes>
        {/* if user is not loged in, display landing page of the website */}

        {!userToken && (
          <Route path="/home-farmer" exact element={<LandingPage />} />
        )}
        {!userToken && (
          <Route path="/home-admin" exact element={<LandingPage />} />
        )}
        {!userToken && (
          <Route path="/home-normalvictim" exact element={<LandingPage />} />
        )}
        {!userToken && <Route path="/" exact element={<LandingPage />} />}
        {!userToken && (
          <Route path="/farming-videos" exact element={<LandingPage />} />
        )}
        {!userToken && <Route path="/faqs" exact element={<LandingPage />} />}
        {!userToken && <Route path="/edit-profile" element={<LandingPage />} />}
        {!userToken && (
          <Route path="/flood-protection-guide" element={<LandingPage />} />
        )}
        {!userToken && (
          <Route
            path="/catchment-woodland-planting"
            element={<LandingPage />}
          />
        )}
        {!userToken && (
          <Route path="/riparian-planting" element={<LandingPage />} />
        )}
        {!userToken && (
          <Route path="/soil-management" element={<LandingPage />} />
        )}
        {!userToken && <Route path="/sediment" element={<LandingPage />} />}
        {!userToken && <Route path="/hedge" element={<LandingPage />} />}
        {!userToken && <Route path="/crossdrains" element={<LandingPage />} />}
        {!userToken && (
          <Route path="/wetland-creation" element={<LandingPage />} />
        )}
        {!userToken && (
          <Route path="/bank-restoration" element={<LandingPage />} />
        )}
        {!userToken && (
          <Route path="/instream-obstruction" element={<LandingPage />} />
        )}
        {!userToken && (
          <Route path="/location-based-prediction" element={<LandingPage />} />
        )}
        {!userToken && (
          <Route path="/parameter-based-prediction" element={<LandingPage />} />
        )}

        {/* if user exists(means he is logged in) only then show these pages */}

        {userToken && userRole === "farmer" && (
          <Route path="/" exact element={<HomeFarmer />} />
        )}
        {userToken && userRole === "power admin" && (
          <Route path="/" exact element={<HomeAdmin />} />
        )}

        {userToken && userRole === "normal victim" && (
          <Route path="/" exact element={<HomeNormalvictim />} />
        )}

        {/* {userToken && userRole === 'farmer' && <Route path="/home-farmer" exact element={<HomeFarmer />} />} */}

        {userToken && userRole === "farmer" ? (
          <Route path="/home-farmer" exact element={<HomeFarmer />} />
        ) : (
          <Route path="/home-farmer" exact element={<ErrorScreen />} />
        )}

        {userToken && userRole === "power admin" ? (
          <Route path="/home-admin" exact element={<HomeAdmin />} />
        ) : (
          <Route path="/home-admin" exact element={<ErrorScreen />} />
        )}

        {userToken && userRole === "normal victim" ? (
          <Route
            path="/home-normalvictim"
            exact
            element={<HomeNormalvictim />}
          />
        ) : (
          <Route path="/home-normalvictim" exact element={<ErrorScreen />} />
        )}
        {userToken && userRole === "normal victim" ? (
          <Route path="/home-flood-connect" exact element={<FloodConnect />} />
        ) : (
          <Route path="/home-normalvictim" exact element={<ErrorScreen />} />
        )}
        {userToken && (
          <Route path="/profile/:userId" element={<ProfilePage />} />
        )}
        {userToken && <Route path="/edit-profile" element={<EditProfile />} />}
        {userToken && <Route path="/3d-Models" element={<ThreeDModels />} />}
        <Route path="/detail/:id" element={<ModelView />} />

        {userToken && (
          <Route path="/farming-videos" element={<VideosFarming />} />
        )}
        {userToken && <Route path="/faqs" element={<FAQ />} />}
        {userToken && (
          <Route
            path="/flood-protection-guide"
            element={<FloodProtectionGuide />}
          />
        )}
        {userToken && (
          <Route path="/catchment-woodland-planting" element={<Catchment />} />
        )}
        {userToken && (
          <Route path="/riparian-planting" element={<Riparian />} />
        )}
        {userToken && (
          <Route path="/soil-management" element={<SoilManagement />} />
        )}
        {userToken && <Route path="/sediment" element={<Sediment />} />}
        {userToken && <Route path="/hedge" element={<Hedge />} />}
        {userToken && <Route path="/crossdrains" element={<CrossDrains />} />}
        {userToken && (
          <Route path="/wetland-creation" element={<WetlandCreation />} />
        )}
        {userToken && (
          <Route path="/bank-restoration" element={<BankRestore />} />
        )}
        {userToken && (
          <Route path="/instream-obstruction" element={<InstreamObstruct />} />
        )}
        {userToken && (
          <Route
            path="/location-based-prediction"
            element={<LocationBasedPrediction />}
          />
        )}
        {userToken && (
          <Route
            path="/parameter-based-prediction"
            element={<ParameterBasedPrediction />}
          />
        )}
        {userToken && <Route path="/user-details" element={<UserDetails />} />}

        {userToken && (
          <Route path="/documentaries" element={<Documentaries />} />
        )}
        {userToken && <Route path="/model-videos" element={<ModelVideos />} />}
        {userToken && (
          <Route path="/e-Learning-Courses" element={<ElearningCourses />} />
        )}
        {userToken && (
          <Route path="/research-papers" element={<ResearchPaper />} />
        )}
        {userToken && <Route path="/resources" element={<Resources />} />}
        {userToken && <Route path="/play-quiz" element={<Play />} />}
        {userToken && <Route path="/quiz-summary" element={<QuizSummary />} />}
        {userToken && (
          <Route path="/prediction-report" element={<PredictionReport />} />
        )}
        {userToken && <Route path="/feedback" element={<Feedback />} />}
        {userToken && (
          <Route path="/edit-3d-models" element={<Edit3dModels />} />
        )}
        {userToken && (
          <Route path="/edit-model-videos" element={<EditModelVideos />} />
        )}
        {userToken && (
          <Route path="/edit-sqft-cost" element={<EditSqftCost />} />
        )}
        {userToken && (
          <Route path="/post-report" element={<PostModeration />} />
        )}
        {userToken && (
          <Route path="/user-feedbacks" element={<UserFeedback />} />
        )}
        {userToken && <Route path="/complaint" element={<Complaint />} />}
        {userToken && (
          <Route path="/view-complaint" element={<ViewComplaint />} />
        )}
        {userToken && (
          <Route path="/user-complaints" element={<UserComplaints />} />
        )}
        {userToken && (
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        )}
        {userToken && (
          <Route path="/pre-flood-checklist" element={<PreFloodChecklist />} />
        )}
        {userToken && (
          <Route
            path="/post-flood-checklist"
            element={<PostFloodChecklist />}
          />
        )}

        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}

export default App;
