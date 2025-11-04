import { useContext, useEffect, useMemo, useState } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import { BASE_URL } from "../../Soursre"
import { ApisContext } from "../../Context/ApisContext"
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import axios from 'axios';
import { MainContext } from '../../Context/MainContext';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';


const MultipartUpload = ({ onUploadSuccess }) => {
	const [t] = useTranslation()
	const { showBoundary } = useErrorBoundary()

	const { selectedType, ErorrMessage, sethandleAddedFile, session, } = useContext(MainContext)

	const { headers, userDetails, fetchCoure } = useContext(ApisContext)
	const [currentSessionId, setCurrentSessionId] = useState(() => {
		if (session) {
			return session?._id
		} else {
			return ""
		}
	});
	const [isUploading, setIsUploading] = useState(() => sessionStorage.getItem('isUploading') === 'true');

	const cachedSelectedType = JSON.parse(sessionStorage.getItem("accessLevel"));




	useEffect(() => {
		console.log(selectedType.value)


	}, [selectedType])
	const fetchUploadApiEndpoint = async (endpoint, file, props) => {

		let requestPayload = { ...props, contentType: file.type, accessLevel: selectedType.value, };
		// setrequestPayload({ ...props, contentType: file.type, accessLevel: selectedType.value })
		delete requestPayload['signal'];
		delete requestPayload['body'];

		let requestEndpoint = `${BASE_URL}upload/multipart/${endpoint}`;
		if (endpoint === 'complete') {

			requestPayload = {
				...requestPayload,
				title: file.name,
				session: session?._id,
				accessLevel: selectedType.value,
				size: file.size,
				tutorCode: userDetails?.code,
			};

			// setrequestPayload({
			// 	...requestPayload,
			// 	title: file.name,
			// 	session: session?._id,
			// 	accessLevel: selectedType.value,
			// 	size: file.size,
			// 	tutorCode: userDetails?.code,
			// })


			requestEndpoint = `${BASE_URL}tutors/upload/multipart/${endpoint}`;

		}
		if (endpoint === '') {

			requestEndpoint = `${BASE_URL}tutors/upload/multipart/${endpoint}`;

		}

		try {

			requestPayload = {
				...requestPayload,
				accessLevel: selectedType.value
			}


			const res = await axios.post(requestEndpoint, requestPayload, { headers: headers });



			if (res.status === 200 || res.data?.status === "success") {

				console.log(requestPayload)
				return res.data;

			}

		} catch (error) {
			console.log(requestPayload)
			// showBoundary(error)
			console.log(error)

		}
	};




	const saveUppyState = (uppy) => {
		const state = uppy.getState();
		sessionStorage.setItem('uppyState', JSON.stringify(state));
		sessionStorage.setItem('uppySessionId', currentSessionId);
		sessionStorage.setItem('isUploading', isUploading);

	};

	const loadUppyState = () => {
		const state = sessionStorage.getItem('uppyState');
		return state ? JSON.parse(state) : null;
	};


	const uppy = useMemo(() => {

		const previousSessionId = sessionStorage.getItem('uppySessionId');
		if (previousSessionId !== session?._id) {
			sessionStorage.removeItem('uppyState');
			sessionStorage.removeItem('isUploading');

		}


		const uppy = new Uppy({
			autoProceed: false,

		})
			// .use(ThumbnailGenerator)
			// .use(StatusBar)
			// .use(Informer)
			.use(AwsS3Multipart, {
				createMultipartUpload: async (file) => {
					const contentType = file.type;

					return fetchUploadApiEndpoint('', file, {
						fileName: file.name,
						tutorCode: userDetails?.code,
						sessionName: session?.name,
						courseName: fetchCoure.data?.courseData?.name,
						contentType: contentType,
						accessLevel: selectedType.value
					});



				},
				listParts: (file, props) =>
					fetchUploadApiEndpoint('parts/list', file, props),
				signPart: (file, props) =>
					fetchUploadApiEndpoint('parts/sign', file, props),
				abortMultipartUpload: (file, props) =>
					fetchUploadApiEndpoint('abort', file, props),
				completeMultipartUpload: (file, props) =>
					fetchUploadApiEndpoint('complete', file, props),

			});

		const savedState = loadUppyState();
		if (savedState) {
			uppy.setState(savedState);

		}


		uppy.on('upload-progress', () => saveUppyState(uppy));

		uppy.on('complete', (result) => {
			sessionStorage.removeItem('uppyState');
			sessionStorage.removeItem('isUploading');
			onUploadSuccess(result);

			ErorrMessage(t("Errors.handleUpload"), "success")
			sethandleAddedFile(prev => !prev)

		});

		return uppy;
	}, [session?._id]);




	// Effect to update current session ID and handle Uppy state on session change
	useEffect(() => {
		setCurrentSessionId(session?._id);
		if (isUploading) {
			uppy.updateAll(); // Update all files in the queue
			uppy.resumeAll(); // Resume uploads if paused
			uppy.resetProgress(); // Reset progress bars
			uppy.retryAll(); // Retry failed uploads
		}
		return () => {
			saveUppyState(uppy); // Save Uppy state on component unmount
			// Remove event listeners to prevent memory leaks
			uppy.off('upload-progress', () => saveUppyState(uppy));
			uppy.off('complete', (result) => {
				sessionStorage.removeItem('uppyState');
				sessionStorage.removeItem('isUploading');
				onUploadSuccess(result);
				ErorrMessage(t("Errors.handleUpload"), "success");
			});
			uppy.close(); // Close Uppy instance
		};
	}, [session?._id, uppy]);

	// On component mount, resume uploads if previously in progress
	useEffect(() => {
		if (isUploading) {
			uppy.resumeAll();
		}
	}, []);




	return <Dashboard className='shadow-md' uppy={uppy} proudlyDisplayPoweredByUppy={false} />;
};
export default MultipartUpload;
