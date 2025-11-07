import React, {
	useContext,
	useEffect,

} from 'react';

import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MainContext } from '../../../Context/MainContext';
import x from '../../../Assets/sanadSVG/Multiply.svg';
import addExam from '../../../Assets/sanadSVG/sGrade.svg';
import * as Yup from 'yup'
import { ReactSVG } from 'react-svg';
import { ApisContext } from '../../../Context/ApisContext';
import { useFormik } from 'formik';
export default function AddGrade() {
	let [t] = useTranslation();

	const { Toggler, setToggler, selectedStudent } = useContext(MainContext);
	// const { leftArrow } = useContext(SvgsContext);
	const { addGrade,
		addGradeLoading
		, isValidInput } = useContext(ApisContext);




	const formik = useFormik({
		initialValues: {
			grade: "",
			cardCode: selectedStudent?.cardCode
		},
		validationSchema: Yup.object({
			grade: Yup.number().required().integer(),
			cardCode: Yup.string()
				.matches(/^[0-9]{7}$/, 'Card Code must be exactly 7 digits')
				.required('Card Code is required')
		}),
		onSubmit: async (values, { resetForm }) => {

			addGrade(values, resetForm)
		}
	})

	useEffect(() => {
		if (Toggler.adddGrade === false) {
			formik.resetForm()

		}

		formik.setFieldValue("cardCode", selectedStudent?.cardCode)
	}, [Toggler.adddGrade])

	function close() {
		setToggler({ ...Toggler, adddGrade: false });
		formik.resetForm()
	}




	return (
		<>
			<Dialog
				open={Toggler.adddGrade}
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
								onClick={() => setToggler({ ...Toggler, adddGrade: false })}
							>
								<ReactSVG src={x} />
							</button>
							<DialogTitle
								as="h3"
								className="text-base/7 font-medium text-mainColor"
							>
								<div className="flex flex-col items-center justify-between rounded-t gap-y-1">
									<ReactSVG src={addExam} />
									<h3 className="text-xl sm:text-2xl font-black text-[#023E8A]">
										{t('exam.addGrade')}
									</h3>
								</div>
							</DialogTitle>

							<form onSubmit={formik.handleSubmit} action="" className="my-2">
								<div className="row grade w-full flex flex-col sm:flex-row items-center justify-between gap-x-4 ">
									{/* <div className="studentCode flex flex-col w-full sm:w-2/3 gap-y-1">
										<label
											htmlFor="cardCode"
											className="text-sm text-mainColor font-semibold"
										>
											{t('exam.studentCode')}
										</label>
										<input
											className={`bg-white rounded-xl ${isValidInput(formik.errors?.cardCode, formik.touched?.cardCode)} px-4 py-3 shadow-sm text-sm text-mainColor font-bold placeholder:text-textGray focus:border-none focus:outline-none`}
											placeholder={t('exam.studentCode')}
											type="string"
											value={formik.values.cardCode}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											id='cardCode'
											name='cardCode'
										/>
									</div> */}


									<div className="grade flex flex-col w-full  gap-y-1">
										<label
											htmlFor="grade"
											className="text-sm text-mainColor font-semibold"
										>
											{t('exam.grade')}
										</label>
										<input
											className={`bg-white rounded-xl ${isValidInput(formik.errors?.grade, formik.touched?.grade)} px-4 py-3  shadow-sm text-sm text-mainColor font-bold placeholder:text-textGray focus:border-none focus:outline-none`}
											placeholder={t('exam.grade')}
											type="number"
											value={formik.values.grade}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											id='grade'
											name='grade'
										/>
									</div>
								</div>
								<div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
									<button
										disabled={!(formik.isValid && formik.dirty)}
										type="submit"
										className={`text-white ${!(formik.isValid && formik.dirty) ? "bg-secondMainColor" : "bg-mainColor"}  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
									>
										{
											addGradeLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
											></div> : t('homepage.adding')}
									</button>
									<button
										type="button"
										onClick={() => {
											setToggler((prev) => {
												return { ...prev, adddGrade: false };
											});
										}}
										className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg"
									>
										{t('homepage.back')}
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
