import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MainContext } from '../../Context/MainContext';
import Dashboard from '../../Components/SildeMenu/Dashboard/Dashboard';
import ExitPopUp from '../../Components/PopupWindows/ExitPopUp/ExitPopUp';
import { useTranslation } from 'react-i18next';
import AddAlert from '../../Components/PopupWindows/AddAlert/AddAlert';
import AddCourse from '../../Components/PopupWindows/AddCourse/AddCourse';
import AttendencePopup from '../../Components/PopupWindows/AttendencePopup/AttendencePopup';
import ToggleWindow from '../../Components/SildeMenu/ToggleWindow';
import ConfirmDeleteAssistant from '../../Components/PopupWindows/ConfirmDeletAssistant/ConfirmDeletAssistant';
import OfflineExam from '../../Components/PopupWindows/exams/OfflineExam';
import Qbank from '../../Components/PopupWindows/exams/Qbank';
import OnlineExam from '../../Components/PopupWindows/exams/OnlineExam';
import DeletExam from '../../Components/PopupWindows/exams/DeletExam';
import AddGrade from '../../Components/PopupWindows/exams/AddGrade';
import AddQuestion from '../../Components/PopupWindows/exams/AddQustions';
import ConfirmDeletQ from '../../Components/PopupWindows/exams/ConfirmDeletQ';
import ModifyQ from '../../Components/PopupWindows/exams/ModifyQ';
import AddTopic from '../../Components/PopupWindows/AddTopic/AddTopic';
import PostSession from '../../Components/PopupWindows/exams/PostSession';
import AddCenter from '../../Components/PopupWindows/AddCenter/AddCenter'
import PostAssistants from '../../Components/PopupWindows/AddAssistant/PostAssistants';
import AddAssistantToCourse from '../../Components/PopupWindows/AddAssistant/AddAssistantToCourse';
import AddQuestionToCourse from '../../Components/PopupWindows/exams/AddQuestionToCourse';
import QuestionDetails from '../../Components/PopupWindows/exams/QuestionDetails';
import ConfirmDeletQFromExam from '../../Components/PopupWindows/exams/ConfirmDeletQFromExam';
import AutoExams from '../../Components/PopupWindows/exams/AutoExams';
import OnlineExamQBank from '../../Components/PopupWindows/exams/OnlineExamQBank';
import SessionTopics from '../../Components/PopupWindows/AttendencePopup/SessionTopics';
import ChangePassword from '../../Components/PopupWindows/ChangePassword';
import UploadingFiles from '../../Components/PopupWindows/UploadingFiles';
import Cookies from 'universal-cookie';
import ConfirmRemoveTa from '../../Components/PopupWindows/ConfirmDeletAssistant/ConfirmRemoveTa';
import { ApisContext } from '../../Context/ApisContext';
import ConfirmDeletTopic from '../../Components/PopupWindows/ConfirmDeletTopic';
import OpenAttendance from '../../Components/PopupWindows/AttendencePopup/OpenAttendance';



export default function HomeLayout() {
	const { toggleMenu, setToggleMenu, exitModal, darkMode, direction } =
		useContext(MainContext);
	const { fetchTutorKeyForTa } = useContext(ApisContext)

	function handleOutsideClick() {
		setToggleMenu(false);
	}

	const { i18n } = useTranslation();

	const cachedDirection = localStorage.getItem('direction');
	useEffect(() => {
		if (cachedDirection !== null) {
			if (cachedDirection === 'rtl') {
				i18n.changeLanguage('ar');
			} else {
				i18n.changeLanguage('en');
			}
		}
	}, [cachedDirection]);
	const userDetails = new Cookies().get("userDetails")


	return (
		<div
			dir={cachedDirection}
			className={`bg-[#F9FAFC]  md:bg-bg_mainLayout h-screen flex flex-grow bg-HomePageBgImage bg-cover bg-center bg-no-repeat `}	>
			{toggleMenu ? (
				<div
					onClick={handleOutsideClick}
					className="md:hidden bg-shadow bg-black bg-opacity-50 end-0 top-0 bottom-0 start-0 fixed w-full flex z-[20]"
				></div>
			) : (
				''
			)}

			{/* (userDetails?.tAData === null && userDetails?.role === "3") || (userDetails?.role === "4" && userDetails?.tAData?.totalTutors > 0) &&  */}


			{!(userDetails?.role === "4" && fetchTutorKeyForTa.data?.tAData?.totalTutors <= 0) && <>
				<div className={`w-2/3  md:w-[35%] lg:w-[25%] xl:w-[20%] bg-white h-full  md:h-screen sm:block  fixed md:static z-[20] md:start-0 transition-all ${toggleMenu ? 'start-0' : 'start-full'
					}`}		>
					<Dashboard />
				</div>

			</>}
			<div className={`${!(userDetails?.role === "4" && fetchTutorKeyForTa.data?.tAData?.totalTutors <= 0) && " md:w-[65%] lg:w-[75%] xl:w-[80%]"}  w-full  flex flex-col  gap-5 px-8 py-10 md:bg-bg_mainLayout   ${(userDetails?.role === "4" && fetchTutorKeyForTa.data?.tAData?.totalTutors <= 0) && "md:bg-[#F9FAFC]"}  bg-HomePageBgImage bg-cover bg-center bg-no-repeat relative h-screen  overflow-y-auto scrollbar-thin `}>
				<div className="flex justify-end items-center fixed end-5 md:hidden z-[19]">
					{!(userDetails?.role === "4" && fetchTutorKeyForTa.data?.tAData?.totalTutors <= 0) && <ToggleWindow />}
				</div>
				<Outlet />
			</div>
			<AddCenter />
			<AddCourse />
			<AddAlert />
			<PostAssistants />
			<AttendencePopup />
			<ExitPopUp />
			<ConfirmDeleteAssistant />
			<OfflineExam />
			<Qbank />
			<OnlineExam />
			<DeletExam />
			<AddGrade />
			<AddQuestion />
			<ConfirmDeletQ />
			<ModifyQ />
			{/* <AddAssistant /> */}
			<PostAssistants />
			<AddTopic />
			<AddAssistantToCourse />
			<PostSession />
			<AddQuestionToCourse />
			<QuestionDetails />
			<ConfirmDeletQFromExam />
			<AutoExams />
			<OnlineExamQBank />
			<SessionTopics />
			<ChangePassword />
			<UploadingFiles />
			<ConfirmRemoveTa />
			<ConfirmDeletTopic />
			<OpenAttendance />


		</div>
	);
}
