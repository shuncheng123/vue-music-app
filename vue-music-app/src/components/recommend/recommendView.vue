<template>
  <div id="page" >
    <heads :actionMarks="page" @clickEvent="clickCbk" ></heads>
    <recommend-list :banners="banners" :recommendList="recommendList" @enter-song="enterSongList"></recommend-list>
    <transition name="slide">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import utils from '../../api/utils'
import heads from '../../common/head'
import recommendList from './recommendList'


export default {
  name: 'home',// ???
  data(){
    return{
      page: '推荐',
      banners: [], //轮播图
      recommendList: [], //推荐歌单
    }
  },
  components: {
    heads,
    recommendList,
  },
  methods: {
    init(){
      utils.sendRequest('http://localhost:3000/banner','get',(response) => {
          this.banners = response.banners;
      });
      utils.sendRequest('http://localhost:3000/personalized','get',(response) => {
          this.recommendList = response.result;
      });
    },
    enterSongList(data){
      this.$router.push({name: 'recommendDetails', params: {id: data.id,info : data}})
    },
    clickCbk(site){
      this.$router.push({ name: site});
    }
    
  },
  
  mounted() {
    
    this.init();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >


  //过渡动画
  .slide-enter-active,.slide-leave-active{
      transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
      transform: translate3d(100%,0,0)
  }

  #page{
    width: 7.50rem;
  }
</style>
