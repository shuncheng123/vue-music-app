<template>
    <div class="loading">
        <img src="../assets/loading.gif" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped >
    .loading{
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 0;
       
        img{
            width: 0.50rem;
            // transform: translateY(-50%);
        }
    }
</style>
