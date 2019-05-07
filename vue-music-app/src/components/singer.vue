<template>
    <div id="singer">
        <heads actionMarks="歌手"></heads>
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
            singerList: {},
            hotSingerList: [],
        }
    },
    components:{
        heads,
    },
    methods:{
        init(){
            
            axios.get('http://localhost:3000/toplist/artist?limit=10')// 热门歌手
            .then((response) => {
                let list = response.data.list.artists.slice(0,10);
                this.hotSingerList = list;
            })
            .catch((error) => {
                console.log("错误:"+error);
            })

            axios.get('http://localhost:3000/top/artists?limit=100')// 歌手
            .then((response) =>{
                let artists = response.data.artists;
                let list = {};
                let newlist = {};
                artists.forEach(element => {
                    let pyinStr =  pinyin.getFullChars(element.name).slice(0,1);
                    if(list[pyinStr] === undefined){
                        list[pyinStr] = [];
                    }
                    list[pyinStr].push(element);
                });
                
                // 排序对象里的字母属性。(如果一开始就设定ABC...属性,那么就无需调整,直接push进相应的属性里去)
                let letter = Object.keys(list).sort((a,b) => {
                    return a.charCodeAt() - b.charCodeAt();
                })
                for(let i in letter){
                    newlist[letter[i]] = list[letter[i]];
                }
                this.singerList = newlist;
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
            overflow: scroll;
            height: calc(13.34rem - 1.60rem);

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
