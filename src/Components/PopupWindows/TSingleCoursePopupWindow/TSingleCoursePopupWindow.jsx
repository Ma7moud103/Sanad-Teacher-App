// import React, { Fragment, useContext, useEffect, useState } from "react";
// import icon from "../../../Assets/Group.png";
// import exit from "../../../Assets/sanadIcons/Vector.png";
// import avatar from "../../../Assets/Avatars.png";
// import arrow from "../../../Assets/Vector 1.png";
// import search from "../../../Assets/Search.png";
// import centerIcon from "../../../Assets/Group (1).png";
// import assistant from "../../../Assets/Vector (8).png";
// import { MainContext } from "../../../Context/MainContext";
// import { useTranslation } from "react-i18next";
// import { SketchPicker } from "react-color";
// import { useFormik } from "formik";
// import axios from "axios";
// import { ApisContext } from "../../../Context/ApisContext";
// import { Listbox, Transition } from "@headlessui/react";

// export default function TSingleCoursePopupWindow({ id }) {
//   // const { showAddTopic, setShowAddTopic } = useContext(MainContext);
//   const { popupWindowContent, setPopupWindowContent, handleActiveClass, ErorrMessage } = useContext(MainContext);
//   const { headers, TeacherAsssistants, AddAssistantToCourse, courseDetails, Topics, setTopics, dataToPaginate, setdataToPaginate, assistantforEachCourse } = useContext(ApisContext)
//   const [dropDownMenu, setDropDownMenu] = useState(false);
//   function toggleDropDownMenu() {
//     setDropDownMenu((dropDownMenu) => !dropDownMenu);
//   }



//   const [color, setColor] = useState("#0c93c1"); // Initial color, you can set it to any color you prefer
//   const [displayColorPicker, setDisplayColorPicker] = useState(false);
//   const [selectedTopic, setselectedTopic] = useState([])
//   const [selectedAssistant, setselectedAssistant] = useState([])
//   const [selectedCenter, setselectedCenter] = useState([])

//   const handleClick = () => {
//     setDisplayColorPicker(!displayColorPicker);
//   };

//   const handleClose = () => {
//     setDisplayColorPicker(false);
//   };

//   const handleChange = (newColor) => {
//     console.log(newColor);
//     setColor(newColor.hex);
//   };
//   let [t, i18n] = useTranslation();


//   const TopicForm = useFormik({
//     initialValues: {
//       name: "",
//       color: color
//     },
//     onSubmit: async (values) => {
//       console.log(color);
//       try {
//         let res = await axios.post(`https://sanadedu.azurewebsites.net/api/v1//tutor-courses/${id}/topics`, values, { headers: headers })
//         console.log(res);

//         if (res.data.status === "success" || res.status === 201) {
//           ErorrMessage("You add a new Toopic , successfully", "#023E8AE5", 2000)
//           setTopics(prev => {
//             return [...prev, res.data.data]
//           })
//           setPopupWindowContent(0)
//         }

//       } catch (error) {
//         console.log(error.response);
//         if (error.response.status == 400) {
//           ErorrMessage("somthing wrong , please try again", "#f00", 2000)
//         }
//       }

//     }
//   })

//   const SessionForm = useFormik({
//     initialValues: {
//       name: "",
//       topicsId: ""
//     },
//     onSubmit: async (values) => {
//       try {
//         let res = await axios.post(`https://sanadedu.azurewebsites.net/api/v1//tutor-courses/${id}/sessions`, values, { headers: headers })
//         console.log(res);
//         if (res.data.status === "success" || res.status === 201 || res.status === 200) {
//           ErorrMessage("you add a new lesson , successfulley", "#023E8AB2", 2000)
//           console.log(res);
//           setdataToPaginate(prev => {
//             return [...prev, res.data.data]
//           })
//           setPopupWindowContent(0)
//         }
//       } catch (error) {
//         console.log(error);
//       }

//       // console.log(dataToPaginate);
//     }
//   })




//   const assistant = useFormik({
//     initialValues: {
//       tAs: []
//     },
//     onSubmit: async (values) => {
//       AddAssistantToCourse(values, id)
//       setPopupWindowContent(0)

//     }
//   })


//   const center = useFormik({
//     initialValues: {
//       centerId: "",
//       tutorCoursesId: []
//     }
//   })


