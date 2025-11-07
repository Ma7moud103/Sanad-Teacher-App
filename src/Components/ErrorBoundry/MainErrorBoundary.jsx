import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import err from "../../Assets/sanadSVG/oops.svg"


function ErrorFallback({ error, title = "server Error" }) {
    // console.log(error)

    const messageError = useMemo(() => {
        if (!error || !error.response || !error.response.status) {
            return "An unknown error occurred. Please try again later.";
        }

        switch (error.response.status) {
            case 400:
                return "Bad Request: Please check your input and try again.";
            case 401:
                return "Unauthorized: Please log in to continue.";
            case 403:
                return "Forbidden: You do not have permission to perform this action.";
            case 404:
                return "Not Found: The requested resource could not be found.";
            case 500:
                return "Internal Server Error: Please try again later.";
            case 502:
                return "Bad Gateway: The server is temporarily unavailable. Please try again later.";
            case 503:
                return "Service Unavailable: The server is currently unable to handle the request. Please try again later.";
            default:
                return "An error occurred. Please try again later.";
        }
    }, [error]);


    const { state, pathname } = useLocation()



    return (
        <div className='w-screen h-screen flex   lg:flex-row overflow-hidden p-3  items-center gap-x-3 bg-white justify-center flex-col-reverse  '>
            {/* <pre>{props.error.message}</pre> */}
            <div className="text  flex flex-col gap-y-4 items-center sm:w-1/2">
                <h5 className='text-mainColor text-xl sm:text-3xl font-semibold'> {error.response.status}</h5>
                <p className='text-textColor__2 text-base sm:text-xl font-semibold text-center'>
                    {messageError}
                </p>
                <div className="flex items-center gap-x-2 ">
                    <Link reloadDocument to={pathname} className='bg-mainColor py-2 px-3 rounded-lg text-white'>Try again</Link>
                    <Link reloadDocument to={"/"} className='bg-mainColor py-2 px-3 rounded-lg text-white'>Home Page</Link>
                </div>
            </div>

            <div className="image  sm:w-1/2 flex items-center justify-center ">
                <ReactSVG src={err} />
            </div>
        </div>
    );
}


export default ErrorFallback
