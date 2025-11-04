// import React, { useContext, useEffect, useState } from "react";
// import icon from "../../Assets/PDF.png";
// import exit from "../../Assets/sanadIcons/Vector.png";
// import trash from "../../Assets/trash.png";
// import arrow from "../../Assets/Vector 1.png";
// import icon1 from "../../Assets/Vector22.png";
// import icon2 from "../../Assets/close-circle.png";
// import upload from "../../Assets/Upload icon.png";
// import correct from "../../Assets/Vector (22).png";
// import search from "../../Assets/Search.png";
// import { MainContext } from "../../Context/MainContext";
// import { useTranslation } from "react-i18next";

// export default function SingleCoursePopupWindow() {
//   const [dropDownMenu, setDropDownMenu] = useState(false);
//   function toggleDropDownMenu() {
//     setDropDownMenu((dropDownMenu) => !dropDownMenu);
//   }
//   const {
//     showSingleCoursePopupWindow,
//     setSingleCoursePopupWindow,
//     switchOff,
//     setSwitchOff,
//   } = useContext(MainContext);
//   let [t, i18n] = useTranslation();
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [isDraggingOver, setIsDraggingOver] = useState(false);
//   const [fileSelected, setFileSelected] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files); // Convert the FileList to an array
//     setSelectedFiles([...files]);
//     setFileName(files[0]?.name); // Assuming only a single file is selected
//     setFileSelected(true);
//     console.log(files); // Log the file name to the console
//   };
//   const clearSelectedFiles = () => {
//     setSelectedFiles([]);
//   };
//   useEffect(() => {
//     const handleDragEnter = (e) => {
//       e.preventDefault();
//       setIsDraggingOver(true);
//     };

//     // Attach event listeners when the component mounts
//     window.addEventListener("dragenter", handleDragEnter);

//     // Clean up the event listeners when the component unmounts
//     return () => {
//       window.removeEventListener("dragenter", handleDragEnter);
//     };
//   }, []);

//   const sampleData2 = [
//     {
//       id: 1,
//       name: "محمد موسى",
//       code: "04613",
//     },
//     {
//       id: 2,
//       name: "هاشم احمد",
//       code: "674693",
//     },
//     {
//       id: 3,
//       name: "هشام فهمى",
//       code: "698413",
//     },
//     {
//       id: 4,
//       name: "محسن البندارى",
//       code: "498894",
//     },
//     {
//       id: 5,
//       name: "عمرو السعودى",
//       code: "684157",
//     },
//     {
//       id: 6,
//       name: "شوقى مغربى",
//       code: "358467",
//     },
//     {
//       id: 6,
//       name: "حسام احمد",
//       code: "258418",
//     },
//     {
//       id: 7,
//       name: "هدى اسماعيل",
//       code: "499137",
//     },
//     // Add more sample data items as needed
//   ];
//   // Sample data for testing
//   const sampleData = [
//     {
//       id: 1,
//       fileName: "ملخص الدرس الأول .pdf",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 2,
//       fileName: "ملخص الدرس الأول .jpg",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 3,
//       fileName: "ملخص الدرس الأول .docx",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 4,
//       fileName: "ملخص الدرس الأول .Mp4",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 5,
//       fileName: "فيديو الدرس - يوتيوب",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 6,
//       fileName: "ملخص الدرس الأول .docx",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 6,
//       fileName: "ملخص الدرس الأول .pdf",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     {
//       id: 7,
//       fileName: "ملخص الدرس الأول .Mp4",
//       timestamp: "منذ 10 دقائق بواسطة حسين ممتاز",
//       fileSize: "604KB",
//     },
//     // Add more sample data items as needed
//   ];

