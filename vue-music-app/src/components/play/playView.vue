<template>
    <div class="playInterface">

        <div class="playInterface-head">
            <i class="iconfont icon-xiala" @click="$router.go(-2)"></i>
            <div>
                <h3> {{songs.name}} </h3>
                <p> {{songs.ar && songs.ar[0].name}} </p>

            </div>
        </div>

        <div class="playInterface-content">
            <div class="musicPicture">
                <img :src="songs.al && songs.al.picUrl" alt="">

            </div>
        </div>

        <div class="playInterface-control">
            <div class="progressBar">
                <span>0:00</span>
                <div class="bar">
                    <div class="ball"></div>
                </div>
                <span>0:00</span>
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

import utils from '../../api/utils'


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
    created(){
        console.log(this);
    },
    methods:{
        init(id){
            let url = 'http://localhost:3000/song/detail?ids='+id;
            utils.sendRequest(url, 'get', (response) => {
                this.songs = response.songs[0];
                console.log(response.songs);

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
            color: #f1f1f1;
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
                display: flex;
                justify-content: space-between;
                font-size: 0.26rem;
                align-items: center;
                margin-bottom: 0.15rem;

                span{

                }

                .bar{
                    position: relative;
                    width: 4.6rem;
                    height: 0.10rem;
                    background: #333;
                }
                .ball{
                    position: absolute;
                    top: -0.12rem;
                    width: 0.14rem;
                    height: 0.14rem;
                    border: 0.10rem solid #fff;
                    background: #f00;
                    border-radius: 50%;
                }
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
