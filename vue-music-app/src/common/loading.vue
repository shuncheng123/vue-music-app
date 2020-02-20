<template>
    <div class="loading"  :style="{height: setHeight}">
        <img src="../assets/loading.gif" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        setHeight: {
            types: String,
            default: '100%',
        }
    }
}
</script>

<style lang="scss" scoped >
    .loading{
        position: relative;
        display: block;
        width: 100%;
        font-size: 0;
       
        img{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0.50rem;
            transform: translate(-50%, -50%);
        }
    }
</style>
