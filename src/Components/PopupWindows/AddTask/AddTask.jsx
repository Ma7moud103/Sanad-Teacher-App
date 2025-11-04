// import React, { Fragment, useContext, useState } from "react";
// import icon from "../../../Assets/Vector (11).png";
// import icon1 from "../../../Assets/Vector (12).png";
// import exit from "../../../Assets/sanadIcons/Vector.png";
// import arrow from "../../../Assets/Vector 1.png";
// import search from "../../../Assets/Search.png";

// import { MainContext } from "../../../Context/MainContext";
// import { useTranslation } from "react-i18next";
// import { click } from "@testing-library/user-event/dist/click";
// import { Formik, useFormik } from "formik";
// import { Listbox, Transition } from "@headlessui/react";
// import { ApisContext } from "../../../Context/ApisContext";
// import * as Yup from "yup"
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import axios from "axios";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const Types = ["seperated", "normal"]

// export default function AddTask() {
//   const { setShowAddTask, ErorrMessage, Toggler, setToggler } = useContext(MainContext);
//   const { setTasks, TeacherAsssistants, TeacherCourses, headers, CoursesGrades } = useContext(ApisContext)
//   const [selectedAssistant, setselectedAssistant] = useState([])
//   const [selectedCourse, setselectedCourse] = useState("")
//   const [selectedSmester, setselectedSmester] = useState("")
//   const [courseDropDown, setCourseDropDown] = useState(false);
//   const [assistantDropDown, setAssistantDropDown] = useState(false);
//   const [taskDropDown, setTaskDropDown] = useState(false);

//   const [selectedCourseId, setselectedCourseId] = useState("")


//   function toggleCourseDropDown() {
//     setCourseDropDown((courseDropDown) => !courseDropDown);
//   }
//   function toggleAssistantDropDown() {
//     setAssistantDropDown((assistantDropDown) => !assistantDropDown);
//   }
//   function toggleTaskDropDown() {
//     setTaskDropDown((taskDropDown) => !taskDropDown);
//   }
//   let [t] = useTranslation();


//   const Validations = Yup.object({
//     title: Yup.string().required(),
//     description: Yup.string().required(),
//     tAs: Yup.array().required(),
//     type: Yup.string().required(),
//     // tutorCourseId: Yup.string(),
//     deadline: Yup.date().required(),
//   })



//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//       tAs: [],
//       type: "seperated",
//       tutorCourseId: "",
//       deadline: ""
//     },
//     validationSchema: Validations,
//     onSubmit: async (values) => {

//       console.log(values);


//       return axios.post("https://sanadedu.azurewebsites.net/api/v1//todo/add-task", values, { headers: headers }).then((res) => {


//         if (res.status === 201 || 200 || res.data.status === "success") {
//           ErorrMessage("You Add A New Task Successfulley", "#023E8AB2", 3000)
//           setTasks(prev => {
//             return [...prev, res.data.data]
//           })
//           setToggler({ ...Toggler, addTask: false })
//         }
//       }).catch((error) => {
//         console.log(error);
//         ErorrMessage(error.response.data.message, "#f00", 3000)
//       })

//     }
//   })


//   return (
//     <>
//       <div className={`justify-center items-center ${Toggler.addTask ? "flex" : "hidden"} inset-0 z-50 outline-none focus:outline-none absolute w-full h-screen p-6 md:p-0 top-0`}>
//         <div className="absolute md:fixed w-[90%] md:w-2/5 xl:w-1/2 3xl:w-1/3 max-h-[775px] mx-auto max-w-3xl z-40 flex justify-center items-center shadow-lg rounded-2xl">
//           {/*Exit*/}
//           <div className="rounded-2xl shadow-sm relative flex flex-col w-full h-auto bg-[#F4F7FE] bg-HomePageBgImage bg-cover bg-center bg-no-repeat outline-none focus:outline-none p-6 md:pb-8 md:pt-4 md:px-8 gap-y-1">
//             <div className="flex justify-end">
//               <button
//                 className="p-1 w-10 h-10 flex justify-center items-center bg-white rounded-full"
//                 onClick={() => setToggler({ ...Toggler, addTask: false })}
//               >
//                 <img src={exit} alt=""></img>
//               </button>
//             </div>
//             {/*header*/}
//             <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
//               <span className="w-16 h-16 bg-[#F0F6FFB2] rounded-full flex justify-center items-center">
//                 <img className="w-8 max-w-full" src={icon} alt="" />
//               </span>
//               <div className="flex flex-col gap-1 md:gap-y-3 justify-center items-center">
//                 <h3 className="text-xl md:text-3xl font-black text-[#023E8A]">
//                   {t("PopUps.add")} {t("homepage.task")}
//                 </h3>
//                 <p className="text-[#4E5556] text-sm md:lg">
//                   {t("PopUps.taskText")}
//                 </p>
//               </div>
//             </div>
//             {/*body*/}
//             <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">