//   // function s() {
//   //   TeacherAsssistants.filter((item) => {
//   //     assistantforEachCourse.filter(M => {
//   //       if (item.fullname === M.fullname) {
//   //         console.log(`
//   //         ${item.fullname}
//   //         &&&&&&&&&&

//   //         `);
//   //       }
//   //     })
//   //   })
//   // }


//   // useEffect(() => {
//   //   s()

//   // }, [])
//   return (
//     <>


//       <div className="justify-center items-center flex inset-0 z-50 outline-none focus:outline-none absolute w-full h-screen p-6 md:p-0 top-0">
//         <div className="fixed w-[380px] xl:w-[578px] max-h-[775px] mx-auto max-w-3xl z-40 flex justify-center items-center shadow-lg rounded-2xl">
//           {/*Exit*/}
//           <div
//             onClick={() => (setDropDownMenu(false))}
//             className="rounded-2xl shadow-sm relative flex flex-col w-full h-auto bg-[#F4F7FE] bg-HomePageBgImage bg-cover bg-center bg-no-repeat outline-none focus:outline-none p-6 md:pb-8 md:pt-4 md:px-8 gap-y-1">
//             <div className="flex justify-end">
//               <button
//                 className="p-1 w-10 h-10 flex justify-center items-center bg-white rounded-full"
//                 onClick={() => setPopupWindowContent(0)}
//               >
//                 <img src={exit} alt=""></img>
//               </button>
//             </div>
//             {/*header*/}
//             <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
//               <span className="w-16 h-16 bg-[#F0F6FFB2] rounded-full flex justify-center items-center">
//                 <img
//                   className="w-8 max-w-full"
//                   src={
//                     popupWindowContent === 1 || popupWindowContent === 4
//                       ? icon
//                       : popupWindowContent === 2
//                         ? centerIcon
//                         : popupWindowContent === 3
//                           ? assistant
//                           : ""
//                   }
//                   alt=""
//                 />
//               </span>
//               <h3 className="text-xl md:text-3xl font-black text-[#023E8A] mb-4">
//                 {popupWindowContent === 1
//                   ? t("PopUps.add") + " " + t("SingleCourse.topic")
//                   : popupWindowContent === 2
//                     ? t("PopUps.add") + " " + t("PopUps.center")
//                     : popupWindowContent === 3
//                       ? t("PopUps.add") + " " + t("homepage.assistant")
//                       : popupWindowContent === 4
//                         ? t("PopUps.add") + " " + t("SingleCourse.session")
//                         : ""}
//               </h3>
//             </div>
//             {/*body*/}
//             {popupWindowContent === 1 ? (

//               // topics

//               <form onSubmit={TopicForm.handleSubmit} className="Topic flex flex-col gap-3 2xl:gap-4">
//                 <div className="course-name flex flex-col">
//                   <label
//                     htmlFor="name"
//                     className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
//                   >
//                     {t("SingleCourse.topicName")}
//                   </label>
//                   <div className="flex justify-between items-center gap-1 w-full">
//                     <input
//                       placeholder={t("SingleCourse.trigonometry")}
//                       className={`w-[85%] py-2 px-6
//                      placeholder:text-textGray
//                      border-[#E6E9EA]
//                      outline-none focus:outline-none text-start border-[1px] rounded-xl my-3 h-[56px] placeholder:text-start`}
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={TopicForm.values.name}
//                       onChange={TopicForm.handleChange}
//                     />

//                     <div
//                       onClick={handleClick}
//                       style={{ backgroundColor: color }}
//                       className={`cursor-pointer w-[15%] h-[3.25rem] rounded-xl shadow`}
//                     />
//                     {displayColorPicker && (
//                       <div className="absolute ">
//                         <input
//                           value={color}
//                           type="button"
//                           onClick={(e) => {
//                             handleClose()
//                             TopicForm.setFieldValue("color", color)
//                           }}
//                           className="fixed top-0 bottom-0 right-0 left-0"
//                         />
//                         <SketchPicker className="z-10 relative" color={color} onChange={handleChange} />
//                       </div>
//                     )}
//                   </div>

//                 </div>

