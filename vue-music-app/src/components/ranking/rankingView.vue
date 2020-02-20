<template>
    <div id="ranking">
        <heads :actionMarks="page" @clickEvent="clickCbk"></heads>
        <div class="wrapper" ref="wrapper">
            <ul  class="content">
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
        
    </div>
    
</template>

<script>

import axios from 'axios'
import Bscroll from 'better-scroll'
import utils from '../../api/utils'
import heads from '../../common/head'


export default {
    data(){
        return{
            page: '排行',
            rankingList: [],//排行歌单
            MUSIC_TOP: [1,2,3,4,5,6,7,8,9,10],
        }
    },
    components:{
        heads: heads,
    },
    methods:{
        init() {
            let url = 'http://localhost:3000/top/list?idx='
            for(let i= 0; i< this.MUSIC_TOP.length; i++){

                utils.sendRequest(url+i,  'get', (response) => {
                    // 错误：一开始的写法初衷，请求到的数据，每次都是有序的渲染出来。
                    // this.rankingList[i] = response.data.playlist.tracks;

                    let list = response.playlist;
                    list.top = response.playlist.tracks.slice(0, 3)
                    this.rankingList.push(list);

                    //待解决：这样用会报 rankingList数组下的属性undefined
                    // this.$set(this.rankingList,i,list)

                    

                })
            }
        },
        clickCbk(site){
            this.$router.push({ name: site});
        }
    },
    mounted(){
        this.init();

        this.scroll = new Bscroll(this.$refs.wrapper);
        // console.log("接收值："+this.$route.params.actionMrka);
        
    }
}
</script>

<style lang="scss" scoped >
    #ranking{

        .wrapper{
            overflow: hidden;
            padding: 0.10rem 0.16rem;
            height: calc(13.34rem - 1.6rem - 0.20rem); 
            ul{

                li{
                    display: flex;
                    padding: 0.08rem 0;
                    border-bottom: 0.02rem solid #ccc; 
                    font-size: 0;
                }
                li:last-child {
                    border-bottom: 0rem;
                }
                
                img{
                    height: 1.82rem;
                }
                img[lazy=loading]{
                    background-image: url('../../../public/img/default.png');
                    background-size: 100%;
                }
                img[lazy=loaded]{
                    background-image: url('../../../public/img/default.png');
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
    }

</style>

    
</style>
