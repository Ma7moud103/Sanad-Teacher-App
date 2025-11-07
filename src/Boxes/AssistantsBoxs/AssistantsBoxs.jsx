import React from 'react';
import icon from '../../Assets/sanadSVG/students.svg';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { MainContext } from '../../Context/MainContext';
import { ApisContext } from '../../Context/ApisContext';
import { ReactSVG } from 'react-svg';
import teachers from '../../Assets/sanadSVG/teachers.svg';
import Post from '../../Components/Skeletons/Post';
export default function AssistantsBoxs() {
	let [t] = useTranslation();
	const { Toggler, setToggler } = useContext(MainContext);
	const { tens, fetchTutorKeyForTa } =
		useContext(ApisContext);


	return (
		<div className="flex flex-col justify-between w-full xl:flex-row gap-x-6 gap-y-4">

			{fetchTutorKeyForTa.isFetched ? <div

				onClick={() => setToggler({ ...Toggler, addAssistant: true })}
				className="flex items-center justify-center w-full p-4 bg-white shadow-md cursor-pointer box xl:shadow-none xl:w-1/2 gap-x-3 rounded-2xl 2xl:p-3 2xl:gap-x-4"
			>
				<div className="flex items-center justify-center ">
					<ReactSVG src={icon} />
				</div>
				<div className="flex flex-col items-center justify-center 2xl:items-start gap-y-2">
					<p className="text-xl font-extrabold sm:text-2xl text-mainColor">
						{t('homepage.add')} {t('homepage.assistant')}
					</p>
				</div>
			</div> : <div className="flex items-center justify-center w-full p-3 bg-white xl:w-1/2 rounded-2xl">
				<Post />
			</div>}

			{fetchTutorKeyForTa.isFetched ?
				<div className="box shadow-md xl:shadow-none w-full xl:w-1/2 flex items-center justify-center gap-x-3   bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC]  rounded-2xl p-4  2xl:gap-x-4">
					<div className="flex items-center justify-center ">
						{/* <span className="flex items-center justify-center w-16 h-16 p-2 rounded-full">
						<img className="w-8" src={icon1} alt="" />
					</span> */}
						<ReactSVG src={icon} />
					</div>
					<div className="flex flex-col items-center justify-center 2xl:items-start gap-y-2">
						<p className="text-xl text-white">{t('homepage.assistantNum')}</p>
						<p className="text-xl font-extrabold text-white ">
							{/* {userDetails.tutorData.totalTAs} {t("homepage.assistants")} */}

							{fetchTutorKeyForTa.data?.tutorData?.totalTAs > 0
								? tens.includes(fetchTutorKeyForTa.data?.tutorData?.totalTAs)
									? `${fetchTutorKeyForTa.data?.tutorData?.totalTAs} ${t('homepage.assistants')}`
									: `${fetchTutorKeyForTa.data?.tutorData?.totalTAs} ${t('homepage.assistant')}`
								: t('homepage.nothing')}

							{ }
						</p>
					</div>
				</div>
				:

				<div className="flex items-center justify-center w-full p-3 bg-white xl:w-1/2 rounded-2xl">
					<Post />
				</div>
			}

			{/* {fetchTutorKeyForTa.isFetched ? (
				<div className="flex justify-center w-full p-4 bg-white box xl:w-1/3 rounded-2xl gap-x-4 sm:gap-x-4">
					<>
						<ReactSVG src={teachers} />

						<div className="title text-nowrap">
							<p className="text-xl font-bold text-textGray">
								{t('homepage.centersNum')}
							</p>
							<p className="text-xl font-bold text-mainColor">
								{fetchTutorKeyForTa.data?.tutorData?.totalCenters > 0
									? tens.includes(fetchTutorKeyForTa.data?.tutorData?.totalCenters)
										? `${fetchTutorKeyForTa.data?.tutorData?.totalCenters} ${t(
											'homepage.centerss'
										)}`
										: `${fetchTutorKeyForTa.data?.tutorData?.totalCenters} ${t(
											'homepage.centers'
										)}`
									: t('homepage.nothing')}
							</p>
						</div>
					</>
				</div>
			) : (
				<div className="flex items-center justify-center w-full p-3 bg-white xl:w-1/3 rounded-2xl">
					<Post />
				</div>
			)} */}
		</div>
	);
}
