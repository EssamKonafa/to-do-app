import { create } from 'zustand'

//global state for setting user info and auth status 
const useUserStatusStore = create((set) => ({
    isAuthenticated: false,
    userInfo: null,
    setUserStatus: (userInfo: any,status:any) => set({ userInfo, isAuthenticated:status }),
    removeUserStatus: () => set({ userInfo: null, isAuthenticated: false, }),
}))

export default useUserStatusStore;