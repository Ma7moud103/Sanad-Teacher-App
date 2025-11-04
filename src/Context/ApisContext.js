import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition
} from "react";
import Cookies from "universal-cookie";
import { MainContext } from "./MainContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import { BASE_URL } from "../Soursre";
import { useErrorBoundary } from "react-error-boundary";

export const ApisContext = createContext();

export default function ApisContextProvider({ children }) {
  const BASUE__URL = "https://sanadedu.azurewebsites.net/api/v1/";
  // const selectedExam = JSON.parse(sessionStorage.getItem("selectedExam"));

  const tens = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { id, examId } = useParams();
  const [t] = useTranslation();
  const { showBoundary } = useErrorBoundary();

  const Day = (item) => {
    return moment(item).format("DD/MM/YYYY");
  };

  const Time = (item) => {
    return moment(item).format("h:mm a");
  };

  function isValidInput(formikErrors, toched) {
    if (formikErrors && toched) {
      return " text-err border-[1px] border-err";
    } else {
      return "text-mainColor border-[1px]  border-input_border";
    }
  }

  const {
    ErorrMessage,

    Toggler,
    setToggler,
    deletedAssistant
  } = useContext(MainContext);
  let cookie = new Cookies();
  let token = cookie.get("userToken");
  let userDetails = cookie.get("userDetails");
  const Role = parseInt(userDetails.role);
  let headers = { "auth-token": token };
  const [Courses, setCourses] = useState([]);
  const [grades, setgrades] = useState([]);
  const [TeacherCourses, setTeacherCourses] = useState([]);
  const [TeacherAsssistants, setTeacherAsssistants] = useState([]);
  const [AssistantTasks, setAssistantTasks] = useState([]);

  const [selectedGrade, setselectedGrade] = useState("");
  const [selectedGradeId, setselectedGradeId] = useState("");

  const [selectedAssistant, setselectedAssistant] = useState([]);
  //  this for sessions
  const [dataToPaginate, setdataToPaginate] = useState([]);

  const [AssistantCourses, setAssistantCourses] = useState([]);

  const [assistantforEachCourse, setassistantforEachCourse] = useState([]);

  const [center, setcenter] = useState([]);

  const [courseDetails, setcourseDetails] = useState([]);
  const [Topics, setTopics] = useState([]);

  const [Groups, setGroups] = useState([]);

  const [IsLoading, setIsLoading] = useState({
    courses: false,
    tasks: false,
    teacherAssistants: false,
    sessions: false,
    userDetails: false,
    courseDetails: false
  });
  const [deletedTaId, setdeletedTaId] = useState(null);
  const [handleDeletTa, sethandleDeletTa] = useState(false);

  // pjrKQO0xwe8Jb9RKO8twx
  const [selectedCourseId, setselectedCourseId] = useState([]);
  const [centerCode, setcenterCode] = useState("");
  const [conferm, setConferm] = useState(false);

  // const [getCenterCase, setgetCenterCase] = useState(false);
  const [centerLoading, setcenterLoading] = useState(false);
  const [centerDetails, setcenterDetails] = useState([]);
  async function getCenterByid(values, resetForm) {
    try {
      setcenterLoading(true);
      const res = await axios.post(
        `${BASUE__URL}course-requests/get-center`,
        values,
        { headers: headers }
      );

      if (res.data.status === "success" || res.status === 200) {
        ErorrMessage(t("Errors.centerloged"), "success");
        setcenterDetails(res.data.data);
        resetForm();
        setcenter(res.data.data);
        setConferm(true);
      }
    } catch (error) {
      if (error.response.data.status === "center not found") {
        ErorrMessage(t("Errors.noCenter"), "error");
      } else {
        ErorrMessage(t("Errors.main"), "error");
      }
    } finally {
      setcenterLoading(false);
    }
  }

  // const fetchCenter = useQuery({
  //   queryKey: ["fetchCenterid", `${centerCode}`],
  //   queryFn: () => getCenterByid(),
  //   enabled:  Role === 3 && !!getCenterCase,
  // });
  const [handleAddCenterRefetch, sethandleAddCenterRefetch] = useState(false);

  const [addCenterLoading, setaddCenterLoading] = useState(false);
  // addCenterLoading,AddCenter
  async function AddCenter(
    setcenterCode,
    setselectedCourse,
    setselectedCourseId
    // setToggler,
    // setConferm
  ) {
    try {
      setaddCenterLoading(true);

      const res = await axios.post(
        `${BASUE__URL}course-requests`,
        {
          centerId: centerDetails?._id,
          tutorCoursesId: selectedCourseId
        },
        {
          headers: headers
        }
      );

      if (
        res.data.status === "success" ||
        res.status === 200 ||
        res.status === 201
      ) {
        setConferm(false);
        ErorrMessage(t("Errors.sentRequest"), "success");
        setToggler({ ...Toggler, addCenter: false });

        setcenterCode("");
        setselectedCourse([]);
        setselectedCourseId([]);
        // setToggler({ ...Toggler, addCenter: false });
        // setConferm(false);
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.message === "request sent before") {
        ErorrMessage(t("Errors.errReq"), "error");
        setConferm(false);
      } else {
        ErorrMessage(t("Errors.main"), "error");
      }
    } finally {
      setaddCenterLoading(false);
    }
  }
  // console.log(selectedCourseId, fetchCenter.data?._id, handleAddCenter);
  // const addQueryCenter = useQuery({
  //   queryKey: ["addQueryCenter"],
  //   queryFn: () => AddCenter(),
  //   enabled:
  //     Role === 3 &&
  //     selectedCourseId.length > 0 &&
  //     !!handleAddCenter &&
  //     !!centerDetails,
  // });

  // const getCenters = async () => {
  //   try {
  //     const res = await axios.get(`${BASUE__URL}tutors/centers`, {
  //       headers: headers
  //     });
  //     if (res.status === 200 || res.data.status === "success") {
  //       return res.data.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     showBoundary(error);
  //   }
  // };

  // const fetchCenters = useQuery({
  //   queryKey: ["fetchCenters"],
  //   queryFn: () => getCenters(),
  //   enabled: !!headers["auth-token"] && Role === 3
  // });

  const getCourseById = async (id) => {
    try {
      const res = await axios.get(`${BASUE__URL}tutor-courses/${id}`, {
        headers: headers
      });
      setcourseDetails(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchCoure = useQuery({
    queryKey: ["fetchCourse", `${id}`],
    queryFn: () => getCourseById(id),
    enabled: !!headers["auth-token"] && !!id,
    refetchOnMount: true,
    refetchIntervalInBackground: true
  });

  const [topicLoading, settopicLoading] = useState(false);

  const getTopics = async (id) => {
    try {
      const res = await axios.get(`${BASUE__URL}tutor-courses/${id}/topics`, {
        headers: headers
      });
      setTopics(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };
  const [handleDeletTopic, sethandleDeletTopic] = useState(false);

  const fetchTopics = useQuery({
    queryKey: [
      "fetchTopics",
      `${id}`,
      `${topicLoading}`,
      `${handleDeletTopic}`
    ],
    queryFn: () => getTopics(id),
    enabled: !!headers["auth-token"] && !!id
  });

  // topics for selectedCourse
  const [selectedCourse, setselectedCourse] = useState(null);
  const [selectedTopicsExam, setselectedTopicsExam] = useState([]);

  const getTopicsForCourse = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}tutor-courses/${selectedCourse?._id}/topics`,
        { headers: headers }
      );
      if (res.data.status === "success" || res.status === 200) {
        // setselectedTopicsExam([]);
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchTopicsForCourse = useQuery({
    queryKey: [
      "fetchTopicsForCourse",
      `${selectedCourse?._id}`,
      `${topicLoading}`
    ],
    queryFn: () => getTopicsForCourse(),
    enabled: !!headers["auth-token"] && !!selectedCourse
  });

  const [handleAssToCourse, sethandleAssToCourse] = useState(false);

  const getAss = async () => {
    try {
      const res = await axios.get(
        `${BASUE__URL}tutor-courses/${id}/tutor-assistants/`,
        { headers: headers }
      );

      if (res.data.status === "success" || res.status === 200) {
        setassistantforEachCourse(res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const [deletLoading, setdeletLoading] = useState(false);

  const [isAssistantDeleted, setisAssistantDeleted] = useState(false);
  const fetchAssistants = useQuery({
    queryKey: [
      "getAssistants",
      `${id}`,
      `${isAssistantDeleted}`,
      `${handleDeletTa}`,
      `${handleAssToCourse}`
      // `${isAssistantDeleted}`,
    ],
    queryFn: () => getAss(),
    enabled: !!id && Role === 3,
    refetchOnMount: true
  });

  const deletAssistantfn = async (id) => {
    try {
      setdeletLoading(true);
      const res = await axios.patch(
        `${BASE_URL}tutor-courses/${id}/tutor-assistants/`,
        {
          tAs: [`${deletedAssistant}`]
        },
        { headers: headers }
      );

      if (res.status === "success" || res.data.status === "success") {
        // setToggler({...Toggler , })
        ErorrMessage(t("Errors.deletAss"), "success");
        setisAssistantDeleted((prev) => !prev);
        setToggler({
          ...Toggler,
          deletAssistant: false
        });
      }
    } catch (error) {
      console.log(error);
      ErorrMessage(t("Errors.main"), "error");
    } finally {
      setdeletLoading(false);
      // setisAssistantDeleted(false);
    }
  };

  const removeTa = async () => {
    if (deletedTaId) {
      try {
        setdeletLoading(true);
        const res = await axios.delete(
          `${BASE_URL}tutor-assistants/${deletedTaId}`,

          { headers: headers }
        );

        if (res.status === 204 || res.data.status === "success") {
          ErorrMessage(t("Errors.deletAss"), "success");
          sethandleDeletTa((prev) => !prev);
          setToggler({
            ...Toggler,
            deletTa: false
          });
        }
      } catch (error) {
        console.log(error);
        ErorrMessage(t("Errors.main"), "error");
      } finally {
        setdeletLoading(false);
        // setisAssistantDeleted(false);
      }
    }
  };

  async function getGrades() {
    if (token !== undefined) {
      return await axios
        .get(`${BASE_URL}grades/?fields=nameEn,-_id,nameAr`, {
          headers: headers
        })
        .then((response) => {
          if (response.status == 200 || response.data.status === "success") {
            setgrades(response.data.data);
            // setselectedAssistant([response.data.data[0], response.data.data[1]])
          }
        });
    }
  }

  const [coursesData, setcoursesData] = useState([
    {
      path: "/",
      role: 3,
      labels: [
        { en: "Course ", ar: t("homepage.courseName") },
        { en: "Students", ar: t("homepage.studentsNum") },
        { en: "Assistants", ar: t("homepage.assistantNum") },
        // { en: "Centers", ar: t("homepage.centersNum") },
        { en: "Exams", ar: t("homepage.examsName") }
      ]
    },

    {
      path: "/courses",
      role: 3,
      labels: [
        { en: "Course ", ar: t("homepage.courseName") },
        { en: "Term", ar: t("coursesTable.term") },
        { en: "Assistants", ar: t("homepage.assistantNum") },
        { en: "Sessions", ar: t("SingleCourse.sessionsNum") },
        { en: "Topics", ar: t("SingleCourse.topicsNum") }
        // { en: "Centers", ar: t("SingleCourse.centersNum") }
      ]
    },
    {
      path: "/",
      role: 4,
      labels: [
        { en: "Course ", ar: t("homepage.courseName") },
        { en: "Teacher", ar: t("coursesTable.teacherName") },
        { en: "Students", ar: t("homepage.studentsNum") }
        // { en: "Groups", ar: t("coursesTable.groupsNum") },
        // { en: "Centers", ar: t("SingleCourse.centersNum") }
      ]
    },

    {
      path: "/courses",
      role: 4,
      labels: [
        { en: "Course ", ar: t("homepage.courseName") },
        { en: "Teacher", ar: t("coursesTable.teacherName") },
        { en: "Sessions", ar: t("SingleCourse.sessionsNum") },
        { en: "Topics", ar: t("SingleCourse.topicsNum") }
        // { en: "Centers", ar: t("SingleCourse.centersNum") }
      ]
    }
  ]);
  const [handleAddCourse, sethandleAddCourse] = useState(false);
  const [selectedCourseAlerts, setselectedCourseAlerts] = useState({});
  const [allCoursesToFilterInExams, setallCoursesToFilterInExams] = useState(
    []
  );

  async function getTeacherCourses() {
    if (token !== undefined) {
      return await axios
        .get(`${BASUE__URL}tutor-courses?limit=-1`, { headers: headers })
        .then((res) => {
          if (res.status === 200 && res.data.status === "success") {
            setTeacherCourses(res.data.data);
            setallCoursesToFilterInExams([
              { name: t("task.all"), _id: "" },
              ...res.data.data
            ]);
            setfilteredCourse({ name: t("task.all"), _id: "" });
            return res.data.data;
          }
        })

        .catch((err) => {
          console.log(err);
          showBoundary(err);
        });
    }
  }

  const fetchTutorCourse = useQuery({
    queryKey: ["getTeacherCourses", `${handleAddCourse}`],
    queryFn: () => getTeacherCourses(),
    enabled: !!headers["auth-token"]
  });

  async function getAllTeacherAssistants() {
    try {
      const res = await axios.get(`${BASE_URL}tutor-assistants`, {
        headers: headers
      });

      if (res.status === 200 || res.data.status === "success") {
        setTeacherAsssistants(res?.data?.data);
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  }
  const [handleAssAssitant, sethandleAssAssitant] = useState(false);

  const fetcchallAssistants = useQuery({
    queryKey: [
      "fetchAllAssistants",
      `${handleAssAssitant}`,
      `${handleAssToCourse}`,
      `${isAssistantDeleted}`,
      `${handleDeletTa}`
    ],
    queryFn: () => getAllTeacherAssistants(),
    enabled: !!headers["auth-token"] && Role === 3
  });

  const [assLoading, setassLoading] = useState(false);
  async function AddAssistant(values, formik) {
    try {
      setassLoading(true);
      const res = await axios.post(`${BASE_URL}tutor-assistants`, values, {
        headers: headers
      });

      if (res.data.status === "success" || res.status === 200) {
        ErorrMessage(t("Errors.successAddAssistant"), "success");

        sethandleAssAssitant((prev) => !prev);
        formik.resetForm();
        formik.values.tutorKey = "";

        setToggler({ ...Toggler, addAssistant: false });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "tutor assistant already added") {
        ErorrMessage(t("Errors.reAddAssistant"), "error");
      } else if (error.response.data.message === "tutor assistant not found ") {
        ErorrMessage(t("Errors.notFoundAss"), "error");
      } else {
        ErorrMessage(t("Errors.main", "error"));
      }
    } finally {
      setassLoading(false);
    }
  }
  const [addCourseLoading, setaddCourseLoading] = useState(false);
  async function AddCourse(
    values,
    resetForm,
    setselectedCourse,
    setselectedGrade,
    setselectedSmester,
    setselectedAssistant
  ) {
    try {
      setaddCourseLoading(true);
      const res = await axios.post(`${BASUE__URL}tutor-courses`, values, {
        headers: headers
      });

      if (res.status === 200 || res.data.status === "success") {
        console.log(res);

        ErorrMessage(t("Errors.addCourse"), "success");
        sethandleAddCourse((prev) => !prev);
        setToggler({ ...Toggler, addCourse: false });
        resetForm();
        setselectedCourse("");
        setselectedGrade("");
        setselectedSmester("");
        setselectedAssistant([]);
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.message === "already created this course") {
        ErorrMessage(t("Errors.reAddCourse"), "error");
      } else {
        ErorrMessage(t("Errors.main"), "error");
      }
    } finally {
      setaddCourseLoading(false);
    }
  }

  const [handleAddSession, sethandleAddSession] = useState(false);
  const [handleAttendance, sethandleAttendance] = useState(false);

  const [searchBySesion, setsearchBySesion] = useState(null);

  const [SessionsToFitler, setSessionsToFitler] = useState(null);

  // get all sessions

  const [handleToggleContent, sethandleToggleContent] = useState(false);
  const getSessionsTeacher = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}tutor-courses/${id}/sessions?limit=-1`,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        setdataToPaginate(res?.data?.data);
        setSessionsToFitler([
          { name: t("task.all"), _id: "" },
          ...res.data.data?.reverse()
        ]);
        setsearchBySesion({ name: t("task.all"), _id: "" });
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchSessions = useQuery({
    queryKey: [
      "getSessionsTeacher",
      `${id}`,
      `${handleAddSession}`,
      `${handleAttendance}`,
      `${handleToggleContent}`
    ],
    queryFn: () => getSessionsTeacher(),
    enabled: !!id && !!token
  });

  // get spcific sessions

  // const getSpcificSessions = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}tutor-courses/${selectedCourse?._id}/sessions?limit=-1&type=session,revision`,
  //       { headers: headers }
  //     );

  //     if (res.status === 200 || res.data.status === "success") {
  //       return res.data.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     showBoundary(error);
  //   }
  // };

  // const fetchSpcificSessions = useQuery({
  //   queryKey: [
  //     "getSpcificSessions",
  //     `${selectedCourse?._id}`,
  //     `${handleAddSession}`
  //   ],
  //   queryFn: () => getSpcificSessions(),
  //   enabled: !!headers["auth-token"] && !!selectedCourse?._id
  // });

  const getAllSessionsForCourse = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}tutor-courses/${selectedCourse?._id}/sessions?limit=-1&type=session,revision,offlineExam`,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchgetAllSessionsForCourse = useQuery({
    queryKey: [
      "getAllSessionsForCourse",
      `${selectedCourse?._id}`,
      `${handleAddSession}`
    ],
    queryFn: () => getAllSessionsForCourse(),
    enabled: !!headers["auth-token"] && !!selectedCourse?._id
  });

  const [selectedExam, setselectedExam] = useState(null);
  const cachedExam = JSON.parse(sessionStorage.getItem("selectedExam"));
  const tutorCourse = selectedExam?.tutorCourse || cachedExam?.tutorCourse;
  const examType = selectedExam?.type || cachedExam?.type;
  const selectedExamId = selectedExam?._id || cachedExam?._id;

  const getSpcificSessionsForSingleExam = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}tutor-courses/${tutorCourse}/sessions?limit=-1&type=session,revision,offlineExam`,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchSpcificSessionsForSingleExam = useQuery({
    queryKey: ["getSpcificSessions", `${tutorCourse}`, `${handleAddSession}`],
    queryFn: () => getSpcificSessionsForSingleExam(),
    enabled: !!headers["auth-token"] && !!tutorCourse
  });

  const getSpcificSessionsToCourse = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}tutor-courses/${id}/sessions?limit=-1&type=session,revision,offlineExam`,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        // setsearchBySesion(res.data?.data[0]);

        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchSpcificSessionsToCourse = useQuery({
    queryKey: ["getSpcificSessions", `${id}`, `${handleAddSession}`],
    queryFn: () => getSpcificSessionsToCourse(),
    enabled: !!headers["auth-token"] && !!id
  });

  const getOfflineExamSessions = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}tutor-courses/${selectedCourse?._id}/sessions?limit=-1&type=offlineExam`,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchOfflineExamSessions = useQuery({
    queryKey: [
      "getOfflineExamSessions",
      `${selectedCourse?._id}`,
      `${handleAddSession}`
    ],
    queryFn: () => getOfflineExamSessions(),
    enabled: !!headers["auth-token"] && !!selectedCourse?._id
  });

  const [loadingAddAss, setloadingAddAss] = useState(false);
  async function AddAssistantToCourse(valuse, courseId) {
    if (courseId) {
      try {
        setloadingAddAss(true);
        const res = await axios.post(
          `${BASE_URL}tutor-courses/${courseId}/tutor-assistants/`,
          valuse,
          { headers: headers }
        );

        if (res.data.status === "success" || res.status === 200) {
          ErorrMessage(t("Errors.successAddAssistant"), "success");
          sethandleAssToCourse((prev) => !prev);
          setToggler({ ...Toggler, assAssToCourse: false });
        }
      } catch (error) {
        console.log(error);
        ErorrMessage(t("Errors.main"), "error");
      } finally {
        setloadingAddAss(false);
        setselectedAssistant([]);
      }
    } else {
      return;
    }
  }

  const getGroups = async () => {
    try {
      const res = await axios.get(`${BASE_URL}tutors/groups/?limit=-1`, {
        headers: headers
      });

      if (res.data.status === "success" || res.status === 200) {
        setGroups(res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);

      return [];
    }
  };

  const fetchGroups = useQuery({
    queryKey: ["getGroups"],
    queryFn: () => getGroups(),
    enabled: !!headers["auth-token"] && Role === 3
  });

  const [CoursesGrades, setCoursesGrades] = useState([]);

  let GetCoursesGrades = async () => {
    if (selectedGrade != "") {
      try {
        const res = await axios.get(
          `https://sanadedu.azurewebsites.net/api/v1/grades/${selectedGrade?._id}/courses`,
          { headers: headers }
        );
        if (res.status === 200 || res.data.status === "success") {
          setCoursesGrades(res.data.data);
          // setselectedCourse(res.data.data[0].name)
          // setselectedCourseId(res.data.data[0]._id)
          return res.data.data;
        }
      } catch (error) {
        showBoundary(error);
      }
    }
  };

  const fetchCoursesGrades = useQuery({
    queryKey: ["fetchCoursesGrades", `${selectedGrade?._id}`],
    queryFn: () => GetCoursesGrades(),
    enabled: !!headers["auth-token"] && !!selectedGrade
  });
  const [selectedSession, setselectedSession] = useState(null);

  // const getCourseGroups = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}tutor-courses/${id}/groups?limit=-1`,
  //       {
  //         headers: headers
  //       }
  //     );

  //     if (res.status === 200 || res.data.status === "success") {
  //       return res.data.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     showBoundary(error);
  //   }
  // };

  // const fetchCourseGroups = useQuery({
  //   queryKey: ["fetchCourseGroups", `${id}`],
  //   queryFn: () => getCourseGroups(),
  //   enabled: !!headers["auth-token"] && !!id && Role === 3
  // });

  const options = [
    { name: t("exam.yes"), value: true },
    { name: t("exam.no"), value: false }
  ];
  const [selectedAnsType, setselectedAnsType] = useState(options[1]);
  const [questionsCoursePage, setquestionsCoursePage] = useState(1);
  const [handleAddQToCourse, sethandleAddQToCourse] = useState(false);
  const [addQLoad, setaddQLoad] = useState(false);

  // add question to questions bank
  const addQuetionToCourse = async (
    values,
    resetForm,
    setselectedTopics,
    setselectedSession,
    setAnswers
  ) => {
    try {
      setaddQLoad(true);
      const res = await axios.post(
        `${BASE_URL}tutor-courses/${id}/questions`,
        values,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        console.log(res);
        ErorrMessage(t("Errors.addQToCourse"), "success");
        sethandleAddQToCourse((prev) => !prev);
        setToggler((prev) => {
          return { ...prev, addQuestionToCourse: false };
        });
        setselectedTopics([]);
        setselectedSession("");
        setAnswers([]);
        resetForm();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setaddQLoad(false);
    }
  };

  const [deletedQCourse, setdeletedQCourse] = useState(null);
  const [deletedQCourseLoading, setdeletedQCourseLoading] = useState(false);
  const [handleDeletQCourse, sethandleDeletQCourse] = useState(false);

  // delet Question from Questions bank
  const deletQCourse = async (deletedQCourse) => {
    if (deletedQCourse && id) {
      try {
        setdeletedQCourseLoading(true);
        const res = await axios.delete(
          // /tutor-courses/:tutorCourse/questions/:questionId
          `${BASE_URL}tutor-courses/${id}/questions/${deletedQCourse}`,

          { headers: headers }
        );

        if (res.status === 200 || res.data.status === "success") {
          console.log(res);
          sethandleDeletQCourse((prev) => !prev);
          ErorrMessage(t("Errors.deletQCourse"), "success");
          setquestionsCoursePage(1);
          setToggler((prev) => {
            return { ...prev, deletQ: false };
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setdeletedQCourseLoading(false);
      }
    } else {
      return;
    }
  };
  const perioreties = [
    { name: t("exam.easy"), value: "L" },
    { name: t("exam.hard"), value: "H" },
    { name: t("exam.normal"), value: "M" },
    { name: t("task.all"), allV: "" }
  ];
  const [examQCurrentPage, setexamQCurrentPage] = useState(1);
  const [handleAddQToExam, sethandleAddQToExam] = useState(false);
  const [selectedExamInExams, setselectedExamInExams] = useState(null);
  const [handleDeletQExam, sethandleDeletQExam] = useState(false);
  const [addQToExamLoading, setaddQToExamLoading] = useState(false);
  const [deletQFromExamLoading, setdeletQFromExamLoading] = useState(false);
  const [periorety, setperiorety] = useState(perioreties[3]);
  const [examsCoursePage, setexamsCoursePage] = useState(1);
  const [filteredSession, setfilteredSession] = useState(null);
  const [addExamLoading, setaddExamLoading] = useState(false);
  const [handleAddExam, sethandleAddExam] = useState(false);
  const [deletExam, setdeletExam] = useState(false);
  const [deletedQExam, setdeletedQExam] = useState(null);
  const [handleAddExamBank, sethandleAddExamBank] = useState(false);

  // delet question from single exam
  const deletQFromExam = async () => {
    // selectedExam?.tutorCourse
    if (deletedQExam && selectedExamId) {
      try {
        setdeletQFromExamLoading(true);
        const res = await axios.patch(
          // /tutor-courses/:tutorCourse/questions/:questionId
          `${BASE_URL}tutor-courses/${tutorCourse}/exams/${selectedExamId}/questions`,
          { questionId: deletedQExam },
          { headers: headers }
        );

        if (res.status === 200 || res.data.status === "success") {
          console.log("QExamDelets", res);
          sethandleDeletQExam((prev) => !prev);
          ErorrMessage(t("Errors.deletQCourse"), "success");
          setexamsCoursePage(1);
          setToggler((prev) => {
            return { ...prev, deletQFromE: false };
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setdeletQFromExamLoading(false);
      }
    } else {
      return;
    }
  };
  // add exam from singleCourse to exams
  const addExamAsTa = async (
    values,
    resetForm,
    setselectedSessions,
    setselectedTopicsExam,
    setselectedCourse,
    setstartTime,
    setendTime,
    currentDay
  ) => {
    try {
      setaddExamLoading(true);
      // /tutor-courses/{tutorCourseId}/exams
      const res = await axios.post(
        `${BASUE__URL}tutor-courses/${id}/exams`,
        values,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        resetForm();
        setselectedSessions([]);
        setselectedTopicsExam([]);
        setselectedCourse("");
        setstartTime(currentDay);
        setendTime(currentDay);
        sethandleAddExam((prev) => !prev);
        ErorrMessage(t("Errors.addExamSuccess"), "success");
        setToggler({ ...Toggler, online: false });
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    } finally {
      setaddExamLoading(false);
    }
  };
  // addOffline exam from single course to exams
  const addExamOfflineAsTa = async (
    values,
    resetForm,
    setselectedSessions,
    setselectedTopicsExam,
    setselectedCourse,
    setstartTime,
    setendTime,
    currentDay,
    setselectedOfflineSession,
    settotalQuestions
  ) => {
    try {
      setaddExamLoading(true);
      // /tutor-courses/{tutorCourseId}/exams
      const res = await axios.post(
        `${BASUE__URL}tutor-courses/${id}/exams`,
        values,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        resetForm();
        setselectedSessions([]);
        setselectedTopicsExam([]);
        setselectedCourse("");
        setstartTime(currentDay);
        setendTime(currentDay);
        setselectedOfflineSession("");
        settotalQuestions(0);

        sethandleAddExam((prev) => !prev);
        ErorrMessage(t("Errors.addExamSuccessOffline"), "success");
        setToggler({ ...Toggler, online: false });
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    } finally {
      setaddExamLoading(false);
    }
  };

  // getExams in singleCourse
  const getTutorExamsCourse = async () => {
    try {
      // /tutor-courses/{tutorCourseId}/exams
      const res = await axios.get(
        `${BASE_URL}tutor-courses/${id}/exams?limit=5&page=${examsCoursePage}&sort=createdAt`,
        { headers: headers }
      );
      if (res.data.status === "success" || res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };
  const fetchAllExamsCourse = useQuery({
    queryKey: [
      "getTutorExams",
      `${examsCoursePage}`,
      `${id}`,
      `${filteredSession?._id}`,
      `${handleAddExam}`,
      `${handleDeletQExam}`,
      `${handleAddQToExam}`,
      `${deletExam}`,
      `${handleAddExamBank}`
    ],
    queryFn: () => getTutorExamsCourse(),
    enabled: !!headers["auth-token"] && !!examsCoursePage && !!id && Role === 4
  });

  // add Question to singleExam in exams paeg
  const addQuetionToExam = async (
    values,
    resetForm,
    setselectedTopics,
    setselectedSession,
    setAnswers
  ) => {
    try {
      setaddQToExamLoading(true);
      const res = await axios.post(
        // /tutor-courses/{tutorCourseId}/exams/{examId}/questions
        `${BASE_URL}tutor-courses/${tutorCourse}/exams/${examId}/questions`,
        values,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        console.log(res);
        ErorrMessage(t("Errors.addToExam"), "success");
        sethandleAddQToExam((prev) => !prev);
        setToggler((prev) => {
          return { ...prev, addQ: false };
        });
        resetForm();
        setselectedTopics([]);
        setselectedSession("");
        setAnswers([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setaddQToExamLoading(false);
    }
  };

  // get questions in the exams page and the exams in singl course
  const getQuestionsForExam = async () => {
    try {
      // /tutor-courses/{tutorCourseId}/exams/{examId}

      const perioretyParam = periorety?.value
        ? `&priority=${periorety?.value}`
        : "";
      console.log(perioretyParam, tutorCourse);

      const res = await axios.get(
        `${BASE_URL}tutor-courses/${tutorCourse}/exams/${examId}/questions?limit=6&page=${examQCurrentPage}${perioretyParam}`,
        { headers: headers }
      );
      console.log(res);
      if (res.data.status === "success" || res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchExamQuestions = useQuery({
    queryKey: [
      "fetchExamQuestions",
      `${examQCurrentPage}`,
      `${tutorCourse}`,
      `${handleAddQToExam}`,
      `${examId}`,
      `${periorety?.value}`,
      `${handleDeletQExam}`
      // `${handleAddQToCourse}`,
      // `${handleAddQToExam}`,
    ],
    queryFn: () => getQuestionsForExam(),
    enabled:
      !!headers["auth-token"] &&
      !!tutorCourse &&
      !!examId &&
      examType === "online",
    placeholderData: true,
    keepPreviousData: true,
    staleTime: 5000
  });

  // get questions of queston bank

  const getQuestionsForCoruse = async () => {
    try {
      const sessionParam = searchBySesion?._id
        ? `&session=${searchBySesion?._id}`
        : "";

      const res = await axios.get(
        `${BASE_URL}tutor-courses/${id}/questions?limit=6&page=${questionsCoursePage}${sessionParam}`,
        { headers: headers }
      );
      if (res.data.status === "success" || res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchCourseQuestions = useQuery({
    queryKey: [
      "getQuerstoinsForCourse",
      `${questionsCoursePage}`,
      `${handleAddQToCourse}`,
      `${id}`,
      `${searchBySesion?._id}`,
      `${handleDeletQCourse}`,
      `${handleAddQToExam}`
    ],
    queryFn: () => getQuestionsForCoruse(),
    enabled: !!headers["auth-token"] && !!id,
    placeholderData: true,
    keepPreviousData: true,
    staleTime: 5000
  });

  // add exam to exams in exams page
  const addExam = async (
    values,
    resetForm,
    setselectedSessions,
    setselectedTopicsExam,
    setselectedCourse,
    setstartTime,
    setendTime,
    currentDay
  ) => {
    try {
      setaddExamLoading(true);
      // /tutor-courses/{tutorCourseId}/exams
      const res = await axios.post(
        `${BASUE__URL}tutor-courses/${selectedCourse?._id}/exams`,
        values,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        resetForm();
        setselectedSessions([]);
        setselectedTopicsExam([]);
        setselectedCourse("");
        setstartTime(currentDay);
        setendTime(currentDay);
        sethandleAddExam((prev) => !prev);
        ErorrMessage(t("Errors.addExamSuccess"), "success");
        setToggler({ ...Toggler, online: false });
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    } finally {
      setaddExamLoading(false);
    }
  };

  // add offline exam to the exams page
  const addExamOffline = async (
    values,
    resetForm,
    setselectedSessions,
    setselectedTopicsExam,
    setselectedCourse,
    setstartTime,
    setendTime,
    currentDay,
    setselectedOfflineSession,
    settotalQuestions
  ) => {
    try {
      setaddExamLoading(true);
      // /tutor-courses/{tutorCourseId}/exams
      const res = await axios.post(
        `${BASUE__URL}tutor-courses/${selectedCourse?._id}/exams`,
        values,
        { headers: headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        resetForm();
        setselectedSessions([]);
        setselectedTopicsExam([]);
        setselectedCourse("");
        setstartTime(currentDay);
        setendTime(currentDay);
        setselectedOfflineSession("");
        settotalQuestions(0);
        sethandleAddExam((prev) => !prev);
        ErorrMessage(t("Errors.addExamSuccessOffline"), "success");
        setToggler({ ...Toggler, online: false });
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    } finally {
      setaddExamLoading(false);
    }
  };

  const [examsPage, setexamsPage] = useState(1);
  const [filteredCourse, setfilteredCourse] = useState(null);

  // get all exams in the exams page
  const getTutorExams = async () => {
    try {
      const qureyFilter =
        filteredCourse && `&tutorCourseId=${filteredCourse?._id}`;

      const res = await axios.get(
        `${BASE_URL}exams?limit=5&page=${examsPage}${qureyFilter}&sort=-createdAt`,
        { headers: headers }
      );
      if (res.data.status === "success" || res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchAllExams = useQuery({
    queryKey: [
      "getTutorExams",
      `${examsPage}`,
      `${filteredCourse?._id}`,
      `${handleAddExam}`,
      `${handleDeletQExam}`,
      `${handleAddQToExam}`,
      `${deletExam}`,
      `${handleAddExamBank}`
    ],
    queryFn: () => getTutorExams(),
    enabled: !!headers["auth-token"] && !!examsPage && Role === 3
  });

  const [handleDeletLoading, sethandleDeletLoading] = useState(false);

  // delet Exam
  const deletExamAction = async () => {
    if (tutorCourse && selectedExamId) {
      try {
        sethandleDeletLoading(true);
        const res = await axios.delete(
          `${BASE_URL}tutor-courses/${tutorCourse}/exams/${selectedExamId}`,
          { headers: headers }
        );

        if (res.status === 200 || res.data.status === "success") {
          console.log(res);
          setdeletExam((prev) => !prev);
          ErorrMessage(t("Errors.deletExam"), "success");
          setToggler({ ...Toggler, deletExam: false });
          sessionStorage.removeItem("selectedExam");
          setexamsPage(1);
        }
      } catch (error) {
        console.log(error);
        ErorrMessage(t("Errors.main"), "error");
      } finally {
        sethandleDeletLoading(false);
      }
    }
  };

  // const getSpcificSessionsForExam = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}tutor-courses/${tutorCourse}/sessions?limit=-1&type=session,revision,offlineExam`,
  //       { headers: headers }
  //     );

  //     if (res.status === 200 || res.data.status === "success") {
  //       return res.data.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     showBoundary(error);
  //   }
  // };

  // const fetchSpcificSessionsForExam = useQuery({
  //   queryKey: ["getSpcificSessions", `${tutorCourse}`],
  //   queryFn: () => getSpcificSessionsForExam(),
  //   enabled: Role === 3 && !!headers["auth-token"] && !!tutorCourse
  // });

  const getTopicsForExam = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}tutor-courses/${tutorCourse}/topics`,
        { headers: headers }
      );
      // setTopics(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  };

  const fetchTopicsForExam = useQuery({
    queryKey: ["fetchTopicsForExam", `${tutorCourse}`, `${topicLoading}`],
    queryFn: () => getTopicsForExam(),
    enabled: !!headers["auth-token"] && !!tutorCourse
  });

  // auto generate exam
  const [maxQ, setmaxQ] = useState({
    H: "",
    M: "",
    L: ""
  });

  const handleMessage = (message) => {
    console.log(message);
    const hMatch = message.match(/(\d+) for H questions/);
    const mMatch = message.match(/(\d+) for M questions/);
    const lMatch = message.match(/(\d+) for L questions/);

    const hCount = hMatch ? hMatch[1] : "";
    const mCount = mMatch ? mMatch[1] : "";
    const lCount = lMatch ? lMatch[1] : "";

    setmaxQ({
      H: hCount,
      M: mCount,
      L: lCount
    });
  };
  const [qGenerated, setqGenerated] = useState([]);
  const [autoGELoading, setautoGELoading] = useState(false);
  const autoGenerateExam = async (values, reset, settopics, setsessions) => {
    if (id) {
      try {
        setautoGELoading(true);
        const res = await axios.post(
          `${BASE_URL}exams/tutor-courses/${id}/auto`,
          values,
          { headers: headers }
        );

        if (res.status === 200 || res.data.status === "success") {
          setqGenerated(res.data.message);
          ErorrMessage(t("Errors.autoGExam"), "success");
          reset();
          settopics([]);
          setsessions([]);

          setToggler({
            ...Toggler,
            autoQusetions: true,
            qbank: false
          });
        }
      } catch (error) {
        console.log(error);
        handleMessage(error?.response?.data?.message);
        ErorrMessage(t("Errors.autoGExamError"), "error");
      } finally {
        setautoGELoading(false);
      }
    }
  };

  const [addOnlineELoading, setaddOnlineELoading] = useState(false);
  const addOnlineAutoGeneratedExam = async (
    values,
    resetForm,
    setstartTime,
    setendTime,
    currentDay
  ) => {
    try {
      setaddOnlineELoading(true);
      const res = await axios.post(
        `${BASE_URL}tutor-courses/${id}/exams`,
        values,
        { headers, headers }
      );

      if (res.status === 200 || res.data.status === "success") {
        ErorrMessage(t("Errors.handleAONAuto"), "success");
        console.log(res);
        setToggler({ ...Toggler, onlineQBank: false });
        sethandleAddExamBank((prev) => !prev);
        resetForm();
        setstartTime(currentDay);
        setendTime(currentDay);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setaddOnlineELoading(false);
    }
  };

  // get students in single exam

  const [studentsCurrentPage, setstudentsCurrentPage] = useState(1);

  const [selectedStduent, setselectedStduent] = useState(null);
  const [addGradeLoading, setaddGradeLoading] = useState(false);
  const [handleAddGrade, sethandleAddGrade] = useState(false);

  const addGrade = async (values, reset) => {
    if (tutorCourse && selectedExamId) {
      try {
        setaddGradeLoading(true);
        // /tutor-courses/{tutorCourseId}/exams/{examId}/students
        const res = await axios.patch(
          `${BASUE__URL}/tutor-courses/${tutorCourse}/exams/${selectedExamId}/students`,
          values,
          { headers: headers }
        );

        if (res.status === 200 || res.data.status === "success") {
          console.log(res);

          setToggler({ ...Toggler, adddGrade: false });
          ErorrMessage(t("Errors.addGrade"), "success");
          sethandleAddGrade((prev) => !prev);
          reset();
        }
      } catch (error) {
        console.log(error);
        // noCardFound

        if (error.response.data.message === "No card found") {
          ErorrMessage(t("Errors.noCardFound"), "error");
        }
      } finally {
        setaddGradeLoading(false);
      }
    }
  };

  const getStudents = async () => {
    if (tutorCourse && selectedExamId) {
      try {
        const res = await axios.get(
          `${BASE_URL}tutor-courses/${tutorCourse}/exams/${selectedExamId}/students`,
          { headers: headers }
        );

        if (res.status === 200 || res.data.status === "success") {
          // console.log("studentsOfExam", res.data.data);
          return res.data;
        }
      } catch (error) {
        console.log(error);
        showBoundary(error);
      }
    }
  };

  const fetchStudents = useQuery({
    queryKey: [
      "getStudentsForSingleExam",
      `${selectedExamId}`,
      `${studentsCurrentPage}`,
      `${handleAddGrade}`,
      `${tutorCourse}`
    ],
    queryFn: () => getStudents(),
    enabled: !!headers["auth-token"] && !!tutorCourse && !!selectedExamId,
    placeholderData: true,
    keepPreviousData: true
  });

  const [requestPage, setrequestPage] = useState(1);
  const mainTypes = [
    { name: t("homepage.pending"), status: "pending" },
    { name: t("homepage.accepted"), status: "accepted" },
    { name: t("homepage.rejected"), status: "rejected" }
  ];

  // const [selectedTypeN, setselectedTypeN] = useState(mainTypes[0]);
  // const getNotifications = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}course-requests?limit=5&page=${requestPage}&status=${selectedTypeN.status}`,
  //       { headers: headers }
  //     );
  //     if (res.status === 200 || res.data.status === "success") {
  //       return res.data;
  //     }
  //     // console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //     showBoundary(error);
  //   }
  // };

  // // let { status } = selectedTypeN;

  // const fetchNotifications = useQuery({
  //   queryKey: [
  //     "getNotifications",
  //     // `${status}`,
  //     `${requestPage}`,
  //     `${selectedTypeN.status}`,
  //     `${handleAddCourse}`,
  //     `${handleAddCenterRefetch}`
  //   ],

  //   queryFn: () => getNotifications(),
  //   enabled: !!headers["auth-token"] && Role === 3,
  //   placeholderData: true,
  //   keepPreviousData: true
  // });

  useEffect(() => {
    if (userDetails !== undefined && Role === 3) {
      getGrades();
    }
  }, []);

  const RoleMent = new Cookies().get("userDetails").role;

  async function getTutorKeyForTa() {
    try {
      const res = await axios.get(`${BASE_URL}tutors/details`, {
        headers: headers
      });

      return res.data.data;
    } catch (error) {
      showBoundary(error);
    }
  }

  const fetchTutorKeyForTa = useQuery({
    queryKey: ["getTutorKeyForTa", `${handleAssAssitant}`, `${handleDeletTa}`],
    queryFn: () => getTutorKeyForTa(),
    enabled: !!headers["auth-token"],
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: "always"
  });

  // console.log(fetchTutorKeyForTa.data);

  const [topicId, settopicId] = useState(null);
  const deletTopic = async (id, setLoading) => {
    console.log(topicId, id);
    try {
      setLoading(true);
      const res = await axios.delete(
        `${BASUE__URL}tutor-courses/${id}/topics/${topicId}`,
        { headers: headers }
      );

      if (res.status === 200) {
        ErorrMessage(t("Errors.deletedTopic"), "success");
        sethandleDeletTopic((prev) => !prev);
        setToggler({ ...Toggler, deletTopic: false });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApisContext.Provider
      value={{
        fetchgetAllSessionsForCourse,
        sethandleAttendance,
        settopicId,
        deletTopic,
        // fetchCenters,
        sethandleToggleContent,
        removeTa,
        SessionsToFitler,
        handleDeletTa,
        allCoursesToFilterInExams,
        sethandleDeletTa,
        setdeletedTaId,
        fetchTutorKeyForTa,
        selectedCourseAlerts,
        setselectedCourseAlerts,
        // fetchNotifications,
        requestPage,
        setrequestPage,
        // selectedTypeN,
        mainTypes,
        // setselectedTypeN,
        addGrade,
        selectedStduent,
        addGradeLoading,
        setselectedStduent,
        fetchStudents,
        studentsCurrentPage,
        setstudentsCurrentPage,
        setqGenerated,
        addOnlineELoading,
        addOnlineAutoGeneratedExam,
        qGenerated,
        maxQ,
        autoGenerateExam,
        autoGELoading,
        deletQFromExam,
        fetchSpcificSessionsForSingleExam,
        deletedQExam,
        setdeletedQExam,
        selectedExam,
        deletQFromExamLoading,
        examsCoursePage,
        setexamsCoursePage,
        fetchAllExamsCourse,
        filteredSession,
        centerLoading,
        setfilteredSession,
        setperiorety,
        addExamAsTa,
        addExamOfflineAsTa,
        examQCurrentPage,
        setexamQCurrentPage,
        perioreties,
        periorety,
        fetchTopicsForExam,
        fetchSpcificSessionsToCourse,
        addQToExamLoading,
        // fetchSpcificSessionsForExam,
        addQuetionToExam,
        fetchExamQuestions,
        setselectedExamInExams,
        selectedExamInExams,
        deletExamAction,
        handleDeletLoading,
        selectedExam,
        addCenterLoading,
        AddCenter,
        setselectedExam,
        fetchAllExams,
        examsPage,
        setexamsPage,
        filteredCourse,
        setfilteredCourse,
        addExamOffline,
        fetchOfflineExamSessions,
        addExam,
        sethandleAddExam,
        addExamLoading,
        // fetchSpcificSessions,
        selectedTopicsExam,
        setselectedTopicsExam,
        searchBySesion,
        fetchTopicsForCourse,
        selectedCourse,
        setselectedCourse,
        deletedQCourse,
        deletQCourse,
        setdeletedQCourse,
        setsearchBySesion,
        deletedQCourseLoading,
        questionsCoursePage,
        setquestionsCoursePage,
        addQuetionToCourse,
        addQLoad,
        fetchCourseQuestions,
        options,
        selectedAnsType,
        setselectedAnsType,
        // fetchCourseGroups,
        selectedSession,
        setselectedSession,
        assLoading,
        deletLoading,
        addCourseLoading,
        fetcchallAssistants,
        setdeletLoading,
        sethandleAddSession,
        deletAssistantfn,
        fetchCoursesGrades,
        CoursesGrades,
        setCoursesGrades,
        centerDetails,
        topicLoading,
        settopicLoading,
        Day,
        Time,
        IsLoading,
        setIsLoading,
        setGroups,
        Groups,

        BASUE__URL,
        userDetails,
        courseDetails,
        fetchGroups,

        setcourseDetails,
        setdataToPaginate,
        loadingAddAss,
        Topics,
        setTopics,

        getCenterByid,
        center,
        setcenter,
        AddCenter,
        fetchSessions,

        AddAssistantToCourse,
        assistantforEachCourse,
        fetchCoure,
        setassistantforEachCourse,
        AssistantCourses,
        setAssistantCourses,
        dataToPaginate,

        setdataToPaginate,

        AddCourse,
        selectedAssistant,
        setselectedAssistant,
        AddAssistant,
        fetchTopics,
        coursesData,
        selectedGrade,
        setselectedGradeId,
        selectedGradeId,
        setselectedGrade,
        TeacherAsssistants,
        TeacherCourses,
        setTeacherCourses,
        grades,
        headers,
        Courses,
        setCourses,
        fetchTutorCourse,
        tens,
        Role,
        fetchAssistants,
        centerCode,
        setcenterCode,

        conferm,
        selectedCourseId,
        setselectedCourseId,
        setConferm,
        // handleAddCenter,
        // sethandleAddCenter,

        isValidInput
      }}
    >
      {children}
    </ApisContext.Provider>
  );
}
