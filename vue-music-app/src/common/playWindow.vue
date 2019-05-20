<template>
    <div class="playWindow">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            
        }
    },
    props:{
        musicImg:{

        },
        musicName:{

        },
        musicAuthor:{

        },
    }
    

}
</script>


<style lang="scss" scoped>
    .playWindow{
        display: flex;
        justify-content: space-around;
    }
</style>
