import React, {
	useContext,

} from 'react';

import { useTranslation } from 'react-i18next';
// import icon8 from "../../../../Assets/textareaIcons/Polygon 2.png"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Cookies from 'universal-cookie';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import warning from '../../../Assets/sanadSVG/confirmDelet.svg';

import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import { SvgsContext } from '../../../Context/SvgsContext';
import { useNavigate } from 'react-router-dom';
export default function ConfirmDeletQ() {
	let [t] = useTranslation();

	const { Toggler, setToggler } = useContext(MainContext);
	const { MainToken, detailsUser } =
		useContext(ApisContext);

	const navigate = useNavigate();

	function close() {
		setToggler({ ...Toggler, exit: false });
	}

	return (
		<>
			<Dialog
				open={Toggler.exit}
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
								className="flex items-center justify-center p-3 bg-white rounded-full"
								onClick={() => setToggler({ ...Toggler, exit: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={warning} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('ExitPopup.logOut')}
									</h3>
									<p className="font-normal text-lg">
										{t('ExitPopup.confirmLogout')}
									</p>
								</div>
							</DialogTitle>
							{/* content */}

							<div className="formBtns mt-2  flex flex-row gap-x-3 justify-center items-center">
								<button
									// disabled={!(formik.isValid && formik.dirty)}
									type="submit"
									className={`text-white bg-mainColor  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
									onClick={() => {
										let cookie = new Cookies();

										// cookie.set('userToken', MainToken, {
										// 	path: '/homepage',
										// 	expires: new Date('Sat Dec 30 2000'),
										// });
										// cookie.set('userToken', MainToken, {
										// 	path: '/',
										// 	expires: new Date('Sat Dec 30 2000'),
										// });
										// cookie.set('userDetails', detailsUser, {
										// 	path: '/homepage',
										// 	expires: new Date('Sat Dec 30 2000'),
										// });
										// cookie.set('userDetails', detailsUser, {
										// 	path: '/',
										// 	expires: new Date('Sat Dec 30 2002 '),
										// });

										setToggler((prev) => ({ ...prev, exit: !prev.exit }));
										sessionStorage.clear()
										localStorage.clear()
										cookie.remove("userDetails")
										cookie.remove("userToken")
										navigate('/login');

									}}
								>
									{t('exam.confirm')}
								</button>
								<button
									type="button"
									onClick={() => {
										setToggler((prev) => {
											return { ...prev, exit: false };
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


