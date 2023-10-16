<template>
    <div id="popup" class="flex w-full items-center justify-center  min-h-screen fixed backdrop-blur-md z-50">
        <div class="flex flex-col items-center h-52 w-1/3 p-6 bg-white rounded-md z-50 shadoo">
            <span class="h-fit text-lg font-bold mb-2">Are you sure you want to cancel your subscription?</span>
            <span class="text-center">
                This is irreversible and no refunds will be provided. You will lose your subscription
                privileges immediately.
            </span>
            <div class="h-2/3 flex items-end">
                <button class="border-solid border-2 bg-red-600 text-white font-semibold rounded-md p-2 w-fit"
                    @click="cancelSub">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { userStore } from '~/stores/userStore'

export default {
    props: ['jwt'],

    setup(props) {
        console.log(props)
    },

    mounted() {
        this.store = userStore()
        const popupElement = document.getElementById("popup")
        console.log(popupElement)
        popupElement.addEventListener("click", (event) => {
            if (popupElement === event.target) {
                this.$emit("close_popup")
            }
        }, false)
    },

    data() {
        return
    },

    methods: {
        async cancelSub() {
            console.log("cancelling")
            try {
                const res = await fetch("http://localhost:6969/cancelSub", {
                    headers: {
                        "Authorization": `Bearer ${this.store.user.token}`
                    },
                    method: "GET",
                })

                if (res.status === 200) {
                    this.store.user.substate = "Inactive"
                    this.store.setUser(this.store.user)
                }

                window.location.reload()
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>
.shadoo {
    box-shadow: 13px 7px 58px -10px rgba(0, 0, 0, 0.75);

}
</style>