//   return (
//     <>
//       <div className="justify-center items-center flex inset-0 z-50 outline-none focus:outline-none absolute w-full h-screen p-6 md:p-0 top-0">
//         <div className="fixed w-[90%] md:w-3/5 xl:w-1/2 3xl:w-1/3 max-h-[775px] mx-auto max-w-3xl z-40 flex justify-center items-center shadow-lg rounded-2xl">
//           <div className="rounded-2xl shadow-sm relative flex flex-col w-full h-auto bg-[#F4F7FE] bg-HomePageBgImage bg-cover bg-center bg-no-repeat outline-none focus:outline-none p-6 md:p-14 md:px-6 gap-y-10">
//             {/*header*/}
//             <div className="flex items-center">

//               <div className="w-1/5"></div>

//               <div className="flex w-3/5 bg-white p-1 rounded-full h-10 switcher">

//                 <div
//                   type="button"
//                   onClick={() => setSwitchOff(true)}
//                   className={`w-1/2 cursor-pointer flex justify-center items-center rounded-full ${switchOff
//                     ? "bg-secondMainColor text-white"
//                     : "text-secondMainColor bg-transparent"
//                     }`}
//                 >
//                   <p>{t("PopUps.uploadedFiles")}</p>
//                 </div>
//                 <div
//                   type="button"
//                   onClick={() => setSwitchOff(false)}
//                   className={`w-1/2 cursor-pointer flex justify-center items-center rounded-full ${switchOff
//                     ? "text-secondMainColor bg-transparent"
//                     : "bg-secondMainColor text-white"
//                     }`}
//                 >
//                   <p>{t("PopUps.uploadNewFile")}</p>
//                 </div>

//               </div>

//               <div className="flex exitBtn justify-end w-1/5">
//                 <button
//                   className="p-1 w-10 h-10 flex justify-center items-center bg-white rounded-full"
//                   onClick={() => setSingleCoursePopupWindow(false)}
//                 >
//                   <img src={exit} alt="Exit"></img>
//                 </button>
//               </div>

//             </div>

//             {/*body*/}
//             {switchOff ? (
//               <div
//                 id="FileList"
//                 className="flex flex-col scale-x-[-1] justify-center items-center overflow-y-auto pe-5 scrollbar scrollbar-thumb-secondMainColor scrollbar-track-white scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-w-2 "
//               >
//                 <div className="scrolling-part w-full md:pe-2 scale-x-[-1] max-h-[300px]">
//                   {sampleData.map((item) => (
//                     <div
//                       key={item.id}
//                       className="singleFile flex justify-between items-center py-4 border-b-2 w-full"
//                     >
//                       <div className="flex justify-start items-center gap-x-4">
//                         <span className="flex justify-center items-center w-6 h-6">
//                           <img className="w-full" src={icon} alt="" />
//                         </span>
//                         <div className="text flex flex-col justify-center items-start">
//                           <p className="text-[#293241] font-semibold text-xl tracking-wide">
//                             {item.fileName}
//                           </p>
//                           <p className="text-textGray font-semibold text-sm">
//                             {item.timestamp}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex justify-end items-center gap-x-4">
//                         <span className="flex justify-center items-center border-[3px] rounded-2xl bg-transparent px-6 py-1 text">
//                           <p>{item.fileSize}</p>
//                         </span>
//                         <span className="flex justify-center items-center w-7 h-7 cursor-pointer">
//                           <img className="w-full" src={trash} alt="" />
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <form className=" flex flex-col gap-6 2xl:gap-4">
//                 <div className="contenttype flex flex-col w-full relative">

//                   <label
//                     htmlFor="contentType"
//                     className={`text-[#023E8A] w-full text-start font-semibold text-sm relative flex`}
//                   >
//                     {t("PopUps.contentType")}
//                   </label>
//                   <input
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       // toggleDropDownMenu();
//                     }}
//                     placeholder={t("PopUps.paidContent")}
//                     className={` py-2 px-6
//                              placeholder:text-textGray
//                         border-[#E6E9EA]
//                            outline-none  focus:outline-none text-start border-[1px] rounded-xl my-3 h-[56px] placeholder:text-start cursor-pointer`}
//                     type="text"
//                     id="contentType"
//                     name="contentType"
//                   />
//                   <span
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleDropDownMenu();
//                     }}
//                     className={`w-8 h-8 bg-[#E3EFFF] rounded-full flex justify-center items-center absolute top-2/3 rtl:left-4 ltr:right-4 -translate-y-2/3 cursor-pointer`}
//                   >
//                     <img
//                       className={`w-4 max-w-full ${dropDownMenu ? "rotate-180" : ""
//                         }`}
//                       src={arrow}
//                       alt=""
//                     />
//                   </span>
//                   {dropDownMenu ? (
//                     <div


