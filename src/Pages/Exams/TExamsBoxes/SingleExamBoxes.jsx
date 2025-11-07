import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactSVG } from 'react-svg';

import addQuestion from '../../../Assets/sanadSVG/sGrade.svg';
import bank from '../../../Assets/sanadSVG/offline.svg';

import Post from '../../../Components/Skeletons/Post';
import { useLocation } from 'react-router-dom';
import { MainContext } from '../../../Context/MainContext';
import { ApisContext } from '../../../Context/ApisContext';

export default function SingleExamBoxes() {
	const [t] = useTranslation();
	const { setToggler, Toggler } = useContext(MainContext);
	const { fetchCourseQuestions, tens } =
		useContext(ApisContext);

	const { pathname } = useLocation()

	return (
		<div className="flex flex-col xl:flex-row  w-full items-center  gap-mainGap ">
			<>


				{fetchCourseQuestions.isFetched ? (
					<div

						onClick={() => {
							if (pathname.includes("exam")) {
								setToggler({ ...Toggler, addQ: true })
							} else {
								setToggler({ ...Toggler, addQuestionToCourse: true })
							}
						}}
						className="box w-full xl:w-1/3 bg-white rounded-2xl flex p-7 gap-x-4 xl:gap-x-4 justify-center cursor-pointer"
					>
						<>
							<ReactSVG src={addQuestion} />

							<p className=" text-mainColor text-xl  2xl:text-2xl font-bold">
								{t('exam.addQ')}
							</p>
						</>
					</div>
				) : (
					<div className="w-full xl:w-1/3 bg-white rounded-2xl p-3">
						<Post />
					</div>
				)}

				{fetchCourseQuestions.isFetched ? (
					<div className="box w-full xl:w-1/3   bg-gradient-to-bl from-secondMainColor to-blue_light rounded-2xl flex p-4 gap-x-4 xl:gap-x-4 justify-center">
						<>
							<div className="title">
								<p className=" text-white  text-lg  2xl:text-base font-bold">
									{t('exam.totalQ')}
								</p>

								<div className="flex items-center text-nowrap">
									<p className=" text-white text-lg  2xl:text-base font-bold">
										{
											fetchCourseQuestions.data?.metadata?.totalDocs
												? tens.includes(fetchCourseQuestions.data?.metadata?.totalDocs)
													? `${fetchCourseQuestions.data?.metadata?.totalDocs} ${t(
														'exam.questions'
													)}`
													: `${fetchCourseQuestions.data?.metadata?.totalDocs} ${t(
														'exam.question'
													)}`
												: t('homepage.nothing')
										}
									</p>
								</div>
							</div>
						</>
					</div>
				) : (
					<div className="w-full xl:w-1/3 bg-white rounded-2xl p-3">
						<Post />
					</div>
				)}


				{fetchCourseQuestions.isFetched ? <div
					className={`box w-full cursor-pointer  bg-white xl:w-1/3 rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  items-center  `}
					onClick={() => setToggler({ ...Toggler, qbank: true })}
				>
					<ReactSVG src={bank} />
					<p className=" text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
						{t('exam.bank')}
					</p>
				</div> : <div className="w-full xl:w-1/3 bg-white rounded-2xl p-3">
					<Post />
				</div>}




			</>
		</div>
	);
}


