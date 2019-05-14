<template>
    <div id="ranking">
        <heads actionMarks="排行"></heads>
        <ul>
            <li  v-for="(item,index) in rankingList" :key="index">
                <div>
                    <img v-lazy="item.coverImgUrl" lazy="loading loaded" alt="">
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

                    //待解决：这样用会报 rankingList数组下的属性undefined
                    // this.$set(this.rankingList,i,list)

                })
                .catch((error) => {
                    console.log("错误:"+error);
                })
            }
        }
    },
    created(){
        this.init();
    },
    mounted(){
        // console.log("接收值："+this.$route.params.actionMrka);
    }
}
</script>

<style lang="scss" scoped >
    #ranking{

        ul{
            padding: 0.10rem 0.16rem;
            height: calc(13.34rem - 1.6rem - 0.20rem); 
            overflow: scroll;

            li{
                display: flex;
                padding: 0.08rem 0;
                border-bottom: 0.02rem solid #ccc; 
                font-size: 0;
            }
            img{
                height: 1.82rem;
            }
            img[lazy=loading]{
                background-image: url('../../public/img/default.png');
                background-size: 100%;
            }
            img[lazy=loaded]{
                background-image: url('../../public/img/default.png');
                background-size: 100%;
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
                    color: #2e3030,
                }
            }
        }
    }
</style>

    
</style>
