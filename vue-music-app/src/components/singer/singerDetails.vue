<template>
 <div class="songList" id="songList"   ref="songListEl">
    <div class="songList-head" :style="{background: 'rgba(212, 68, 57,'+diaphaneity+')'}">
        <i class="iconfont icon-left1" @click="$router.go(-1);"></i>
        <h2 >{{titleName}}</h2>
    </div>
    <div class="coverPage" :style="{backgroundImage: 'url(' + this.$route.params.singerInfo.img1v1Url + ')'}">
        <div class="coverPage-info">
            <h3>{{ this.$route.params.singerInfo.name }}</h3>
            
        </div>
    </div>

    <div class="playForm">
        <div class="playAll">
            <i class="iconfont icon-bofang1"></i>
            <p>
            播放全部<span>(共{{ musicList.length}}首)</span>
            </p>
        </div>
        <ul>
            <li v-for="(item, index) in musicList" :key="index">
            <p>{{ index + 1 }}</p>
            <div>
                <h3>{{ item.name }}</h3>
                <p>{{ item.ar[0].name }}</p>
            </div>
            </li>
        </ul>
        <div v-show="!musicList.length" class="loadingBox">
            <Loading></Loading>
        </div>
    </div>
  </div> 
</template>


<script>

import axios from "axios";

import utils from "../../api/utils.js";
import Loading from "../../common/loading"

export default {
  data() {
    return {
      musicList: [],
      diaphaneity: 0,
      titleName: '歌手',
    };
  },
  methods: {
    init(id) {
      axios
        .get("http://localhost:3000/artists?id=" + id)
        .then(response => {
        //   this.songmusicList = response.data.playlist.tracks;
        this.musicList = response.data.hotSongs;
        })
        .catch(error => {
          console.log(error);
        });
    },
    add(){
        this.one = false;
       return utils.throttle.apply(this,arguments);
    },
    scroll_Action(){
        var InscrollTop = this.$refs.songListEl.scrollTop;
        if(InscrollTop <= 300){
            this.diaphaneity = (InscrollTop /300).toFixed(2);
            this.titleName = '歌单';
        }else{
            this.diaphaneity = 1;
            this.titleName = this.$route.params.singerInfo.name;
        }
    }
  },
  components:{
      Loading,
  },
    //此方法在嵌套路由进行多次来回跳转时,会多次执行
  mounted() {
    this.$refs.songListEl.addEventListener('scroll',utils.throttle(this.scroll_Action,200))
    this.init(this.$route.params.id);
  },

  filters: {
    conversion(count) {
      return utils.conversion(count);
    }
  }
};
</script>


<style scoped lang="scss">
.songList {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  font-size: 0.24rem;
  overflow: scroll;
  height: 13.34rem;
  background: #f1f4f4;

    &-head{
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 100;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #f1f4f4;
        background: rgba(255,0,0,0.5);
        i {
            padding: 0 0.1rem;
            display: inline-block;
            font-size: 0.4rem;
        }
        h2{
        display: inline-block;
        font-size: 0.34rem;
        font-weight: normal;
        }
    }
  // 歌单信息
  .coverPage {
    position: relative;
    height: 5.5rem;
    background-size: cover;
    background-position: 0 30%;

    &::before{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.2;
    }
    
    &-info{
        color: #fbfbfb;
        position: absolute;
        bottom: 0.45rem;
        padding-left: 0.25rem;

        h3{
            margin-bottom: 0.06rem;
            font-size: 0.30rem;
            font-weight: bold;
            max-width: 6.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        i{
            font-size: 0.26rem;
            margin-right: 0.10rem;
        }
    }
  }

    // 歌单列表
  .playForm{
        position: relative;
        width: 100%;
        top: -0.20rem;
      .playAll{
            height: 0.70rem;
            line-height: 0.70rem;
            border-top-left-radius: 0.20rem;
            border-top-right-radius: 0.20rem;
            background: #f1f4f4;

            i{
                text-align: center;
                display: inline-block;
                height: 100%;
                width: 0.90rem;
            }
            p{
                font-size: 0.30rem;
                display: inline-block;
            }
            span{
                font-size: 0.24rem;
                color: #656965;
            }

        }
      ul{
        
        li{
            display: flex;
            height: 1.1rem;
            padding: 0.10rem 0;
            border-top: 0.02rem solid #e3e3e3;
            box-sizing: border-box;
            > p{
                width: 0.90rem;
                text-align: center;
                height: 0.90rem;
                font-size: 0.26rem;
                color: #656965;
                line-height: 0.90rem;
            }
            div{
                h3{
                    font-size: 0.30rem;
                    font-weight: normal;
                    margin-bottom: 0.10rem;
                    max-width: 6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }  
                p{
                    font-size: 0.24rem;
                    color: #656965;
                }
            }
          }
      }
      .loadingBox{
        height: 7.64rem;
        line-height: 7.64rem;
      }
      
      }
  }

</style>

