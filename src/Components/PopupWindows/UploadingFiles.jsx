import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { MainContext } from '../../Context/MainContext'
import { ReactSVG } from 'react-svg'
import { useTranslation } from 'react-i18next'
import x from "../../Assets/sanadSVG/Multiply.svg"
import MultipartUpload from './MutlipartUpload[1]'
import arrow from "../../Assets/sanadSVG/downArrow.svg"
import { useErrorBoundary } from 'react-error-boundary'
import axios from 'axios'
import { BASE_URL } from '../../Soursre'
import { ApisContext } from '../../Context/ApisContext'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import pdf from "../../Assets/sanadSVG/pdf.svg"
import youtupe from "../../Assets/sanadSVG/youtube.svg"
import vedio from "../../Assets/sanadSVG/vedio.svg"
import image from "../../Assets/sanadSVG/imgIcon.svg"
import docs from "../../Assets/sanadSVG/docs.svg"
import * as Yup from "yup"
import del from "../../Assets/sanadSVG/delet.svg"
import SmallPosts from '../Skeletons/SmallPosts'
import { useFormik } from 'formik'

function UploadingFiles() {
    const { showBoundary } = useErrorBoundary();

    const [t] = useTranslation()
    const { Toggler, setToggler, selectedType, Types,
        setselectedType, session, ErorrMessage,
        handleAddedFile, selectedLinkType, setselectedLinkType, toggleUploadType, settoggleUploadType } = useContext(MainContext)

    const { headers, isValidInput } = useContext(ApisContext)

    const { id } = useParams()


    function close() {
        setToggler({ ...Toggler, upload: false })
    }

    const handleUploadSuccess = (result) => {

        if (result?.successful?.length > 0) {
            // ErorrMessage(t("Errors.handleUpload"), "success")

        } else if (result?.failed?.length > 0) {
            ErorrMessage(t("Errors.main"), "error")
        }


    };


    const [ActiveClass, setActiveClass] = useState(1);

    const [toggleDropDown, setToggleDropDown] = useState(false);

    function handleActiveClass(index) {
        setActiveClass(index);
        if (index == 2) {
            setToggleDropDown((open) => !open);
        } else {
            setToggleDropDown((open) => !open);
        }
    }




    const getResourses = async (id, sessionId) => {
        try {
            const res = await axios.get(`${BASE_URL}tutor-courses/${id}/sessions/${sessionId}/resources?limit=-1`, { headers: headers })

            if (res.status === 200 || res.data.status === "success") {
                return res.data
            }

        } catch (error) {
            console.log(error)
            showBoundary(error)
        }

    }

    const [handleDelet, sethandleDelet] = useState(false)
    const [deletLoading, setdeletLoading] = useState(false)
    const [linkLoading, setlinkLoading] = useState(false)
    const [handleAddLink, sethandleAddLink] = useState(false)

    const deletContent = async (itemId) => {
        if (itemId && id && session) {
            try {
                setdeletLoading(true)
                // /tutor-courses/{tutorCourseId}/sessions/{sessionId}/resources/{resourceId}
                const res = await axios.delete(`${BASE_URL}tutor-courses/${id}/sessions/${session?._id}/resources/${itemId}`, { headers: headers })

                if (res.status === 204) {
                    ErorrMessage(t("Errors.handleDeletContent"), "success")
                    sethandleDelet(pre => !pre)
                }

            } catch (error) {
                ErorrMessage(t("Errors.main"), "error")


            } finally {
                setdeletLoading(false)
            }
        }
    }


    const addLink = async (values, reset) => {
        try {

            setlinkLoading(true)


            const res = await axios.post(`${BASE_URL}/tutor-courses/${id}/sessions/${session?._id}/resources`, values, { headers: headers })


            if (res.status === 201 || res.data.status === "success") {
                ErorrMessage(t("Errors.addLink"), "success")
                sethandleAddLink(prev => !prev)
                reset()
            }



        } catch (error) {
            ErorrMessage(t("Errors.main"), "error")

        } finally {
            setlinkLoading(false)
        }
    }


    const validationSchema = Yup.object({
        title: Yup.string().required(t("homepage.requiredField")),
        linkData: Yup.object({
            url: Yup.string().matches(/^(https?):\/\/[^\s/$.?#].[^\s]*$/, t("homepage.link")).required(t("homepage.requiredField"))
        })
    })


    const formik = useFormik({
        initialValues: {
            title: "",
            resourceType: "sessionResource",
            accessLevel: selectedLinkType.value,
            linkData: {
                url: ""
            }
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values)
            addLink(values, resetForm)
        }
    })



    const fetchRes = useQuery({
        queryKey: [
            "fetchResources",
            `${id}`,
            `${session?._id}`,
            `${handleAddedFile}`,
            `${handleDelet}`,
            `${handleAddLink}`,
        ],
        queryFn: () => getResourses(id, session?._id),
        enabled: !!headers["auth-token"] && !!id && !!session,
    });





    function formatFileSize(bytes) {
        if (bytes >= 1073741824) { // 1 GB = 1024^3 bytes
            return (bytes / 1073741824).toFixed(2).replace(/\.?0*$/, '') + ' GB';
        } else if (bytes >= 1048576) { // 1 MB = 1024^2 bytes
            return (bytes / 1048576).toFixed(2).replace(/\.?0*$/, '') + ' MB';
        } else if (bytes >= 1024) { // 1 KB = 1024 bytes
            return (bytes / 1024).toFixed(2).replace(/\.?0*$/, '') + ' KB';
        } else {
            return bytes + ' bytes';
        }
    }






    useEffect(() => {

        sessionStorage.setItem("accessLevel", JSON.stringify(selectedType))



    }, [selectedType])



    return (
        <Dialog
            open={Toggler.upload}
            as="div"
            className="relative z-30 focus:outline-none"
            onClose={close}
        >
            <div className="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin bg-black/10">
                <div className="flex min-h-full b items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full sm:w-[550px] lg:w-[680px] rounded-xl bg-bg_mainLayout  bg-HomePageBgImage p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <button
                            className="flex items-center justify-center p-3 bg-white rounded-full"
                            onClick={() => setToggler({ ...Toggler, upload: false })}
                        >
                            <ReactSVG src={x} />
                        </button>
                        <DialogTitle
                            as="h3"
                            className="text-base/7 mb-2 font-medium text-mainColor"
                        >
                            <div className="flex flex-col items-center justify-between rounded-t gap-y-1">
                                {/* <ReactSVG src={warning} /> */}
                                <h3 className="text-2xl font-black text-[#023E8A]">
                                    {t("homepage.addFiles")}
                                </h3>
                                {/* <p className="font-normal text-sm sm:text-base text-center">
                                        {t('homepage.assistantP')}
                                    </p> */}
                            </div>
                        </DialogTitle>
                        {/* content */}
                        <>

                            <div className="container w-full flex flex-col gap-y-2  mt-6 ">

                                <div className='w-full flex items-center gap-x-4  justify-center' >
                                    <button

                                        type='button'
                                        onClick={() => {
                                            handleActiveClass(1)
                                            setToggleDropDown(false)
                                        }}
                                        className={`px-1 py-1 sm:text-sm sm:px-3 ${ActiveClass === 1 ? "bg-mainColor text-white" : "text-mainColor bg-white"} font-bold text-xs sm:text-base  rounded-lg transition-all`}
                                    >
                                        {t("homepage.uploadNewFile")}
                                    </button>

                                    <button
                                        type='button'
                                        onClick={() => {
                                            handleActiveClass(2)
                                            setToggleDropDown(false)
                                        }}
                                        className={`px-1 py-1 sm:text-sm sm:px-3 ${ActiveClass === 2 ? "bg-mainColor text-white" : "text-mainColor bg-white"} font-bold text-xs sm:text-base  rounded-lg transition-all`}
                                    >

                                        {t("homepage.uploadedFiles")}
                                    </button>

                                    <button
                                        type='button'
                                        onClick={() => {
                                            handleActiveClass(3)
                                            setToggleDropDown(false)
                                        }}
                                        className={`px-1 py-1 sm:text-sm sm:px-3 ${ActiveClass === 3 ? "bg-mainColor text-white" : "text-mainColor bg-white"} font-bold text-xs sm:text-base  rounded-lg transition-all`}
                                    >

                                        {t("homepage.addLink")}
                                    </button>


                                </div>


                                {ActiveClass === 1 ?
                                    <div className='p-2 flex flex-col gap-y-4'>

                                        <div className={`w-full `}>
                                            <label
                                                htmlFor="type"
                                                className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
                                            >
                                                {t('homepage.contentType')}
                                            </label>
                                            <Listbox

                                                onChange={(ele) => {
                                                    setselectedType(ele);
                                                    // setselectedTypeId(ele._id);

                                                }}
                                            >
                                                <div className="relative mt-1">
                                                    <ListboxButton

                                                        className={`font-semibold  w-full px-4 sm:px-6 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-sm
	                                                                    flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm  `}
                                                    >


                                                        <span
                                                            className={`block truncate text-sm text-mainColor`}
                                                        >
                                                            {selectedType ? selectedType?.name : <span className='text-textGray'>{t("exam.choise")}</span>}
                                                        </span>
                                                        <ReactSVG src={arrow} />
                                                    </ListboxButton>

                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <ListboxOptions
                                                            className="absolute scrollbar-thin w-full py-1 mt-12  overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-36 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[100]"
                                                        >
                                                            {Types?.filter((item) => item?.value !== selectedType?.value)?.map((person, personIdx) => (
                                                                <ListboxOption
                                                                    key={personIdx}
                                                                    className={({ active }) =>
                                                                        ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
                                                                            ? 'bg-mainColor text-white'
                                                                            : 'text-mainColor'
                                                                        }`
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selectedType }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${selectedType
                                                                                    ? 'font-medium'
                                                                                    : 'font-normal'
                                                                                    }`}
                                                                            >
                                                                                {person?.name}
                                                                            </span>
                                                                            {selectedType ? (
                                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                                    {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </ListboxOption>
                                                            ))}
                                                        </ListboxOptions>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                            {/* {formik.errors.courseId && (
										<p className="text-red-400 py-1">
											{formik.errors.courseId}
										</p>
									)} */}
                                        </div>
                                        <div className='h-[400px] relative z-0 w-full overflow-y-auto scrollbar-thin rounded-lg px-2'>
                                            <MultipartUpload onUploadSuccess={handleUploadSuccess} />
                                        </div>
                                    </div>

                                    : ActiveClass === 2 ?
                                        <>
                                            {fetchRes.isFetched ? <div className="uploadedFiles  rounded-lg mt-3   w-full h-[300px] flex flex-col gap-y-6 overflow-y-auto scrollbar-thin px-4 py-6">
                                                {fetchRes.data?.data?.length > 0 ? fetchRes.data?.data?.map((item, i) => {
                                                    return (
                                                        <div key={item?._id} className="file pb-2 w-full flex items-center justify-between">
                                                            <div className="fileData flex items-center gap-x-2 w-[80%] truncate">
                                                                <div className="icon hidden sm:block">
                                                                    {item?.title?.toLowerCase()?.includes("docx") ? <ReactSVG src={docs} /> :
                                                                        item?.title?.toLowerCase()?.includes("doc") ? <ReactSVG src={docs} /> :
                                                                            item?.title?.toLowerCase()?.includes("txt") ? <ReactSVG src={docs} /> :
                                                                                item?.title?.toLowerCase()?.includes("pdf") ? <ReactSVG src={pdf} /> :
                                                                                    item?.title?.toLowerCase()?.includes("zip") ? <ReactSVG src={pdf} /> :
                                                                                        item?.title?.toLowerCase()?.includes("jpg") ? <ReactSVG src={image} /> :
                                                                                            item?.title?.toLowerCase()?.includes("mp4") ? <ReactSVG src={vedio} /> :
                                                                                                item?.title?.toLowerCase()?.includes("png") ? <ReactSVG src={image} /> : item?.title?.toLowerCase()?.includes("svg") ? <ReactSVG src={image} /> :
                                                                                                    item?.title?.toLowerCase()?.includes("youtube") ? <ReactSVG src={youtupe} /> : item?.title?.toLowerCase()?.includes("mp3") ? <ReactSVG src={vedio} /> :

                                                                                                        item?.type === "link" && <ReactSVG src={youtupe} />
                                                                    }

                                                                </div>
                                                                {item?.type === "link" ?
                                                                    <a target='_blank'
                                                                        rel="noopener noreferrer"

                                                                        className='underline text-mainColor font-bold text-sm cursor-pointer' href={item?.linkData?.url}>
                                                                        {item?.title}
                                                                        {/*  */}
                                                                    </a>
                                                                    : item?.type === "document" ?
                                                                        <a target='_blank'
                                                                            rel="noopener noreferrer"

                                                                            className='underline text-mainColor font-bold text-sm cursor-pointer' href={`https://resources.sanadedu.com/${item?.documentData?.path}`}>
                                                                            {item?.title}
                                                                            {/* https://resources.sanadedu.com/ */}
                                                                        </a> :
                                                                        <p className='text-textColor__2 text-sm font-bold truncate'>
                                                                            {item?.title}
                                                                        </p>}




                                                                <p className='hidden sm:flex items-center text-2xs justify-center px-1 py-[0.5px] bg-secondMainColor text-white rounded-lg  border-[1px] border-textColor__2'>
                                                                    {item?.accessLevel === 0 ? t("homepage.free") : item?.accessLevel === 1 ? t("homepage.attendance") : item?.accessLevel === 2 && t("homepage.payed")}
                                                                </p>
                                                            </div>

                                                            <div className="icons flex items-center gap-x-2">

                                                                {item?.type === "link" || item?.type === "stream" ? null :

                                                                    <p className=' hidden sm:flex items-center text-2xs justify-center px-1 py-[0.5px] bg-transparent text-textColor__2 rounded-lg  border-[1px] border-textColor__2'>
                                                                        {formatFileSize(item?.documentData?.size)}
                                                                    </p>}
                                                                <button type='button'
                                                                    onClick={() => deletContent(item?._id)}
                                                                    disabled={deletLoading}
                                                                >


                                                                    <ReactSVG src={del} />

                                                                </button>
                                                            </div>
                                                        </div>


                                                    )
                                                }) :
                                                    <p className='bg-white text-center rounded-lg py-2 text-mainColor font-bold'>
                                                        {t("homepage.nothing")
                                                        }
                                                    </p>
                                                }
                                            </div> :
                                                <div className='flex flex-col gap-y-4 pt-4'>
                                                    <SmallPosts />
                                                </div>}
                                        </>

                                        : ActiveClass === 3 && <div className='w-full '>
                                            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-y-3'>
                                                <div className="w-full ">
                                                    <label
                                                        htmlFor="type"
                                                        className={`text-[#023E8A] w-full text-start font-semibold text-sm relative `}
                                                    >
                                                        {t('homepage.contentType')}
                                                    </label>
                                                    <Listbox

                                                        onChange={(ele) => {

                                                            setselectedLinkType(ele);

                                                            formik.setFieldValue("accessLevel", ele?.value)

                                                        }}
                                                    >
                                                        <div className="relative mt-1">
                                                            <ListboxButton

                                                                className={`font-semibold  w-full px-4 sm:px-6 py-3 sm:gap-x-3 items-center justify-between   border-input_border border-[1px]          sm:py-3  text-sm
	                                                                    flex cursor-pointer rounded-xl bg-white  text-left focus:outline-none  sm:text-sm  `}
                                                            >


                                                                <span
                                                                    className={`block truncate text-sm text-mainColor`}
                                                                >
                                                                    {selectedLinkType ? selectedLinkType?.name : <span className='text-textGray'>{t("exam.choise")}</span>}
                                                                </span>
                                                                <ReactSVG src={arrow} />
                                                            </ListboxButton>

                                                            <Transition
                                                                as={Fragment}
                                                                leave="transition ease-in duration-100"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <ListboxOptions
                                                                    className="absolute scrollbar-thin w-full py-1 mt-12  overflow-y-auto text-base bg-white rounded-md shadow-lg max-h-36 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[100]"
                                                                >
                                                                    {Types?.filter((item) => item?.value !== selectedLinkType?.value)?.map((person, personIdx) => (
                                                                        <ListboxOption
                                                                            key={personIdx}
                                                                            className={({ active }) =>
                                                                                ` relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
                                                                                    ? 'bg-mainColor text-white'
                                                                                    : 'text-mainColor'
                                                                                }`
                                                                            }
                                                                            value={person}
                                                                        >
                                                                            {({ selectedLinkType }) => (
                                                                                <>
                                                                                    <span
                                                                                        className={`block truncate ${selectedLinkType
                                                                                            ? 'font-medium'
                                                                                            : 'font-normal'
                                                                                            }`}
                                                                                    >
                                                                                        {person?.name}
                                                                                    </span>
                                                                                    {selectedLinkType ? (
                                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                                                        </span>
                                                                                    ) : null}
                                                                                </>
                                                                            )}
                                                                        </ListboxOption>
                                                                    ))}
                                                                </ListboxOptions>
                                                            </Transition>
                                                        </div>
                                                    </Listbox>
                                                    {/* {formik.errors.courseId && (
										<p className="text-red-400 py-1">
											{formik.errors.courseId}
										</p>
									)} */}
                                                </div>
                                                <div className="title flex flex-col gap-y-1">

                                                    <label htmlFor="title" className=' text-sm text-mainColor font-semibold'>
                                                        {t("homepage.title")}
                                                    </label>
                                                    {formik.errors.title && formik.touched.title && <p className='text-xs text-err'>
                                                        {formik.errors.title}</p>}
                                                    <input type="text"
                                                        className={`w-full focus:border-none placeholder:text-textGray text-mainColor font-bold text-xs ${formik.errors.title && formik.touched.title ? "border-err " : "border-input_border"} px-4 py-3 rounded-xl`}
                                                        placeholder={t("homepage.title")}
                                                        id='title'
                                                        name='title'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.title}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>

                                                <div className="link flex flex-col gap-y-1">
                                                    <label htmlFor="link" className=' text-sm text-mainColor font-semibold'>
                                                        {t("homepage.url")}
                                                    </label>
                                                    {/* {formik.errors.linkData.url && formik.touched.linkData.url && <p className='text-xs text-err'>
                                                        {formik.errors.linkData.url}</p>} */}
                                                    <input type="url"
                                                        className={`w-full focus:border-none placeholder:text-textGray text-mainColor font-bold text-xs   px-4 py-3 rounded-xl border-input_border`}
                                                        placeholder={t("homepage.url")}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        id='link'
                                                        name={"linkData.url"}
                                                        value={formik.values.linkData.url}
                                                    />
                                                </div>

                                                <div className="formBtns mt-4 flex flex-col sm:flex-row gap-x-3 justify-center items-center">
                                                    <button
                                                        disabled={!(formik.isValid && formik.dirty)}
                                                        type="submit"
                                                        className={`text-white ${!(formik.isValid && formik.dirty) ? "bg-secondMainColor" : "bg-mainColor"}  text-center rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg`}
                                                    >
                                                        {
                                                            linkLoading ? <div className={`w-6  ms-[40%] h-6 border-t-4 text-center border-white border-solid rounded-full animate-spin block`}
                                                            ></div> : t('homepage.adding')}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setToggler({ ...Toggler, upload: false })}
                                                        className="bg-transparent text-mainColor rounded-2xl px-10 py-2 sm:py-3 w-full md:w-1/2 text-lg"
                                                    >
                                                        {t('homepage.back')}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                }
                            </div>


                        </>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default UploadingFiles