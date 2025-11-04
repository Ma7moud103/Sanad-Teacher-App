import React from 'react'

function LargePagination({ fetchData, setPage, Page, pagesToShow, handleClick, totalPages }) {
    return (


        fetchData.data?.data?.length > 0 &&
        <div className="flex items-center justify-center gap-y-4">
            {fetchData?.data?.data?.length > 0 &&
                <div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
                    <button
                        onClick={() => handleClick(Page - 1)}
                        // onClick={() => setPage((old) => {
                        //     Math.max(old - 1, 1)
                        // })}
                        className={`${Page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                            } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                        disabled={Page === 1}
                    >
                        &lt;
                    </button>

                    {pagesToShow.map((page, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (typeof page === "number") {
                                    handleClick(page);
                                }
                            }}
                            className={`${typeof page === "number"
                                ? Page === page
                                    ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
                                    : "bg-transparent text-[#293241] hover:bg-slate-100"
                                : "text-[#293241]"
                                } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handleClick(Page + 1)}
                        className={`${Page === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                            }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                        disabled={Page === totalPages || fetchData.isPlaceholderData}

                    >
                        &gt;
                    </button>
                </div>
            }
        </div>

    )
}

export default LargePagination