import React from 'react';

import { useContext } from 'react';
import { MainContext } from '../../../Context/MainContext';

import { ApisContext } from '../../../Context/ApisContext';
import offLine from '../../../Assets/sanadSVG/offline.svg';
import onLine from '../../../Assets/sanadSVG/online.svg';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';
import Post from '../../../Components/Skeletons/Post';

export default function TExamsBoxes() {
	const {

		Toggler,
		setToggler,
	} = useContext(MainContext);

	const { fetchAllCenters, tens, fetchAllExams } = useContext(ApisContext);

	// onClick={() => setToggler({ ...Toggler, offline: true })}
	let { t } = useTranslation();
	return (
		<div className="w-full flex flex-col lg:flex-row gap-x-6 gap-y-4 justify-between">


			{fetchAllExams.isFetched ? <div
				className={`box w-full lg:w-1/2 rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  items-center  bg-gradient-to-bl from-secondMainColor to-blue_light`}

			>

				<ReactSVG src={offLine} />

				<div className="title text-nowrap">
					<p className=" text-white text-lg  font-bold">
						{t('exam.examsNum')}
					</p>
					<p className=" text-white  font-bold">
						{fetchAllExams.data?.metadata?.totalDocs > 0 ? tens.includes(fetchAllExams?.data?.metadata?.totalDocs)
							? `${fetchAllExams?.data?.metadata?.totalDocs} ${t('exam.exams')}`
							: `${fetchAllExams?.data?.metadata?.totalDocs} ${t('exam.exam')}` : t("homepage.nothing")}
					</p>
				</div>

			</div> :
				<div className={`box w-full lg:w-1/2 rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center  items-center  bg-white`}>
					<Post />
				</div>
			}



			<div
				className={`box w-full cursor-pointer lg:w-1/2 bg-white   items-center rounded-2xl flex p-4 gap-x-4 sm:gap-x-4 justify-center`}
				onClick={() => setToggler({ ...Toggler, online: true })}
			>
				{!fetchAllCenters ? (
					<>
						<ReactSVG src={onLine} />

						<div className="title text-nowrap">
							<p className=" text-mainColor text-lg  font-bold">
								{t('exam.addExam')}
							</p>
						</div>
					</>
				) : (
					<Post />
				)}
			</div>
		</div>
	);
}
