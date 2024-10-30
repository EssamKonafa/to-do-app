'use client'
import useUserStatusStore from '@/Stores/AuthStore'
import { AddNewTask } from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, SendHorizonal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function AddTask() {
    //user info from the global state
    const { userInfo }: any = useUserStatusStore();

    //state for task string added by user
    const [taskInput, setTaskInput] = useState('');

    //mutation for adding task with error handling and validate query to refetch tasks to render it immediately after adding the user the new task
    const queryClient = useQueryClient();
    const addTaskMutation = useMutation({
        mutationFn: () => AddNewTask(taskInput, userInfo.userId, userInfo.name, userInfo.avatar),
        onSuccess() {
            queryClient.invalidateQueries()
            toast.success("task added successfully!")
            setTaskInput('');
        }, onError(error) {
            if (!userInfo) toast.error("Please Sign in First")
            else toast.error(error.message || "Failed to add task, please try again later")
        }
    })
    //handle add task with pressing enter button
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTaskMutation.mutate();
        }
    };

    return (
        <div className='bottom-10 sticky mx-auto w-1/2 '>
            <label className="flex p-3 py-auto rounded-full gap-x-2 bg-black ">
                <Plus className="w-7 h-7 text-white" />
                <input
                    className="text-white bg-black w-full outline-none "
                    placeholder="Create a New Task"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div>
                    <SendHorizonal onClick={() => addTaskMutation.mutate()} className="w-7 h-7 transition-all text-white cursor-pointer" />
                </div>
            </label>
        </div>
    )
}

export default AddTask