//               <div className="taskname flex flex-col w-full">
//                 <label
//                   htmlFor="title"
//                   className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
//                 >
//                   {t("homepage.taskName")}
//                 </label>
//                 <input
//                   value={formik.values.title}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   placeholder={t("PopUps.assistantFirstPlaceholder")}
//                   className={` py-2 px-6  outline-none  focus:outline-none text-start border-[1px] border-solid rounded-xl mt-1 h-[56px] placeholder:text-start
                    
//                              ${formik.errors.title && formik.touched.title ? "placeholder:text-err border-err text-err" : "placeholder:text-[#A4ACAD]  border-[#E6E9EA]"}
//                    `}
//                   type="text"
//                   id="title"
//                   name="title"

//                 />
//               </div>



//               <div className="des flex flex-col w-full">
//                 <label
//                   htmlFor="description"
//                   className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
//                 >
//                   {t("task.1")} - <span className="text-[12px]">
//                     {t("task.2")}
//                   </span>
//                 </label>
//                 <input
//                   value={formik.values.description}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   placeholder={t("task.desP")}
//                   className={`  py-2 px-6  outline-none  focus:outline-none text-start border-[1px] border-solid rounded-xl mt-1 h-[56px] placeholder:text-start
                    
//                              ${formik.errors.description && formik.touched.description ? "placeholder:text-err border-err text-err" : "placeholder:text-[#A4ACAD]  border-[#E6E9EA]"}
//                   `}
//                   type="text"
//                   id="description"
//                   name="description"

//                 />
//               </div>



//               <div className="w-full courses">
//                 <label
//                   htmlFor="courseId"
//                   className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
//                 >
//                   {t("homeBoxes.course")}
//                 </label>
//                 <Listbox onChange={ele => {
//                   formik.setFieldValue("tutorCourseId", ele?._id)
//                   setselectedCourse(ele)
//                   setselectedCourseId(ele?._id)

//                 }}>
//                   <div className="relative mt-1">

//                     <Listbox.Button className={`font-semibold  py-4 pl-3 pr-10 text-sm leading-5  focus:ring-0
//                       relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm`}>

//                       <span className="absolute top-[50%]  translate-y-[-50%]  inset-y-0 end-2 flex items-center px-2 w-[30px] h-[30px] rounded-full bg-[#E3EFFF]">
//                         <img src={arrow} alt="" />
//                       </span>

//                       <span className={`block truncate ${formik.values.tutorCourseId != "" && selectedCourse !== "" ? "text-mainColor font-thin" : "text-textGray"}`}>
//                         {formik.values.tutorCourseId ? selectedCourse != "" ? `${selectedCourse?.courseData?.name} - ${selectedCourse?.courseData?.grade?.nameAr}` : t("homeBoxes.courseP") : t("homeBoxes.courseP")}
//                       </span>
//                     </Listbox.Button>

//                     <Transition
//                       as={Fragment}
//                       leave="transition ease-in duration-100"
//                       leaveFrom="opacity-100"
//                       leaveTo="opacity-0"
//                     >
//                       <Listbox.Options className="absolute  mt-1 max-h-40 z-[10000000] 
//                         scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow ">
//                         {TeacherCourses?.map((person, personIdx) => (
//                           <Listbox.Option
//                             key={personIdx}
//                             className={({ active }) =>
//                               ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'
//                               }`
//                             }
//                             value={person}
//                           >
//                             {({ selectedCourse }) => (
//                               <>
//                                 <span
//                                   className={`block truncate ${selectedCourse ? 'font-medium' : 'font-normal'
//                                     }`}    >
//                                   {person?.courseData?.name} - {person?.courseData?.grade?.nameAr}
//                                 </span>
//                               </>
//                             )}
//                           </Listbox.Option>
//                         ))}
//                       </Listbox.Options>
//                     </Transition>
//                   </div>
//                 </Listbox>
//                 {/* {formik.errors.tutorCourseId && <p className="text-red-400 py-1">{formik.errors.tutorCourseId}</p>} */}