//                       className="w-full flex flex-col bg-white absolute top-full border-[1px] rounded-xl p-4 gap-2 z-50">
//                       <label className="flex justify-center items-center relative ">
//                         <input
//                           onClick={e => e.stopPropagation()}
//                           placeholder={`ابحث عن مثال`}
//                           type="text"
//                           className={`rounded-xl w-full border-[#E6E9EA] px-4 py-2 h-12 placeholder:ps-9 placeholder:text-[#ABAFB1] focus:ps-11 focus:placeholder:ps-2`}
//                         />
//                         <span className="absolute start-5 cursor-pointer">
//                           <img src={search} alt="" />
//                         </span>
//                       </label>
//                       <div className="flex flex-col scale-x-[-1] justify-center items-center overflow-y-auto pe-5 scrollbar scrollbar-thumb-secondMainColor scrollbar-track-white scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-w-2">
//                         <div className="scrolling-part w-full md:pe-2 scale-x-[-1] max-h-[200px]">
//                           {sampleData2.map((item) => (
//                             <div
//                               key={item.id}
//                               className="flex justify-between items-center py-3 w-full"
//                             >
//                               <div className="flex justify-center items-center gap-2">
//                                 <p className="text-[#293241] font-semibold text-base tracking-wide">
//                                   {item.name}
//                                 </p>
//                                 -
//                                 <p className="text-[#293241] font-semibold text-base tracking-wide">
//                                   {item.code}
//                                 </p>
//                               </div>
//                               <input
//                                 className="cursor-pointer mx-1 outline-none focus:shadow-none focus:outline-none border-[#BDC4CD] border-[1px] rounded-lg w-[24px] h-[24px] text-mainColor checked:bg-mainColor checked:text-mainColor checked:shadow-none checked:outline-none shadow-none focus:ring-0 focus:ring-offset-0"
//                                 type="checkbox"
//                               />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </div>



