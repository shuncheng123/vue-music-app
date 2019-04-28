<template>
    <heads></heads>
</template>

<script>

import axios from 'axios'
import heads from '../common/head'


export default {
    data(){
        return{

        }
    },
    components:{
        heads: heads,
    },
    mounted(){

        let url = 'http://localhost:3000/top/list?idx='
        for(let i= 0; i< 23; i++){
            axios.get(url+i)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log("错误:"+error);
            })
        }
        
    }
}
</script>

<style>

</style>
