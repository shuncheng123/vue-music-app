<template>
  <div id="page">
    <div class="head">
      <div class="title">
        <i class="icon iconfont">&#xe62e;</i>
        <p>music</p>
        <i class="icon iconfont">&#xe602;</i>
        
      </div>
      
    </div>
    <div class="songList">

    </div>
  </div>
</template>

<script>
export default {
  name: 'home',// ???
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >

@font-face {
  font-family: 'iconfont';  /* project id 559253 */
  src: url('//at.alicdn.com/t/font_559253_wns9cvhsnc.eot');
  src: url('//at.alicdn.com/t/font_559253_wns9cvhsnc.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_559253_wns9cvhsnc.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_559253_wns9cvhsnc.woff') format('woff'),
  url('//at.alicdn.com/t/font_559253_wns9cvhsnc.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_559253_wns9cvhsnc.svg#iconfont') format('svg');
}

.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  #page{
    width: 6.40rem;
    color: #fff;    

    .head{
      height: 3.65rem;
      background: #d44538;

      .title{
        display: flex;
        justify-content: space-between;
        padding: 0 0.20rem;
        height: 0.66rem;
        line-height: 0.66rem;
        font-size: 0.20rem;

        i{
          display: inline-block;
          padding: 0 0.10rem;
          font-size: 0.30rem;
        }
        p{
          font-size: 0.22rem;
          
        }
      }
      
    }
  }
</style>
