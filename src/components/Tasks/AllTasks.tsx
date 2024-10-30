'use client';
import useUserStatusStore from '@/Stores/AuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { deleteTask, getAllTasks, getUserTasks, updateTask } from '@/utils/axios';
import { Button } from '../ui/button';
import { AlertCircle } from 'lucide-react';
import SlideAnimation from '../Animation/SlideAnimation';
import { AnimatePresence } from "framer-motion";
import { motion } from 'framer-motion';
import { useRealtimeUpdates } from '@/hooks/useReaTimeUpdates';
import { usePathname } from 'next/navigation';

function AllTasks() {

    // Retrieves the current page path to dynamically set data queries and conditions
    const pathname = usePathname()

    //user info from the global state
    const { userInfo }: any = useUserStatusStore();

    // Sets a query key based on the current pathname
    const queryKey = pathname === "/mytasks" ? ['userTasks', userInfo?.userId] : ['tasks'];

    //retrieve tasks
    const {
        data: tasks,
        isLoading: tasksLoading,
        isError: tasksError
    } = useQuery({
        queryKey,
        // If the user is on the "mytasks" page, it uses the user's ID to fetch their specific tasks. otherwise, fetches all tasks
        queryFn: () => pathname === "/mytasks" && userInfo?.userId ? getUserTasks(userInfo?.userId) : getAllTasks(),
    });

// Custom hook useRealtimeUpdates listens for task updates and automatically syncs them with react query 
    const queryClient = useQueryClient();
    useRealtimeUpdates((tasksQuery: any) => {
        queryClient.setQueryData(['tasks'], tasksQuery);
    });

    if (tasksLoading) {
        return (
            <div className="p-4 space-y-4">
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>
        )
    }
    if (tasksError) {
        return (
            <div className="p-4 bg-red-100 border-l-4 text-red-700">
                <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <p className="font-bold">Error</p>
                </div>
                <p className="mt-2">
                    Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="space-y-3">
                {pathname === "/mytasks" && !userInfo ? (
                    <SlideAnimation>
                        <p className="text-center text-gray-500 text-2xl">
                            You should sign in first to see your tasks.
                        </p>
                    </SlideAnimation>
                ) : (
                    <AnimatePresence>
                        {tasks?.length !== 0 ? (
                            tasks?.map((task: any) => (
                                <div key={task.id}>

                                    <SlideAnimation>
                                        <TaskItem task={task} />
                                    </SlideAnimation>
                                </div>
                            ))
                        ) : (
                            <div>
                                <SlideAnimation>
                                    <p className="text-center text-gray-500 text-2xl">
                                        No tasks to display. Add a new task to get started!
                                    </p>
                                </SlideAnimation>
                            </div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

export default AllTasks;