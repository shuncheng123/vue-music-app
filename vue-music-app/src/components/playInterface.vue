<template>
    <div class="playInterface">

        <div class="playInterface-head">
            <i class="iconfont icon-xiala" @click="$router.go(-2)"></i>
            <div>
                <h3> {{songs.name}} </h3>
                <p> {{musicName}} </p>
            </div>
        </div>

        <div class="playInterface-content">
            <div class="musicPicture">
                <img :src="songs.al && songs.al.picUrl" alt="">
            </div>
        </div>

        <div class="playInterface-control">
            <div class="progressBar">

            </div>
            <div class="control">
                <i class="iconfont icon-xunhuanbofang"></i>
                <i class="iconfont icon-shangyiqu101"></i>
                <i class="iconfont icon-plus-pause"></i>
                <i class="iconfont icon-xiayiqu101"></i>
                <i class="iconfont icon-aixin"></i>
            </div>
        </div>

    </div>
</template>


<script>
// import axios from 'axios';

import utils from '../api/utils'


export default {
    data(){
        return{
            songs: [],
            imgUrl: 'https://p1.music.126.net/t3HaGVTPAnHYAgdbrhKPhg==/109951164080110631.jpg',
        }
    },
    computed:{
        musicName(){
            return this.songs.ar[0].name;
        }
    },
    props:{

    },
    mounted(){
        this.init(this.$route.params.data.id);
    },
    methods:{
        init(id){
            let url = 'http://localhost:3000/song/detail?ids='+id;
            utils.requestAction(url, 'get', (response) => {
                this.songs = response.songs[0];
                console.log(response.songs);
                // console.log(this.songs.ar[0].name);

            });
        }
    }
}
</script>


<style lang="scss" scoped>
    .playInterface{
        position: relative;
        font-size: 0.32rem;
        background-color: #928D87;
        

        &-head{
            text-align: center;
            height: 1rem;
            line-height: 1rem;
            i{
                position: absolute;
                left: 0rem;
                padding: 0 0.25rem;
                font-size: 0.42rem;
            }
            div{
                display: inline-block;
                width: 3.70rem;
                height: 100%;
                line-height: normal;
            }
            h3{
                font-size: 0.34rem;
                padding-top: 0.10rem;
                font-weight: normal;
            }
            p{
                font-size: 0.26rem;
                margin-top: 0.10rem;
            }
        }

        &-content{
            text-align: center;
            height: 12.34rem;
            .musicPicture{
                display: inline-block;
                margin-top: 1.80rem;
                width: 5.5rem;
                border-radius: 50%;
                font-size: 0;
                overflow: hidden;
                border: 0.30rem solid #89857f;

                img{
                    width: 100%;
                }
            }
        }

        &-control{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0.80rem;
            padding: 0 0.70rem;
            font-size: 0rem;

            .progressBar{

            }   

            .control{
                display: flex;
                justify-content: space-between;
                height: .88rem;
                line-height: .88rem;
                color: #fff;

                i{
                    font-size: 0.60rem;
                }
                i:nth-child(3){
                    font-size: 0.80rem;
                }
            }

        }
    }
</style>
