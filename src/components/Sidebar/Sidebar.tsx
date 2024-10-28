'use client'
import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { supabase } from "@/utils/supabase"
import { getUser, getUserSession, signInWisthGithub, signout } from "@/utils/axios"
import useAuth from "@/hooks/useAuth"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    console.log(supabase);
    const {auth,setAuth}:any=useAuth()
    // if(!auth){
        // setAuth(supabase.auth)
    // }
    console.log(supabase.auth);
    return (
        <Sidebar>
            <SidebarHeader >
                <div className="flex">
                    <User />
                    user name
                    <button onClick={()=>signInWisthGithub(supabase)}>sign in with github</button>
                    <button onClick={()=>signout(supabase)}>sign out</button>
                    <button onClick={()=>getUser(supabase)}>getUser</button>
                    <button onClick={()=>getUserSession(supabase)}>getUser session</button>
                    
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}