//                 <div className="course-name flex flex-col gap-3">
//                   <label
//                     htmlFor="courseName"
//                     className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
//                   >
//                     {t("homepage.courseName")}
//                   </label>
//                   <div className="bg-white flex justify-between items-center py-2 px-4 shadow rounded-xl">
//                     <div className="flex w-2/3 justify-start items-center gap-3">
//                       <span>
//                         <img src={courseDetails?.courseData?.image} alt="" />
//                       </span>
//                       <div className="flex flex-col">
//                         <p className="text-secondMainColor text-lg font-extrabold">
//                           {courseDetails?.courseData?.name}
//                         </p>
//                         <p className="text-[#9CA3AF] text-xs">
//                           {courseDetails?.courseData?.grade?.nameAr}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex w-1/3 justify-center items-center">
//                       <p className="text-[#9CA3AF]" >{t("coursesTable.term")}
//                         {courseDetails.term == 1 && t("coursesTable.first")}
//                         {courseDetails.term == 2 && t("coursesTable.second")}
//                         {courseDetails.term == 3 && t("coursesTable.third")}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center 3xl:mt-4">
//                   <button className="bg-mainColor text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                     {t("PopUps.add")}
//                   </button>
//                   <button
//                     onClick={() => setPopupWindowContent(0)}
//                     className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                     {t("homepage.back")}
//                   </button>
//                 </div>
//               </form>
//             )
//               : popupWindowContent === 2 ? (
//                 <>
//                   {/* centers */}


//                   <form onSubmit={center.handleSubmit} className="flex flex-col gap-3 2xl:gap-4">



//                     <div className="center flex flex-col w-full relative">
//                       <label
//                         htmlFor=""
//                         className={`text-[#023E8A] w-full text-start font-semibold text-sm relative flex justify-start items-center`}
//                       >
//                         {t("PopUps.chooseCenter")} -
//                         <p className="text-[#023E8A] text-start text-xs">
//                           {t("PopUps.chooseMultipleCenters")}
//                         </p>
//                       </label>

//                       <Listbox onChange={ele => {
//                         // formik.setFieldValue("courseId", ele._id)
//                         setselectedCenter(ele.name)
//                         // setselectedCourseId(ele._id)

//                       }}>
//                         <div className="relative mt-1">

//                           <Listbox.Button className={`font-semibold   py-4 pl-3 pr-10 text-sm leading-5  focus:ring-0
//                       relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm`}>

//                             <span className="absolute top-[50%]  translate-y-[-50%]  inset-y-0 end-2 flex items-center px-2 w-[30px] h-[30px] rounded-full bg-[#E3EFFF]">
//                               <img src={arrow} alt="" />
//                             </span>

//                             <span className={`block truncate`}>

//                               kadsf
//                             </span>
//                           </Listbox.Button>

//                           <Transition
//                             as={Fragment}
//                             leave="transition ease-in duration-100"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                           >
//                             <Listbox.Options className="absolute  mt-1 max-h-40 z-10
//                         scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow">
//                               {TeacherAsssistants.map((person, personIdx) => (
//                                 <Listbox.Option
//                                   key={personIdx}
//                                   className={({ active }) =>
//                                     ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'
//                                     }`
//                                   }
//                                   value={person}
//                                 >
//                                   {({ selectedCourse }) => (
//                                     <>
//                                       <span
//                                         className={`block truncate ${selectedCourse ? 'font-medium' : 'font-normal'
//                                           }`}
//                                       >
//                                         {person.name}
//                                       </span>
//                                       {selectedCourse ? (
//                                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                                           {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
//                                         </span>
//                                       ) : null}
//                                     </>
//                                   )}
//                                 </Listbox.Option>
//                               ))}
//                             </Listbox.Options>
//                           </Transition>
//                         </div>
//                       </Listbox>


//                     </div>

//                     <div className="center flex flex-col gap-3">
//                       <label
//                         htmlFor="courseName"
//                         className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
//                       >
//                         {t("homepage.courseName")}
//                       </label>
//                       <div className="bg-white flex justify-between items-center py-2 px-4 shadow rounded-xl">
//                         <div className="flex w-2/3 justify-start items-center gap-3">
//                           <span>
//                             <img src={courseDetails.courseData.image != "" ? courseDetails.courseData.image : avatar} alt="" />
//                           </span>
//                           <div className="flex flex-col">
//                             <p className="text-secondMainColor text-lg font-extrabold">
//                               {courseDetails.courseData.name}
//                             </p>
//                             <p className="text-[#9CA3AF] text-xs">
//                               الصف الثانى
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex w-1/3 justify-center items-center">
//                           <p className="text-[#9CA3AF]">الترم التانى</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center 3xl:mt-4">
//                       <button className="bg-mainColor text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                         {t("PopUps.add")}
//                       </button>
//                       <button
//                         onClick={() => setPopupWindowContent(0)}
//                         className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                         {t("homepage.back")}
//                       </button>
//                     </div>
//                   </form>
//                 </>
//               ) : popupWindowContent === 3 ? (
//                 <>

