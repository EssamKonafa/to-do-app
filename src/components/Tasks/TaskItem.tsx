'use client'
import { Delete, Edit, MoreVertical, Trash2, User } from 'lucide-react'
import React, { useState } from 'react'
import useUserStatusStore from '@/Stores/AuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, taskStatus, updateTask } from '@/utils/axios';
import { Checkbox } from '../ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast, Toaster } from 'sonner'
import Image from 'next/image';

function TaskItem({ task }: any) {

    //user info from the global state
    const { userInfo }: any = useUserStatusStore();

    //state for the updated task sting
    const [newTaskText, setNewTaskText] = useState(task.task);

    // Mutation for updating a task
    const queryClient = useQueryClient();
    const updateTaskMutation = useMutation({
        mutationFn: () => updateTask({ taskId: task.id, userId: userInfo.userId, updatedTask: newTaskText }),
        onSuccess() {
            queryClient.invalidateQueries()
            toast.success("task updated successfully")
        }, onError(error) {
            if (!userInfo) toast.error("Please Sign in First")
            else toast.error(error.message || "Failed to update the task please try again later.");
        },
    })
    const handleUpdate = () => {
        updateTaskMutation.mutate();
    };

    // Mutation for deleting a task
    const deleteTaskMutation = useMutation({
        mutationFn: () => deleteTask(task.id, userInfo.userId),
        onSuccess() {
            queryClient.invalidateQueries()
        }, onError(error) {
            if (!userInfo) toast.error("Please Sign in First")
            else toast.error(error.message || "Failed to Delete the task please try again later")
        },
    })

    // Mutation for toggling task status (complete/incomplete)
    const toggleStatusMutation = useMutation({
        mutationFn: (status: boolean) => taskStatus(status, task.id, userInfo.userId),
        onSuccess() {
            queryClient.invalidateQueries();
        }, onError(error) {
            if (!userInfo) toast.error("Please Sign in First")
            else toast.error(error.message || "Failed to update task status please try again later.");
        },
    });
    const handleStatusChange = () => {
        toggleStatusMutation.mutate(!task.completed);
    };

    //data of the added task
    const formattedDate = new Date(task.created_at).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <>
            <Toaster
                richColors
                position="top-center"
                closeButton
            />
            <label className='flex justify-between cursor-pointer hover:shadow-md  transition-all duration-500 bg-[#ffffff] rounded-xl shadow-sm p-3 '>

                <div className="flex gap-x-4 ">
                    <Checkbox
                        className="w-6 h-6 my-auto transition-all duration-300"
                        checked={task.completed}
                        onCheckedChange={handleStatusChange}
                    />
                    <p className={`font-semibold content-center text-[17px] ${task.completed === true && 'line-through'}`}>{task.task}</p>
                </div>


                <div className="flex font-[500] text-[13px] text-[#8e8d8d]  gap-x-2 my-auto">
                    <div className='my-auto'>
                        {formattedDate}
                    </div>
                    <div className='my-auto content-center'>
                        <Image
                            src={task?.userAvatar}
                            width={200}
                            height={200}
                            alt="user image"
                            className="w-6 h-6 rounded-3xl"
                        />
                    </div>

                    <Dialog >
                        <DialogTrigger asChild>
                            <Edit className='w-6 h-6 hover:text-black transition-all duration-500' />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Task</DialogTitle>
                                <DialogDescription>
                                    Edit your task below and confirm to update.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                            <div className="flex justify-end gap-x-2 mt-4">
                                <Button
                                    onClick={handleUpdate}
                                    className='bg-green-500 hover:bg-green-600'
                                >
                                    Update
                                </Button>
                                <DialogClose className='bg-black hover:bg-gray-800 text-white text-[14px] rounded-md px-3 ph-2'>
                                    Close
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                            <Trash2 className='w-6 h-6 hover:text-red-500  transition-all duration-500' />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your task
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex justify-end gap-x-2'>
                                <Button className='bg-red-500 hover:bg-red-700'
                                    onClick={() => deleteTaskMutation.mutate()}>
                                    Delete
                                </Button>
                                <DialogClose className='bg-black hover:bg-gray-800 text-white text-[14px] rounded-md px-3 ph-2'>
                                    Cancel
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </label>
        </>
    )
}

export default TaskItem