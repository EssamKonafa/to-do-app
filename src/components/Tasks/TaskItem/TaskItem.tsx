import { MoreVertical } from 'lucide-react'
import React from 'react'

function Task() {
    return (
        <div>
            <label className="flex justify-between bg-[#ffffff] rounded-xl  p-3 ">

                <div className="flex gap-x-4 ">
                    {/* <input
          type="checkbox"
          className={` mt-1 content-center absolute appearance-none w-6 h-6 rounded-md checked:bg-black checked:border-none  border border-gray-400 transition-all duration-500`}
        /> */}
                    {/* later make it work with checking on the selected note */}
                    <input
                        type="checkbox"
                        className="w-6 h-6 my-auto accent-black"
                    />
                    <p className="font-semibold content-center text-[17px]">Do Your Assignments</p>
                </div>

                <div className="flex font-[600] text-[#999999] gap-x-2">
                    {/* <div className="px-1.5 py-1 py-auto content-center  rounded-md gap-x-2 bg-[#f5f5f5]">
          <p>Today</p>
        </div> */}

                    {/* <div className="flex px-1.5 py-1 py-auto  rounded-md gap-x-2 bg-[#f5f5f5]">
          <Clock className="w-5 h-5 my-auto" />
          <p className="my-auto" >8:00</p>
          -
          <p className="my-auto" >9:00</p>
        </div> */}

                    <div className="content-center cursor-pointer p-1 hover:bg-[#c9c9c9] rounded-md gap-x-2 bg-[#f5f5f5] transition-all">
                        <MoreVertical className="w-5 h-5 my-auto text-[#787878]" />
                    </div>
                </div>

            </label>
        </div>
    )
}

export default Task