//                 <div className="dropbox flex flex-col w-full justify-center items-center">
//                   <div
//                     className={`w-full border rounded-xl border-mainColor relative my-2 flex justify-center items-center border-dashed stroke-8
//                       `}
//                     title={fileSelected && isHovered ? fileName : ""}
//                   >
//                     <input
//                       type="file"
//                       id="DropboxFile"
//                       name="DropboxFile"
//                       className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
//                       onChange={handleFileSelect}
//                       onFocus={() => setFileSelected(true)}
//                       multiple
//                     />
//                     <div
//                       id="greenReference"
//                       className={`w-full h-full flex flex-col items-center justify-center text-center absolute top-0 right-0 left-0 m-auto gap-y-3 ${isDraggingOver &&
//                         (!fileSelected || selectedFiles.length === 0)
//                         ? "bg-green-100"
//                         : ""
//                         }`}
//                     >
//                       {!fileSelected || selectedFiles.length === 0 ? (
//                         <>
//                           <img className="max-w-full" src={upload} alt="" />
//                           <h4 className="text-[#333333] text-xl">
//                             {isDraggingOver
//                               ? `${t("PopUps.dropFileHere")}`
//                               : `${t("PopUps.dragAndDropFiles")}
//                                 `}
//                             {isDraggingOver ? (
//                               ""
//                             ) : (
//                               <span className="text-mainColor">
//                                 {t("PopUps.browseFiles")}
//                               </span>
//                             )}
//                           </h4>
//                           <p className="text-base text-textGray">
//                             {t("PopUps.supportedFormats")}: JPEG, PNG, GIF, MP4,
//                             PDF, Word, PPT
//                           </p>
//                         </>
//                       ) : (
//                         <>
//                           {selectedFiles.length > 0 ? (
//                             <div className="absolute top-2 w-full h-full flex flex-col justify-center items-center">
//                               {/* <img
//                                 className="max-w-[10rem] max-h-[10rem]"
//                                 src={URL.createObjectURL(selectedFiles[0])}
//                                 alt="Selected"
//                               /> */}
//                               <span className="w-[3rem] h-[3rem] rounded-full bg-[#96C362] border-[4px] border-[#96C3622E] flex justify-center items-center mb-4">
//                                 <img
//                                   className="max-w-full"
//                                   src={correct}
//                                   alt=""
//                                 />
//                               </span>
//                               <p>{fileName}</p>
//                             </div>
//                           ) : (
//                             ""
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   id="filesProgression"
//                   className="flex flex-col gap-2 justify-center items-center"
//                 >
//                   <div className="flex justify-between items-center w-full">
//                     <div className="flex justify-start items-center gap-x-4 w-full">
//                       <span className="flex justify-center items-center w-6 h-6">
//                         <img className="w-full" src={icon} alt="" />
//                       </span>
//                       <div className="flex flex-col gap-2 justify-center items-start w-full">
//                         <div className="flex justify-center items-center gap-2">
//                           <p className="text-[#293241] font-semibold text-xl tracking-wide">
//                             ملخص الدرس الأول .pdf
//                           </p>
//                           <span className="flex justify-center items-center border-[1px] border-[#9CA3AF66] rounded-2xl bg-transparent w-12 h-5 px-7 py-3 text-xs">
//                             <p>1.46MB</p>
//                           </span>
//                         </div>
//                         <div className="progress-bar w-4/5 flex flex-col justify-center items-center relative">
//                           <div className="w-full h-3 bg-[#9CA3AF4D] rounded-full">
//                             <div className="h-3 bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] rounded-full w-5/6" />
//                           </div>
//                           <span className="absolute -end-10">80%</span>
//                         </div>
//                       </div>
//                     </div>
//                     <span className="cursor-pointer w-5 flex justify-center items-center">
//                       <img className="w-full" src={icon2} alt="" />
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center w-full">
//                     <div className="flex justify-start items-center gap-x-4 w-full">
//                       <span className="flex justify-center items-center w-6 h-6">
//                         <img className="w-full" src={icon} alt="" />
//                       </span>
//                       <div className="flex flex-col gap-2 justify-center items-start w-full">
//                         <div className="flex justify-center items-center gap-2">
//                           <p className="text-[#293241] font-semibold text-xl tracking-wide">
//                             ملخص الدرس الأول .pdf
//                           </p>
//                           <span className="flex justify-center items-center border-[1px] border-red-400 text-red-400 rounded-2xl bg-transparent w-12 h-5 px-7 py-3 text-xs">
//                             <p>{t("PopUps.error")}</p>
//                           </span>
//                         </div>
//                         <p className="text-textGray font-semibold text-sm">
//                           {t("PopUps.uploadCompleted")}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="cursor-pointer w-5 flex justify-center items-center">
//                       <img className="max-w-full" src={icon1} alt="" />
//                     </span>
//                   </div>

//                 </div>

//                 <div className="formBtns flex flex-col md:flex-row gap-x-3 justify-center items-center 3xl:mt-4 px-4">
//                   <button className="bg-secondMainColor text-white rounded-2xl px-10 py-2 w-full md:w-1/2 text-xl">
//                     {t("PopUps.add")}
//                   </button>
//                   <button
//                     onClick={() => setSingleCoursePopupWindow(false)}
//                     className="bg-transparent text-secondMainColor rounded-2xl px-10 py-2 w-full md:w-1/2 text-xl"
//                   >
//                     {t("homepage.back")}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//         <div
//           onClick={() => setSingleCoursePopupWindow(false)}
//           className="fixed inset-0 bg-black backdrop-blur-[1px] bg-opacity-[0.02]"
//         ></div>
//       </div>
//     </>
//   );
// }
