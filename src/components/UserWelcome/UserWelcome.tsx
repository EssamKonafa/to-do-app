import { Hand } from 'lucide-react'
import React from 'react'

function UserWelcome () {
    return (
        <div>
            <div className="flex gap-x-2">
                <p className="font-semibold text-[25px]">Good Morning, User.name! </p>{/*make it dynamic based on the time*/}
                <Hand className="border my-auto" />
            </div>
            <p className="text-[20px]">It's Wed, 6 July 2023</p>
            {/* <p className="text-[20px] font-bold">Home</p> */}
        </div>
    )
}

export default UserWelcome 