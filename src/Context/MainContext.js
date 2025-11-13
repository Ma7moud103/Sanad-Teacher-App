import axios from "axios";
import ourCites from "../cites.json";

import { createContext, useState } from "react";
import { toast } from "react-toastify";
import UseToggle from "../CustomHooks/UseToggle/UseToggle";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
export const MainContext = createContext();
export default function MainContextProvider(props) {
  const [t] = useTranslation();
  const URLBase = "https://18.132.37.18/api/v1/";
  const [selectedGover, setselectedGover] = useState(ourCites.data[0]);
  const [selectedCity, setselectedCity] = useState(ourCites.data[0].cities[16]);
  let Cookie = new Cookies();
  let userDetails = Cookie.get("userDetails");

  const [Role, setRole] = useState("");

  const [AddStudent, setAddStudent] = useState(false);
  function toggleAddStudent() {
    setAddStudent((AddStudent) => !AddStudent);
  }
  // The sidemenu button (burger button)
  const [toggleMenu, setToggleMenu] = UseToggle(false);

  const [direction, setDirection] = useState(() => {
    const cachedDirection = localStorage.getItem("direction");
    return cachedDirection ? cachedDirection : "rtl"; // Default direction
  });

  const toggleDirection = () => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr"; // Toggle direction
    localStorage.setItem("direction", newDirection); // Cache new direction
    setDirection(newDirection); // Update direction state
  };

  // Tabs in the Notifications Component
  const [activeTab, setActiveTab] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setDropdownVisible(false);
  };

  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddAssistant, setShowAddAssistant] = useState(false);

  const [alerts, setalerts] = useState({
    showAddAlert: false,
    showAddTask: false,
    showAddAssistant: false,
    showAddCenter: false,
    addCourse: false,
  });

  const [showSingleCoursePopupWindow, setSingleCoursePopupWindow] =
    useState(false);
  // Switch Single Course pop up window content
  const [switchOff, setSwitchOff] = useState(true);
  // Teacher Single Course pop up windows
  const [popupWindowContent, setPopupWindowContent] = useState(0);

  // Exit PopUp window
  const [exitModal, setExitModal] = useState(false);

  // Array for Testing
  const students = ["محمد خليفة", "محمود شوقى", "يوسف وهبه"];

  //registration
  const [step, setstep] = useState(0);
  const [loading, setloading] = useState(false);

  const [consentrains, setconsentrains] = useState(false);

  // User Data
  const [userData, setUserData] = useState(false);

  // the email address for forget password processing
  const [forgetPassEmail, setForgetPassEmail] = useState("");

  const getCities = async () => {
    let data = await axios.get(`${URLBase}/governorates`);
  };
  const [email, setemail] = useState("");
  const [parentData, setparentData] = useState([]);

  const [MainToken, setMainToken] = useState("");
  const [remember, setremember] = useState(false);
  const dir = localStorage.getItem("direction");
  function ErorrMessage(text, type) {
    toast[type](text, {
      position: dir === "rtl" ? "top-right" : "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

      theme: "colored",
      style: { position: "relative", zIndex: 10000, fontSize: "14px" },
    });
  }

  const [AuthLoading, setAuthLoading] = useState({
    login: false,
    verifyEmail: false,
    register: false,
    forget: false,
    reset: false,
  });

  const [Toggler, setToggler] = useState({
    addTopic: false,
    exit: false,
    topics: false,
    addAlert: false,
    addAssistant: false,
    addCenter: false,
    addCourse: false,
    autoQusetions: false,
    onlineQBank: false,
    addSession: false,
    deletQFromE: false,
    addTask: false,
    attendance: false,
    deletAssistant: false,
    offline: false,
    online: false,
    qbank: false,
    deletExam: false,
    addQuestionToCourse: false,
    adddGrade: false,
    addQ: false,
    changePass: false,
    deletQ: false,
    modifyQ: false,
    upload: false,
    assAssToCourse: false,
    qestion: false,
    deletTa: false,
    deletTopic: false,
    openAttendance: false,
    terms: false,
  });

  const [newAnswer, setNewAnswer] = useState("");

  const [deletedAssistant, setdeletedAssistant] = useState(null);

  const [complateData, setcomplateData] = useState(false);
  const [selectedQuestion, setselectedQuestion] = useState(null);
  const [sessionTopics, setsessionTopics] = useState([]);

  const classSvg = "w-5 h-5 sm:w-7 sm:h-7";
  const blue = "#023E8A";
  const gray = "#9CA3AF";

  const cashedActiveClass = parseInt(sessionStorage.getItem("activeClass"));
  const [ActiveClass, setActiveClass] = useState(() => {
    if (cashedActiveClass) {
      return cashedActiveClass;
    } else {
      return 1;
    }
  });

  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleNotifications, settoggleNotifications] = useState(false);

  function handleActiveClass(index) {
    setActiveClass(index);
    if (index == 2) {
      setToggleDropDown((open) => !open);
    } else {
      setToggleDropDown((open) => !open);
    }
  }

  const Types = [
    { name: t("homepage.free"), value: 0 },
    { name: t("homepage.attendance"), value: 1 },
    { name: t("homepage.payed"), value: 2 },
  ];

  const cachedSelectedType = JSON.parse(sessionStorage.getItem("accessLevel"));

  const [selectedType, setselectedType] = useState(() => {
    if (cachedSelectedType !== null) {
      return cachedSelectedType;
    } else {
      return Types[0];
    }
  }, [cachedSelectedType]);
  const [selectedLinkType, setselectedLinkType] = useState(Types[0]);
  const [session, setsession] = useState(null);
  const [handleAddedFile, sethandleAddedFile] = useState(false);

  const [titleAlert, settitleAlert] = useState("");
  const [contentAlert, setcontentAlert] = useState("");
  const [selectedCourseForAlerts, setselectedCourseForAlerts] = useState({});
  const [uploaded, setuploaded] = useState([]);
  const handleUserName = (item, num) => {
    const itemLength = item?.split(" ")?.length;
    if (itemLength > num) {
      return `${item?.split(" ")?.slice(0, num)?.join(" ")}...`;
    } else {
      return item;
    }
  };

  const [toggleUploadType, settoggleUploadType] = useState(false);
  const [profileImage, setprofileImage] = useState("");
  const [selectedStudent, setselectedStudent] = useState("");
  return (
    <MainContext.Provider
      value={{
        selectedStudent,
        setselectedStudent,
        toggleUploadType,
        settoggleUploadType,
        profileImage,
        setprofileImage,
        handleUserName,
        uploaded,
        setuploaded,
        selectedCourseForAlerts,
        selectedLinkType,
        setselectedLinkType,
        setselectedCourseForAlerts,
        titleAlert,
        settitleAlert,
        contentAlert,
        setcontentAlert,
        sethandleAddedFile,
        handleAddedFile,
        Types,
        session,
        setsession,
        selectedType,
        setselectedType,
        toggleDropDown,
        setToggleDropDown,
        toggleNotifications,
        settoggleNotifications,
        blue,
        gray,
        classSvg,
        cashedActiveClass,
        ActiveClass,
        setActiveClass,
        handleActiveClass,
        sessionTopics,
        setsessionTopics,
        newAnswer,
        selectedQuestion,
        setselectedQuestion,
        setNewAnswer,
        deletedAssistant,
        setdeletedAssistant,
        Toggler,
        setToggler,
        complateData,
        setcomplateData,
        alerts,
        setalerts,
        Role,
        setRole,
        ErorrMessage,

        remember,
        setremember,
        MainToken,
        setMainToken,
        loading,
        setloading,

        parentData,
        setparentData,
        email,
        setemail,
        getCities,
        consentrains,
        setconsentrains,
        step,
        setstep,
        students,
        AddStudent,
        toggleAddStudent,
        setAddStudent,
        toggleMenu,
        setToggleMenu,
        AuthLoading,
        setAuthLoading,
        activeTab,
        handleTabChange,
        setDropdownVisible,
        dropdownVisible,

        showAddTask,
        setShowAddTask,
        showAddAssistant,
        setShowAddAssistant,
        selectedGover,
        setselectedGover,
        selectedCity,
        setselectedCity,
        toggleDirection,
        showSingleCoursePopupWindow,
        setSingleCoursePopupWindow,
        popupWindowContent,
        setPopupWindowContent,
        switchOff,
        setSwitchOff,
        exitModal,
        setExitModal,
        URLBase,
        setUserData,
        setToggleMenu,
        userData,
        setForgetPassEmail,
        forgetPassEmail,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
