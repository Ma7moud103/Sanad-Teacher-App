import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import courses from '../../Assets/sanadSVG/courses.svg';
import teachers from '../../Assets/sanadSVG/teachers.svg';
import { MainContext } from '../../Context/MainContext';
import { ApisContext } from '../../Context/ApisContext';
import Post from '../../Components/Skeletons/Post';
import addCourseI from '../../Assets/sanadSVG/addGroup.svg';
import addGroup from '../../Assets/sanadSVG/addGroup.svg';

export default function CoursesBoxes() {
	const [t] = useTranslation();
	const { setToggler, Toggler } = useContext(MainContext);
	const { userDetails, tens, Role, fetchTutorCourse, fetchTutorKeyForTa } = useContext(ApisContext);

	return (
		<div className={`flex flex-col ${Role === 4 ? "sm:flex-row " : "xl:flex-row "} w-full items-center  gap-mainGap`}>
			{Role === 3 && (
				<>
					<div
						className={`box w-full xl:w-1/3 bg-white cursor-pointer rounded-2xl flex items-center p-4 gap-x-4 sm:gap-x-4 justify-center`}
						onClick={() => setToggler({ ...Toggler, addCourse: true })}
					>
						{fetchTutorKeyForTa.isFetched ? (
							<>
								<ReactSVG src={addCourseI} />

								<div className="title">
									<p className=" text-mainColor text-xl  sm:text-2xl  2xl:text-xl font-bold">
										{t('TCourses.addCourse')}
									</p>
								</div>
							</>
						) : (
							<Post />
						)}
					</div>

					{fetchTutorCourse.isFetched ? <>
						<div
							className={`box w-full xl:w-1/3 rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  bg-gradient-to-bl from-secondMainColor to-blue_light`}
						>
							<ReactSVG src={courses} />

							<div className="title text-nowrap">
								<p className=" text-white text-size__20 xl:text-base 2xl:text-lg font-bold">
									{t('homepage.activeCoursesNum')}
								</p>
								<div className="text-white text-lg xl:text-size__14 2xl:text-base font-bold">
									{fetchTutorCourse.data?.length > 0
										? tens.includes(fetchTutorCourse.data?.length)
											? `${fetchTutorCourse.data?.length} ${t(
												'homepage.courses'
											)}`
											: `${fetchTutorCourse.data?.length} ${t(
												'homepage.course'
											)}`
										: t('homepage.nothing')}
								</div>
							</div>
						</div>
					</> : <div className='box w-full xl:w-1/3 rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  bg-white'>
						<Post />
					</div>
					}




					{
						fetchTutorKeyForTa.isFetched ? <div className="box w-full xl:w-1/3 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center">

							<ReactSVG src={teachers} />
							<div className="title text-nowrap">
								<p className=" text-textGray text-lg xl:text-size__14 2xl:text-base font-bold">
									{t('homeBoxes.st')}
								</p>
								<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
									{fetchTutorKeyForTa.data?.tutorData?.totalStudents > 0
										? tens.includes(fetchTutorKeyForTa.data?.tutorData?.totalStudents)
											? `${fetchTutorKeyForTa.data?.tutorData?.totalStudents} ${t(
												'SingleCourse.students'
											)}`
											: `${fetchTutorKeyForTa.data?.tutorData?.totalStudents} ${t(
												'SingleCourse.student'
											)}`
										: t('homepage.nothing')}
								</p>
							</div>

						</div>
							: <div className="w-full p-3 xl:w-1/3 bg-white rounded-2xl">
								<Post />
							</div>

					}




				</>
			)}

			{/* <div className={`box w-full xl:w-1/3 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center`}><Post /></div> */}

			{Role === 4 && (
				<>
					<div
						className={`box w-full sm:w-1/2 bg-white rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center`}
					>
						{fetchTutorKeyForTa.isFetched ? (
							<>
								<ReactSVG src={teachers} />

								<div className="title text-nowrap">
									<p className=" text-textGray text-lg xl:text-size__14 2xl:text-base font-bold">
										{t('homepage.teacherNum')}
									</p>
									<p className="text-mainColor text-size__20 xl:text-base 2xl:text-lg font-bold">
										{fetchTutorKeyForTa.data?.totalTutors > 0
											? tens.includes(fetchTutorKeyForTa.data?.totalTutors)
												? `${fetchTutorKeyForTa.data?.totalTutors}${t(
													'homepage.teachers'
												)}`
												: `${fetchTutorKeyForTa.data?.totalTutors}${t(
													'homepage.teacher'
												)}`
											: t('homepage.nothing')}
									</p>
								</div>
							</>
						) : (
							<Post />
						)}
					</div>


					{fetchTutorCourse.isFetched ? <>
						<div
							className={`box w-full sm:w-1/2 rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  bg-gradient-to-bl from-secondMainColor to-blue_light`}
						>
							<ReactSVG src={courses} />

							<div className="title text-nowrap">
								<p className=" text-white text-size__20 xl:text-base 2xl:text-lg font-bold">
									{t('homepage.activeCoursesNum')}
								</p>
								<div className="text-white text-lg xl:text-size__14 2xl:text-base font-bold">
									{fetchTutorCourse.data?.length > 0
										? tens.includes(fetchTutorCourse.data?.length)
											? `${fetchTutorCourse.data?.length} ${t(
												'homepage.courses'
											)}`
											: `${fetchTutorCourse.data?.length} ${t('homepage.course')}`
										: t('homepage.nothing')}
								</div>
							</div>
						</div>
					</> : <div className={`box w-full sm:w-1/2 rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center   bg-white`}><Post /></div>}




					{/* <div
						className={`box w-full cursor-pointer xl:w-1/3 bg-white   items-center rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center`}
						onClick={() => setToggler({ ...Toggler, addAlert: true })}
					>
						{userDetails ? (
							<>
								<ReactSVG src={alert} />

								<div className="title text-nowrap">
									<p className=" text-mainColor text-lg  font-bold">
										{t('homepage.add')} {t('homepage.alert')}
									</p>
								</div>
							</>
						) : (
							<Post />
						)}
					</div> */}
				</>
			)}
		</div>
	);
}
