<template>
    <div id="singer">
        <heads></heads>
        <div class="singer">
            <ul v-for="(item, index) in singerList" :key="index">
                <h4>{{index}}</h4>
                <li v-for="(gingerName, i) in item" :key="i">
                    <div>
                        <img v-bind:src="gingerName.img1v1Url" alt="">
                    </div>
                    <p>{{gingerName.name}}</p>       
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>

import axios from 'axios';
import pinyin from 'js-pinyin'

import heads from '../common/head'


export default {
    data(){
        return{
            singerList:{
                // 'A':[],
                // 'B':[]
            }
        }
    },
    components:{
        heads,
    },
    methods:{
        init(){
            axios.get('http://localhost:3000/top/artists?limit=100')
            .then((response) =>{
                let artists = response.data.artists;
                let list = {};
                artists.forEach(element => {
                    let pyinStr =  pinyin.getFullChars(element.name).slice(0,1);
                    if(list[pyinStr] === undefined){
                        list[pyinStr] = [];
                    }
                    list[pyinStr].push(element);
                });

                this.singerList = list;
                console.log(this.singerList);
            })
            .catch((error) => {
                console.log("错误:"+error);
            })


            var msg = '中国';

        },
    },
    mounted(){
        this.init();
    }
}
</script>

<style lang="scss" scoped>
    #singer{

        .singer{

            ul{
                font-size: 0.20rem;
                padding-left: 0.10rem;
                h4{
                    background: #d9dcdc;
                    height: 0.40rem;
                    line-height: 0.40rem;
                    padding-left: 0.10rem;
                    color: #fbfbfb;
                    margin-left: -0.10rem;
                }
                li{
                    display: flex;
                    font-size: 0;
                    padding: 0.10rem 0;
                    border-bottom: 0.02rem solid #e2e2e2;

                    img{
                        width: 0.90rem;
                    }
                    p{
                        margin-left: 0.35rem;
                        font-size: 0.20rem;
                        line-height: 0.90rem;
                    }
                }
                li:last-child{
                    border-bottom: 0rem;
                }
            }
        }
    }
</style>
