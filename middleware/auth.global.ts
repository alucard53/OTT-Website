import {useSubsData} from "~/stores/myStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useSubsData()
    if (!process.server) {
        // if ((to.fullPath==='/plan' || to.fullPath==='/dashb') && store.user.email==="") {
        //     console.log(store.user.email==="")
        //     return navigateTo("/login")
        // }
    }
})