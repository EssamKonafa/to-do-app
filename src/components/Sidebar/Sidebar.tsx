'use client'
import { AlignLeftIcon, CheckCircle, Circle, Settings, User2Icon, UserCog } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { supabase } from "@/utils/supabase"
import { getUserSession, signInWithGithub, signOut } from "@/utils/axios"
import Image from "next/image"
import { Button } from "../ui/button"
import useAuthStore from "@/Stores/AuthStore"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"
import Link from "next/link"

// Define the sidebar navigation items with information
const items = [
    { title: "All Tasks", url: "/", icon: AlignLeftIcon, },
    { title: "My Tasks", url: "/mytasks", icon: UserCog, },
    { title: "Completed", url: "/completed", icon: CheckCircle, },
    { title: "Not Completed", url: "/notcompleted", icon: Circle, }
]

export function AppSidebar() {

    // Determines the current path for dynamic styling
    const pathname = usePathname();
    const router = useRouter()

    // Updates user status in global state
    const setUserStatus = useAuthStore((state: any) => state.setUserStatus)
    const { userInfo, removeUserStatus }: any = useAuthStore()

    // Sign-in mutation using GitHub, with error handling
    const signInMutation = useMutation({
        mutationFn: () =>
            signInWithGithub(supabase),
        onError(error) {
            toast.error(error.message || "ُError while signing you in, please try again later")
            console.log(error);
        }
    })

    // Checks user authentication status and setting his info
    //state for setting user info and auth status with taking care if the user is authenticated I setting all values to avoiding storing sensitive data like access tokens
    const checkAuthentication = (data: any) => {
        if (data.session?.user && data.session.user.role === "authenticated") {
            const userInfo = {
                userId: data.session.user.id,
                email: data.session.user.user_metadata.email,
                name: data.session.user.user_metadata.full_name,
                avatar: data.session.user.user_metadata.avatar_url,
                isAuthenticated: true,
            };
            setUserStatus(userInfo, userInfo.isAuthenticated);
        } else {
            removeUserStatus()
            throw new Error("user is not authenticated")
        }
    }

    // Mutation to retrieve the current user session and verify authentication status
    const setAuthMutation = useMutation({
        mutationFn: () => getUserSession(supabase),
        onSuccess(data) {
            checkAuthentication(data)
        },
    })
    //sign out mutation
    const signOutMutation = useMutation({
        mutationFn: () => signOut(supabase),
        onSuccess() {
            toast.success("You signed out successfully!")
            removeUserStatus()
            router.refresh()
        },
    })

    //authentication check on component load
    useEffect(() => {
        setAuthMutation.mutate()
    }, [])

    return (
        <Sidebar>
            <SidebarHeader >
                <div className="flex mx-auto cursor-pointer gap-x-2 py-2  mb-2 duration-500 rounded-md">
                    {!userInfo ?
                        <User2Icon className="w-12 h-12 rounded-3xl p-1 bg-black text-white " />
                        :
                        <>
                            <Image
                                src={userInfo.avatar}
                                width={200}
                                height={200}
                                alt="user image"
                                className="w-12 h-12 rounded-3xl"
                            />
                            <div className="my-auto ">
                                <p className="font-semibold text-[15px]">{userInfo.name}</p>
                                <p className="text-[#929292] text-[12px]">{userInfo.email}</p>
                            </div>
                        </>
                    }
                </div>

                {!userInfo ?
                    <Button
                        onClick={() => signInMutation.mutate()}
                        className="bg-black rounded-md font-semibold hover:bg-white hover:border border-black hover:text-black">
                        Sign in With Github
                    </Button>
                    :
                    <Button
                        className="bg-black rounded-md font-semibold hover:bg-red-500 hover:border-none"
                        onClick={() => signOutMutation.mutate()}>
                        Sign out
                    </Button>
                }

            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <div className={`flex items-center space-x-2 p-2 rounded-md ${isActive ? " text-black font-[700]" : "text-gray-600"}`}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex gap-x-2 cursor-pointer p-5 mx-auto rounded-xl duration-500 transition-all ">
                    <Settings className="w-12 h-12 p-1 rounded-3xl bg-black text-white" />
                    <p className="font-semibold my-auto text-[15px]">Task Manger</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}