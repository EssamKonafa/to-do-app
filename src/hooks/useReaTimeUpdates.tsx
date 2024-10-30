import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';

export function useRealtimeUpdates(tasksQuery: any) {

    useEffect(() => {
        //Subscribing to database realtime changes
        supabase
            .channel('public:tasks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'tasks'
                },
                //payload is the actual realtime update which user did and it's contains details about the eventType, which table action and the manipulated data
                (payload) => {
                    const { eventType, new: newTask, old: deletedTask } = payload;

                    //here i'm updating the state based on upcoming payload's data to rerender the ui immediately based on the new data
                    tasksQuery((currentTasks: any) => {
                        switch (eventType) {
                            case "INSERT":
                                console.log('Adding new task:', newTask);
                                return [...currentTasks, newTask];
                            case "DELETE":
                                console.log('Deleting task:', deletedTask);
                                return currentTasks.filter((task: any) => task.id !== deletedTask.id);
                            case "UPDATE":
                                console.log('Updating task:', newTask);
                                return currentTasks.map((task: any) => task.id === newTask.id ? newTask : task)
                        }
                    });
                }
            )
            .subscribe();

    }, [tasksQuery]);
}