//                   <form onSubmit={assistant.handleSubmit} className="flex assistants flex-col gap-3 2xl:gap-4">





//                     <div className="w-full assistant">
//                       <label
//                         htmlFor="tAs"
//                         className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
//                       >
//                         {t("windows.assistant")}  -  <span className="text-[13px]"> {t("windows.assistant2")}</span>
//                       </label>
//                       <Listbox
//                         // name={`topicsId`}
//                         onChange={(e) => {
//                           let x = e.map((item) => {
//                             return item._id
//                           })

//                           assistant.setFieldValue("tAs", x)

//                           setselectedAssistant(e)
//                         }}
//                         value={selectedAssistant}
//                         multiple>

//                         <div className="relative mt-1">
//                           <Listbox.Button className="font-semibold text-mainColor border-none py-4 pl-3 pr-10 text-sm leading-5  focus:ring-0
//                       relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm">
//                             <span className="absolute top-[50%] translate-y-[-50%]  inset-y-0 end-2 flex items-center px-2 w-[30px] h-[30px] rounded-full bg-[#E3EFFF]">
//                               <img src={arrow} alt="" />
//                             </span>

//                             {selectedAssistant.length > 0 ? selectedAssistant.map((item, i) => {
//                               return (
//                                 <span key={i} className={`block truncate px-2 bg-mainColor text-white py-1 mx-1`}>{item?.fullname}</span>
//                               )
//                             }) : <span className={`block truncate text-textGray`}>{t("windows.selectone")}</span>}
//                           </Listbox.Button>

//                           <Transition
//                             as={Fragment}
//                             leave="transition ease-in duration-100"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                           >
//                             <Listbox.Options className="absolute  mt-1 max-h-40 z-10
//                         scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow">
//                               {TeacherAsssistants.map((person, personIdx) => (
//                                 <Listbox.Option key={personIdx} value={person} className={({ active }) =>
//                                   ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'
//                                   }`
//                                 }  >

//                                   {person.fullname}
//                                 </Listbox.Option>
//                               ))}
//                             </Listbox.Options>
//                           </Transition>
//                         </div>
//                       </Listbox>


//                     </div>







//                     <div className="course-name flex flex-col gap-3">
//                       <label
//                         htmlFor="courseName"
//                         className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
//                       >
//                         {t("homepage.courseName")}
//                       </label>
//                       <div className="bg-white flex justify-between items-center py-2 px-4 shadow rounded-xl">
//                         <div className="flex w-2/3 justify-start items-center gap-3">
//                           <span>
//                             <img src={courseDetails.courseData.image != "" ? courseDetails.courseData.image : avatar} alt="" />
//                           </span>
//                           <div className="flex flex-col">
//                             <p className="text-secondMainColor text-lg font-extrabold">
//                               {courseDetails?.courseData?.name}
//                             </p>
//                             <p className="text-[#9CA3AF] text-xs">
//                               {courseDetails.courseData?.grade?.nameAr}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex w-1/3 justify-center items-center">
//                           <p className="text-[#9CA3AF]"> الترم

//                             {courseDetails?.term == 1 && t("coursesTable.first")}
//                             {courseDetails?.term == 2 && t("coursesTable.second")}
//                             {courseDetails?.term == 3 && t("coursesTable.third")}
//                           </p>
//                         </div>
//                       </div>
//                     </div>


//                     <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center 3xl:mt-4">
//                       <button
//                         disabled={(!assistant.dirty)}
//                         className={`${(assistant.dirty) ? "bg-mainColor" : "bg-secondMainColor"} text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl cursor-pointer`}>
//                         {t("PopUps.add")}
//                       </button>
//                       <button
//                         onClick={() => setPopupWindowContent(0)}
//                         className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                         {t("homepage.back")}
//                       </button>
//                     </div>
//                   </form>
//                 </>
//               ) : popupWindowContent === 4 ? (
//                 <>
//                   <form onSubmit={SessionForm.handleSubmit} className="flex flex-col gap-3 2xl:gap-4">
//                     <div className="session-name flex flex-col">
//                       <label

