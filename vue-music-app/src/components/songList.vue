<template>
  <div class="songList" id="songList"  ref="songList">
    <div
      class="coverPage"
      :style="{
        backgroundImage: 'url(' + this.$route.params.info.picUrl + ')'
      }"
    >
      <div class="coverPage-head">
        <i class="iconfont icon-left1" @click="rollback()"></i>
        <h2>歌单</h2>
      </div>
      <div class="coverPage-info">
        <h3>{{ this.$route.params.info.name }}</h3>
        <p>
          <i class="iconfont icon-erji"></i
          ><span>{{ this.$route.params.info.playCount | conversion }}</span>
        </p>
      </div>
    </div>

    <div class="playForm">
    <div class="playAll">
        <i class="iconfont icon-bofang1"></i>
        <p>
        播放全部<span>(共{{ this.$route.params.info.trackCount }}首)</span>
        </p>
    </div>
      <ul>
        <li v-for="(item, index) in songmusicList" :key="index">
          <p>{{ index + 1 }}</p>
          <div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.ar[0].name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import utils from "../api/utils.js";
import axios from "axios";

export default {
  data() {
    return {
      songmusicList: []
    };
  },
  methods: {
    init(songlistId) {
      axios
        .get("http://localhost:3000/playlist/detail?id=" + songlistId)
        .then(response => {
          this.songmusicList = response.data.playlist.tracks;
        })
        .catch(error => {
          console.log(error);
        });
    },
    rollback(){
        // 回退功能  跳转到父路由,显示父路由内自己的组件
        //  1.通过this.$router.go(-1)。但是如何传参 
        //
        //
        //
        console.log(this.$route.params.site);

        this.$router.replace({name: this.$route.params.site, params:{mark: true}});
        this.$router.go(-1);
    }
  },
  create(){
    //   window.addEventListener('scroll',function(e){
    //     //document.body.scrollTop
    //         console.log(document.documentElement.scrollTop);
    //     })
  },
  mounted() {
      
      
      //此方法在嵌套路由进行多次来回跳转时,会多次执行
    this.init(this.$route.params.id);

    console.log(history);
    

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
  font-size: 0.24rem;

  // 歌单信息
  .coverPage {
    position: relative;
    height: 5.5rem;
    background-size: cover;
    background-position: 0 30%;
    &-head{
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
      }
    }
    &-info{
        color: #fbfbfb;
        position: absolute;
        bottom: 0.25rem;
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
      .playAll{
            height: 0.70rem;
            line-height: 0.70rem;

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
          background-color: #f1f4f4;
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
      
      }
  }

</style>

