import React, {
	useContext,

} from 'react';

import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import addExam from '../../../Assets/sanadSVG/sGrade.svg';
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import avatar from '../../../Assets/sanadSVG/courseSmallAvatar.svg';
import dayjs from 'dayjs';
import CourseImage from "../../CourseImage/CourseImage"
export default function DeletExam() {
	let [t, i18n] = useTranslation();


	const cacedSelectedExam = JSON.parse(sessionStorage.getItem("selectedExam"))
	const { Toggler, setToggler } = useContext(MainContext);
	const { selectedExam,
		handleDeletLoading, deletExamAction } = useContext(ApisContext);



	function close() {
		setToggler({ ...Toggler, deletExam: false });
	}



	// console.log(selectedExam)

	function getExamStatus(startTime, endTime) {
		const now = dayjs();
		const start = dayjs(startTime);
		const end = dayjs(endTime);

		if (start.isAfter(now) && end.isAfter(now)) {
			return t("homepage.comming");
		} else if (start.isBefore(now) && end.isAfter(now)) {
			return t("homepage.onProgress");
		} else if (start.isBefore(now) && end.isBefore(now)) {
			return t("homepage.ended");
		} else {
			return t("homepage.nothing");
		}
	}

	function getExamClasses(startTime, endTime) {
		const now = dayjs();
		const start = dayjs(startTime);
		const end = dayjs(endTime);

		if (start.isAfter(now) && end.isAfter(now)) {
			return "bg-bg_orange text-text_orange";
		} else if (start.isBefore(now) && end.isAfter(now)) {
			return "bg-bg_green text-text_green";
		} else if (start.isBefore(now) && end.isBefore(now)) {
			return "text-textColor__2 bg-bg_gray";
		} else {
			return "";
		}
	}

	const selectedE = selectedExam || cacedSelectedExam

	return (

		<>
			<Dialog
				open={Toggler.deletExam}
				as="div"
				className="relative z-30 focus:outline-none"
				onClose={close}
			>
				<div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
					<div className="flex min-h-full b items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-[500px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<button
								className="flex items-center justify-center p-4 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, deletExam: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium  "
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={addExam} />
									<h3 className="text-xl sm:text-2xl font-black text-mainColor">
										{t('exam.confirmDelet')}
									</h3>
									<p className="text-center text-sm  sm:text-base text-textColor__2">
										{selectedE?.title}
									</p>
								</div>
							</DialogTitle>

							<div className="content bg-white p-3 rounded-xl my-3 w-full flex items-center justify-between">
								<div className="course flex items-center gap-x-2">

									<CourseImage courseName={selectedE?.courseData?.name} w={22} h={22} />
									<div>
										<h6 className="text-mainColor text-sm   font-semibold ">
											{selectedE?.courseData?.name}

										</h6>
										<p className=" text-textGray text-xs   font-semibold">
											{i18n.language === "ar" ? selectedE?.courseData?.grade?.nameAr : selectedE?.courseData?.grade?.nameEn}

										</p>
									</div>
								</div>

								<span className={`${getExamClasses(selectedE?.startTime, selectedE?.endTime)} text-xs px-3 py-1  rounded-lg `}>
									{getExamStatus(selectedE?.startTime, selectedE?.endTime)}
								</span>

								<p className="p-1 text-xs  text-textColor__2 rounded-lg sm:p-2 sm:text-sm">
									{selectedE?.type === "online" ? t("exam.Online") : selectedE?.type === "offline" && t("exam.Offline")}
								</p>
							</div>

							<div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
								<button
									disabled={!selectedE}
									onClick={() => deletExamAction()}
									type="submit"
									className={`text-white bg-mainColor  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
								>


									{handleDeletLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
									></div> : t('exam.confirm')}
								</button>
								<button
									type="button"
									onClick={() => {
										setToggler((prev) => {
											return { ...prev, deletExam: false };
										});
									}}
									className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg"
								>
									{t('homepage.back')}
								</button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
