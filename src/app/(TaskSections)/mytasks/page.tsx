import AllTasks from '@/components/Tasks/AllTasks'
import React from 'react'

function page() {
  return (
    <>
    <p className='font-semibold text-center py-3 text-[25px]'>My Tasks</p>
        <AllTasks/>
    </>
  )
}

export default page