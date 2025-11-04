import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ApisContext } from '../../../Context/ApisContext';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import profile from '../../../Assets/sanadSVG/imgUser.svg';
import { ReactSVG } from 'react-svg';
// import Post from "../../Skeletons/Post";
import { MainContext } from '../../../Context/MainContext';
import Post from '../../Skeletons/Post';
import { SvgsContext } from '../../../Context/SvgsContext';
import { BASUE_IMAGES } from '../../../Soursre';

export default function ProfileFrame() {
	const { Role } = useContext(ApisContext)

	const {
		toggleNotifications,

		setToggleMenu,
	} = useContext(MainContext);
	const [t] = useTranslation();
	const cookie = new Cookies();
	const userDetails = cookie.get('userDetails');
	const { bell } = useContext(SvgsContext);

	// console.log(userDetails)
	return (
		<div className="profile flex items-center px-3  py-1  justify-between border-y-2 border-borderMainColor  border-solid w-full mt-3 mb-2">
			{!userDetails ? (
				<Post />
			) : (
				<>
					<Link to={"/settings"} className="imageCard flex   w-full">
						<div className="image me-3">



							{userDetails?.profileImage !== "" ?
								<span className=''>
									<img className='w-[40px] h-[40px] overflow-hidden rounded-full' src={`${BASUE_IMAGES}${userDetails?.profileImage}`} alt="profileImage" />
								</span>

								: <ReactSVG src={profile} />}

						</div>

						<div>
							<p className="text-mainColor text-sm font-bold">
								{userDetails?.fullname?.split(" ")?.slice(0, 2)?.join(" ")}
							</p>

							{Role === 4 ? (
								<p className="text-gray-500 text-size_12 font-semibold">
									{/* {t("homepage.teacher")} */}

									{t('homepage.assistant')}
								</p>
							) : (
								Role === 3 && (
									<p className="text-gray-500 text-size_12 font-semibold">
										{/* {t("homepage.teacher")} */}

										{t('homepage.teacher')}
									</p>
								)
							)}
						</div>
					</Link>
				</>
			)}


			{/* {Role === 3 && <Link to={"/requests"} className={`rang cursor-pointer relative ${toggleNotifications ? "bg-mainColor" : "bg-white"}  w-8 h-8 rounded-xl border-2 border-rangColorGray border-solid flex justify-center items-center`}
				onClick={() => {
					sessionStorage.setItem("toggleNotify", JSON.stringify(true))
					setToggleMenu(prev => !prev)
				}}
			>
				{toggleNotifications ? bell("#FFFFFF") : bell()}
			</Link>} */}



		</div>
	);
}