//               </div>



//               <div className="w-full assistants">
//                 <label
//                   htmlFor="tAs"
//                   className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
//                 >
//                   {t("task.res")}
//                 </label>
//                 <Listbox
//                   name={`tAs[1]`}
//                   onChange={(e) => {
//                     let x = e.map(item => {
//                       return item._id
//                     })
//                     formik.setFieldValue("tAs", x)

//                     setselectedAssistant(e)

//                   }}
//                   value={selectedAssistant}
//                   multiple>

//                   <div className="relative mt-1 z-50">
//                     <Listbox.Button id="receiver" className={`font-semibold   py-4 pl-3 pr-10 text-sm leading-5  focus:ring-0
//                       relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm`}>
//                       <span className="absolute top-[50%] translate-y-[-50%]  inset-y-0 end-2 flex items-center px-2 w-[30px] h-[30px] rounded-full bg-[#E3EFFF]">
//                         <img src={arrow} alt="" />
//                       </span>

//                       {formik.values.tAs.length > 0 ? selectedAssistant?.map((item, i) => {
//                         return (
//                           <span key={i} className={`block truncate px-2 bg-mainColor text-white py-1 mx-1`}>{item?.fullname}</span>
//                         )
//                       }) : <span className={`block truncate text-textGray`}>
//                         {t("homeBoxes.assP")}
//                       </span>}

//                     </Listbox.Button>

//                     <Transition
//                       as={Fragment}
//                       leave="transition ease-in duration-100"
//                       leaveFrom="opacity-100"
//                       leaveTo="opacity-0"
//                     >
//                       <Listbox.Options className="absolute  mt-1 max-h-40 z-10 
//                         scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow">
//                         {TeacherAsssistants.map((person, personIdx) => (
//                           <Listbox.Option key={personIdx} value={person} className={({ active }) =>
//                             ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'
//                             }`
//                           }  >

//                             {person?.fullname}
//                           </Listbox.Option>
//                         ))}
//                       </Listbox.Options>
//                     </Transition>
//                   </div>
//                 </Listbox>
//                 {/* {formik.errors.receiver && <p className="text-red-400 py-1">{formik.errors.receiver}</p>} */}


//               </div>


//               <div className=" date w-full flex flex-col gap-y-1">

//                 <label
//                   htmlFor="date"
//                   className={`text-[#023E8A] w-full text-start font-semibold text-sm relative  `}
//                 >
//                   {t("task.end")}

//                 </label>

//                 <LocalizationProvider dateAdapter={AdapterDayjs}>

//                   <DatePicker
//                     // label="Uncontrolled picker"
//                     format="YYYY/MM/DD  "

//                     name="deadline"
//                     // value={formik.values.deadline}
//                     onChange={(e) => {
//                       console.log(e.$d);
//                       formik.values.deadline = e?.$d
//                     }}

//                     className={`font-semibold  border-none outline-none  text-mainColor  py-4 pl-3 pr-10 text-sm leading-5  focus:ring-0
//                       relative w-full focus:border-none focus:shadow-none  flex cursor-pointer rounded-lg bg-white text-left focus:outline-none overflow-hidden  sm:text-sm`}


//                   />

//                 </LocalizationProvider>
//               </div>









//               <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center 3xl:mt-4">
//                 <button
//                   type="submit"
//                   // disabled={(formik.dirty && !formik.isValid)}
//                   className={`${!formik.dirty && formik.isValid ? "bg-mainColor" : "bg-red-50"} text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl`}>
//                   {t("PopUps.add")}
//                 </button>
//                 <button
//                   onClick={() => setToggler({ ...Toggler, addTask: false })}
//                   className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl"
//                 >
//                   {t("homepage.back")}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div
//           onClick={() => setToggler({ ...Toggler, addTask: false })}
//           className="fixed inset-0 bg-black backdrop-blur-[1px] bg-opacity-[0.02]"
//         ></div>
//       </div>
//     </>
//   );
// }