//                         htmlFor="name"
//                         className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
//                       >
//                         {t("PopUps.sessionName")}
//                       </label>
//                       <div className="flex justify-between items-center gap-1 w-full">
//                         <input
//                           value={SessionForm.values.name}
//                           placeholder={t("PopUps.session01")}
//                           className={`w-full py-2 px-6
//                      placeholder:text-textGray
//                      border-[#E6E9EA]
//                      outline-none focus:outline-none text-start border-[1px] rounded-xl my-3 h-[56px] placeholder:text-start`}
//                           type="text"
//                           id="name"
//                           name="name"
//                           onChange={SessionForm.handleChange}
//                         />
//                       </div>
//                     </div>





//                     <div className="w-full topics">
//                       <label
//                         htmlFor="topicsId"
//                         className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
//                       >
//                         {t("windows.topic")}  -  <span className="text-[13px]">{t("windows.topic2")} </span>
//                       </label>
//                       <Listbox
//                         // name={`topicsId`}
//                         onChange={(e) => {
//                           let x = e.map((item) => {
//                             return item._id
//                           })

//                           SessionForm.setFieldValue("topicsId", x)

//                           setselectedTopic(e)
//                         }}
//                         value={selectedTopic}
//                         multiple>

//                         <div className="relative mt-1">
//                           <Listbox.Button className="font-semibold text-mainColor border-none py-4 pl-3 pr-10 text-sm leading-5  focus:ring-0
//                       relative w-full flex cursor-pointer rounded-lg bg-white text-left focus:outline-none  sm:text-sm">
//                             <span className="absolute top-[50%] translate-y-[-50%]  inset-y-0 end-2 flex items-center px-2 w-[30px] h-[30px] rounded-full bg-[#E3EFFF]">
//                               <img src={arrow} alt="" />
//                             </span>

//                             {selectedTopic.length > 0 ? selectedTopic.map((item, i) => {
//                               return (
//                                 <span key={i} className={`block truncate px-2 bg-mainColor text-white py-1 mx-1`}>{item?.name}</span>
//                               )
//                             }) : <span className={`block truncate text-textGray`}> {t("windows.topic")}  </span>}
//                           </Listbox.Button>

//                           <Transition
//                             as={Fragment}
//                             leave="transition ease-in duration-100"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                           >
//                             <Listbox.Options className="absolute  mt-1 max-h-40 z-10
//                         scrollbar-thin  w-full overflow-y-scroll rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm shadow">
//                               {Topics.map((person, personIdx) => (
//                                 <Listbox.Option key={personIdx} value={person} className={({ active }) =>
//                                   ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-mainColor text-white' : 'text-mainColor'
//                                   }`
//                                 }  >

//                                   {person.name}
//                                 </Listbox.Option>
//                               ))}
//                             </Listbox.Options>
//                           </Transition>
//                         </div>
//                       </Listbox>


//                     </div>






//                     <div className="course-name flex flex-col gap-3">
//                       <label
//                         htmlFor="courseName"
//                         className={`text-[#023E8A] w-full text-start font-semibold text-sm relative`}
//                       >
//                         {t("homepage.courseName")}
//                       </label>
//                       <div className="bg-white flex justify-between items-center py-2 px-4 shadow rounded-xl">
//                         <div className="flex w-2/3 justify-start items-center gap-3">
//                           <span>
//                             <img src={courseDetails?.courseData?.image} alt="" />
//                           </span>
//                           <div className="flex flex-col">
//                             <p className="text-secondMainColor text-lg font-extrabold">
//                               {courseDetails?.courseData.name}
//                             </p>
//                             <p className="text-[#9CA3AF] text-xs">
//                               {courseDetails.courseData.grade.nameAr}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex w-1/3 justify-center items-center">
//                           <p className="text-[#9CA3AF]"> الترم {courseDetails.term}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center 3xl:mt-4">
//                       <button className="bg-mainColor text-white rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                         {t("PopUps.add")}
//                       </button>
//                       <button
//                         onClick={() => setPopupWindowContent(0)}
//                         className="bg-transparent text-mainColor rounded-2xl px-10 py-3 w-full md:w-1/2 text-xl">
//                         {t("homepage.back")}
//                       </button>
//                     </div>
//                   </form>
//                 </>
//               ) : (
//                 ""
//               )}
//           </div>
//         </div>
//         <div
//           onClick={() => setPopupWindowContent(0)}
//           className="fixed inset-0 bg-black backdrop-blur-[1px] bg-opacity-[0.02]"
//         ></div>
//       </div>
//     </>
//   );
// }
