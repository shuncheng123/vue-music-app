<template>
    <div id="ranking">
        <heads></heads>
        <ul>
            <li v-for="(item,index) in rankingList" :key="index">
                <div>
                    <img v-bind:src="item.coverImgUrl" alt="">
                </div>
                <div class="musicList">
                    <p v-for="(song,i) in item.top" :key="i">{{i+1}}.&nbsp;{{song.name}}</p>
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
            MUSIC_TOP: [1,2,3,4,5,6,7,8,9,10]
        }
    },
    components:{
        heads: heads,
    },
    methods:{
        init() {
            let url = 'http://localhost:3000/top/list?idx='
            for(let i= 0; i< this.MUSIC_TOP.length; i++){
                axios.get(url+this.MUSIC_TOP[i])
                .then((response) => {
                    // 错误：一开始的写法初衷，请求到的数据，每次都是有序的渲染出来。
                    // this.rankingList[i] = response.data.playlist.tracks;
                    let list = response.data.playlist;
                    list.top = response.data.playlist.tracks.slice(0, 3)
                    this.rankingList.push(list);
                })
                .catch((error) => {
                    console.log("错误:"+error);
                })
            }
            

        }
    },
    created(){
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
