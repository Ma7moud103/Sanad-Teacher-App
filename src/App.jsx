import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import HomePage from './Pages/HomePage/HomePage';
// const HomePage = lazy(()=>import("./Pages/HomePage/HomePage"))

import Courses from './Pages/Courses/Courses';
import AssistantCourses from './Pages/AssistantCourses/AssistantCourses';
import SingleCourse from './Pages/SingleCourse/SingleCourse';
import Exams from './Pages/Exams/Exams';
import Assistants from './Pages/Assistants/Assistants';
import { Offline } from 'react-detect-offline';
import SignUp from './Layouts/Register/SignUp';
import MainContextProvider from './Context/MainContext';
import Login from './Layouts/Login/Login';
import VerificationCode from './Layouts/VerificationCode/VerificationCode';
import UserRoute from './Components/UserAuth/UserRoute/UserRoute';
import ForgetPass from './Layouts/ForgetPass/ForgetPass';
import ReEnterPass from './Layouts/ReEnterPass/ReEnterPass';
import { useTranslation } from 'react-i18next';

import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ApisContextProvider from './Context/ApisContext';
import HomeLayout from './Layouts/HomeLayout/HomeLayout';
import SvgsContextProvidor from './Context/SvgsContext';
import { ToastContainer, toast } from 'react-toastify';
import ExamsLayout from './Pages/ExamsLayout/ExamsLayout';
import Requests from './Pages/Requests/Requests';
import ErrorFallback from './Components/ErrorBoundry/MainErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary';
import SingleExamLayout from './Pages/Exams/SingleExamLayout';
import Setting from './Pages/Setting';
import StudentsOfflineExam from './Pages/Exams/StudentsOfflineExam';
import Alerts from './Pages/Alerts';
import PreventWithoutKey from './PreventWithoutKey';
import SingleExam from './Pages/Exams/SingleExam';

export default function App() {
	const [t] = useTranslation();

	const routes = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="signup" element={<ProtectedRoutes><SignUp /></ProtectedRoutes>} />
				<Route path="login" element={<ProtectedRoutes><Login /></ProtectedRoutes>} />
				<Route path="verify" element={<ProtectedRoutes><VerificationCode /></ProtectedRoutes>} />
				<Route path="forget-password" element={<ProtectedRoutes><ForgetPass /></ProtectedRoutes>} />
				<Route path="forgot-password" element={<ProtectedRoutes><ReEnterPass /></ProtectedRoutes>} />
				<Route
					path=""
					element={
						<UserRoute>

							<ErrorBoundary
								onError={() => console.log("error happen")}
								FallbackComponent={ErrorFallback}>
								<ApisContextProvider>
									<HomeLayout />


								</ApisContextProvider>
							</ErrorBoundary>
						</UserRoute>
					}
					errorElement={<ErrorFallback />}

				>
					<Route index element={<PreventWithoutKey><HomePage /></PreventWithoutKey>} />
					<Route path="courses" element={<PreventWithoutKey><Courses /></PreventWithoutKey>}>
						<Route index element={<PreventWithoutKey><AssistantCourses /></PreventWithoutKey>} />
						<Route path=":id" element={<PreventWithoutKey><SingleCourse /></PreventWithoutKey>} />
						<Route path=":id/:examId" element={<PreventWithoutKey><SingleExamLayout /></PreventWithoutKey>} />
						<Route path=":id/:examId/students" element={<PreventWithoutKey><StudentsOfflineExam /></PreventWithoutKey>} />

					</Route>
					<Route path="courses/:id/bank" element={<PreventWithoutKey><SingleExam /></PreventWithoutKey>} />

					<Route path="exams" element={<PreventWithoutKey><ExamsLayout /></PreventWithoutKey>}>
						<Route index element={<PreventWithoutKey><Exams /></PreventWithoutKey>} />
						<Route path=":examId" element={<PreventWithoutKey><SingleExamLayout /></PreventWithoutKey>} />
						<Route path=":examId/students" element={<PreventWithoutKey><StudentsOfflineExam /></PreventWithoutKey>} />

					</Route>
					{/* <Route path="questionbank" element={<QuestionBank />} /> */}
					<Route path="assistants" element={<PreventWithoutKey><Assistants /></PreventWithoutKey>} />
					{/* <Route path="archive" element={<TaskArchive />} /> */}
					{/* <Route path="requests" element={<PreventWithoutKey><Requests /></PreventWithoutKey>} /> */}
					<Route path="settings" element={<PreventWithoutKey><Setting /></PreventWithoutKey>} />
					<Route path="announcements" element={<PreventWithoutKey><Alerts /></PreventWithoutKey>} />
				</Route>
				{/* <Route path="*" element={<Mainer />} /> */}
			</>
		)

	);


	return (
		<>
			<Offline>
				<span className="  fixed bottom-0 end-0 sm:bottom-10 sm:end-10 sm:text-lg rounded-xl bg-err text-white p-2 capitalize text-center z-[60] w-full sm:w-auto text-nowrap duration-700">
					{t('Errors.network')}
				</span>
			</Offline>
			<MainContextProvider>
				<SvgsContextProvidor>
					<div className="App">
						<ToastContainer
							position="top-center"
							autoClose={5000}
							limit={3}
							hideProgressBar
							newestOnTop
							closeOnClick
							rtl
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
						/>
						<RouterProvider router={routes} />
					</div>
				</SvgsContextProvidor>
			</MainContextProvider>
		</>
	);
}
