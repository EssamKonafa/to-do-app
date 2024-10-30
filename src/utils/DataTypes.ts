export interface Supabase {
    supabase:any;
    auth:any
    signInWithOAuth:any
}

export interface UserStatus {
    userId: string | null; 
    isAuthenticated: boolean;
  }