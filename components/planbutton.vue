
<template>
    <div class="container">
        <div class="button">
            <div class="op" :class="op1" @click="() => { op2 = ''; op1 = 'sel' }">
                Monthly
            </div>
            <div class="op" :class="op2" @click="() => { op1 = ''; op2 = 'sel' }">
                Yearly
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PlanButton',
    data() {
        return {
            op1: '',
            op2: '',
        }
    },
    mounted() {
        console.log(process.env)
    }
}

</script>

<style scoped>
.op {
    color: white;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 8%;
    padding-bottom: 8%;

    font-size: large;
}

.sel {
    background-color: white;
    color: #1f4c90;
    border-radius: 8rem;
    font-weight: bolder;
}

.container {
    display: flex;
}

.button {
    display: flex;
    background-color: #1f4c90;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 1%;
    padding-bottom: 1%;
    border-radius: 4rem;
    justify-content: center;
    align-items: center;
}
</style>