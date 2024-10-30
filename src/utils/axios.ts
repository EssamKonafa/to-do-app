import { Supabase } from "./DataTypes";
import { supabase } from "./supabase";

//------------------------------------------------- user --------------------------------------------------------

export const signInWithGithub = async (supabase: any) => {
    let response;
    try {
        response = await supabase.auth.signInWithOAuth({
            provider: 'github'
        })
        return response.data;
    }
    catch (error) {
        throw new Error(response.error.message || error || "an error happened, please try again later");
    }
}

export const signOut = async (supabase: any) => {
    let response;
    try {
        response = await supabase.auth.signOut();
        console.log('signed out successfully');
        return response.data;
    } catch (error) {
        if (error) {
            console.error('error while signing in', response.error);
        }
        throw new Error (response.error.message || error)
    }
}

export const getUserSession = async (supabase: any) => {
    let response;
    try {
        response = await supabase.auth.getSession();
        return response.data;
    } catch (error) {
        console.error('error while user token or the user not signed in', response.error)
        throw new Error (response.error.message || error);
    }
}

//----------------------------------------------- Tasks CRUD ------------------------------------------

export const AddNewTask = async (taskInput: any, userId: any,userName:any,userAvatar:any) => {
    if (!taskInput) return console.error('task string not found');
    if (!userId) return console.error('userId not found');
    let response;
    try {
        response = await supabase
            .from('tasks')
            .insert([
                { task: taskInput, userId,userName,userAvatar },
            ])
            .select()
        return response.data;
    } catch (error) {
        if (error) {
            console.error('error adding task', response?.error);
            throw new Error("An unknown error occurred during add the task");
        }
    }
}

export const taskStatus = async (status: any, taskId: any, userId: any) => {
    console.log(status);

    if (!taskId) return console.error('taskId not found');
    if (!userId) return console.error('userId not found');
    let response;
    try {
        response = await supabase
            .from('tasks')
            .update({ completed: status })
            .eq("id", taskId)
        return response.data;
    } catch (error) {
        if (error) {
            console.error('error adding task', response?.error);
            throw new Error("An unknown error occurred during setting task status");
        }
    }
}

export const getAllTasks = async () => {
    let response;
    try {
        response = await supabase
            .from('tasks')
            .select('*')
            console.log(response.data);
            
        return response.data
    } catch (error) {
        console.error('Error while fetching tasks:', error);
        throw new Error(response?.error?.message);
    }
};

export const getUserTasks = async (userId: any) => {
    if (!userId) {
        console.error("userId not found");
        throw new Error("userId is required");
    }
    console.log("Fetching tasks for userId:", userId);
    let response;
    try {
        response = await supabase
            .from('tasks')
            .select('*')
            .eq("userId", userId);
        if (response.error) {
            console.error('Error fetching tasks:', response.error);
            throw new Error(response.error.message);
        }
        return response.data
    } catch (error) {
        console.error('Error while fetching tasks:', error);
        throw new Error('error');
    }
};

export const getUserTasksStatus = async (userId: any,status:any) => {
    if (!userId) throw new Error("userId is required");
    if (!status) throw new Error("userId is required");
    console.log(status);
    console.log("Fetching Completed tasks for userId:", userId);
    let response;
    try {
        response = await supabase
            .from('tasks')
            .select('*')
            .eq("userId", userId)
            .eq("completed",status)
        if (response.error) {
            console.error('Error fetching Completed tasks:', response.error);
            throw new Error(response.error.message);
        }
        return response.data
    } catch (error) {
        console.error('Error while fetching Completed tasks:', error);
        throw new Error("error");
    }
};

export const updateTask = async ({ taskId, userId, updatedTask }: any) => {
    if (!userId) return console.error("userId not found");
    if (!taskId) return console.error("taskId not found");
    if (!updatedTask) return console.error("updatedTask not found");
    let response
    try {
        response = await supabase
            .from('tasks')
            .update({ task: updatedTask })
            .eq("id", taskId)
        return response.data;
    } catch (error) {
        console.error('Error while updating task:', error);
        throw Error;
    }
}

export const deleteTask = async (taskId: any, userId: any) => {
    if (!userId) return console.error("userId not found");
    if (!taskId) return console.error("taskId not found");
    let response
    try {
        response = await supabase
            .from('tasks')
            .delete()
            .eq("id", taskId)
        return response.data;
    } catch (error) {
        console.error('Error while deleting task:', error);
        throw Error;
    }
}