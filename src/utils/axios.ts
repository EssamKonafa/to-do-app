import { Supabase } from "./DataTypes";

//------------------------------------------------- user --------------------------------------------------------

export const signInWisthGithub = async (supabase: any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
    })
    console.log('signed in successfully', data);
    if (error != null) {
        console.error('error while signing in', error);
    }
}

export const signout = async (supabase: any) => {
    const { error } = await supabase.auth.signOut();
    console.log('signed out successfully');
    if (error) {
        console.error('error while signing in', error);
    }
}

export const getUser = async (supabase: any) => {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    if (error) {
        console.error('error while getting user', error);
    }
}

export const getUserSession = async (supabase: any) => {
    try {
        const { data } = await supabase.auth.getSession();
        console.log(data);
        console.log(data.session.access_token);
        return data;
    } catch (error) {
        console.error('error while user token or the user not signed in', error)
    }
}