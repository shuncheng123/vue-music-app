<template>
    <div id="ranking">
        <heads></heads>
        <ul>
            <h1>你好</h1>
            <li v-for="(item,index) in rankingList" :key="index">
                <div>
                    <img v-bind:src="rankingPicture[index]" alt="">
                </div>
                <div class="musicList">
                    <p>1.&nbsp;{{item[0].name}}</p>
                    <p>2.&nbsp;{{item[1].name}}</p>
                    <p>3.&nbsp;{{item[2].name}}</p>
                </div>
            </li>
        </ul>
    </div>
    
</template>

<script>

import axios from 'axios'
import heads from '../common/head'


export default {
    data(){
        return{
            rankingList: [],//排行歌单
            rankingPicture: [],//排行图片
            arr: [111,222,333]
        }
    },
    components:{
        heads: heads,
    },
    methods:{
        init() {
            let url = 'http://localhost:3000/top/list?idx='
            for(let i= 0; i< 5; i++){
                axios.get(url+i)
                .then((response) => {
                    this.rankingList[i] = response.data.playlist.tracks;
                    this.rankingPicture[i] = response.data.playlist.coverImgUrl;
                    console.log();
                })
                .catch((error) => {
                    console.log("错误:"+error);
                })
            }

            console.log(this.rankingList);
            console.log(this.rankingPicture);
        }
    },
    mounted(){
        
        this.init();

        
        
        
    }
}
</script>

<style lang="scss" scoped >
    #ranking{

        ul{
            padding: 0.10rem 0.16rem;

            li{
                display: flex;
                padding: 0.05rem 0;
                border-bottom: 0.02rem solid #ccc; 
                font-size: 0;
            }
            img{
                height: 1.82rem;
                
            }
            .musicList{
                margin-left: 0.34rem;
                font-size: 0.24rem;
                padding: 0.16rem 0;

                p{
                    padding: 0.08rem 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 4rem;
                }
            }
        }
    }
</style>

    
</style>
