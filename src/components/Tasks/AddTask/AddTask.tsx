import { Plus, SendHorizonal } from 'lucide-react'
import React from 'react'

function AddTask() {
    return (
        <div className='bottom-10 sticky mx-auto w-1/2'>
            <label className="flex p-3 py-auto rounded-full gap-x-2 bg-black ">
                <Plus className="w-6 h-6 text-white" />
                <input
                    className="text-white bg-black w-full outline-none "
                    placeholder="Create a New Task"
                />
                <SendHorizonal className="w-6 h-6 text-white" />
            </label>
        </div>
    )
}

export default AddTask