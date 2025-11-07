import React from 'react'

function SingleRouteLoading() {
    return (
        <div className=" w-full 2xl:w-1/3 bg-white  h-full p-4 rounded-xl">
            <div className="animate-pulse w-full  h-full flex flex-col items-center justify-center  ">
                <div className="w-full flex justify-center items-center ">
                    <div className="rounded-full bg-zinc-300 h-10 w-10"></div>
                </div>

                <div className="flex-1 space-y-2 flex items-center flex-col py-1 w-full">
                    <div className="h-2 w-[15%] bg-zinc-300 rounded"></div>
                    <div className="h-2 w-[20%] bg-zinc-300 rounded"></div>

                </div>

                <div className="w-full flex items-center justify-between px-3">
                    <div className="box w-1/2">
                        <div className="flex-1 space-y-2 flex items-center flex-col py-1 w-full">
                            <div className="h-2 w-[70%] bg-zinc-300 rounded"></div>
                            <div className="h-2 w-[60%] bg-zinc-300 rounded"></div>
                        </div>
                    </div>

                    <div className="box w-1/2">
                        <div className="flex-1 space-y-2 flex items-center flex-col py-1 w-full">
                            <div className="h-2 w-[70%] bg-zinc-300 rounded"></div>
                            <div className="h-2 w-[60%] bg-zinc-300 rounded"></div>
                        </div>
                    </div>

                </div>

            </div>
        </div>)
}

export default SingleRouteLoading