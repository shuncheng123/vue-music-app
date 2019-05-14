<template>
    <div class="head">
      <div class="title">
        <i class="iconfont icon-cebianlan"></i>
        <p>music</p>
        <i class="iconfont icon-sousuo"></i>
      </div>
      
      <ul class="action">
        <li v-for="(item,index) in action" @click="action_atv(index,item.site)" :key="index">
          <!-- <span  v-bind:class="{active_Span: index == actionMarks }"> -->
          <span  v-bind:class="{active_Span: item.name == actionMarks }">
              {{item.name}}
          </span>
        </li>
      </ul>
    </div>    
</template>

<script>

export default {
    data(){
        return{
            action: [{
              name:'推荐',
              site: 'home'
            },{
              name:'排行',
              site: 'ranking'
            },{
              name:'歌手',
              site: 'singer'
            }],
        }
    },
    props: {
      actionMarks:{
          types: String,
          default: '推荐',
      }
    },
    methods: {
        action_atv(index,site){ 
          this.$router.push({ name: site})
        },
        update_actMrk(status){
          // this.actionMark = status;
        }
    },
    mounted(){
      console.log("初始化："+this.actionMarks);
    }
}
</script>

<style lang="scss" scoped>
    .head{
      background: #d44538;
      color: #f1f1f1;    
      width: 7.50rem;

      .title{
        display: flex;
        justify-content: space-between;
        padding: 0 .20rem;
        height: .80rem;
        line-height: .80rem;
        font-size: .24rem;

        i{
          display: inline-block;
          padding: 0 .10rem;
          font-size: .35rem;
        }
        p{
          font-size: 0.30rem;
          letter-spacing: .05rem;
          font-weight: 700;
          color: #f1f1f1;

        }
      }

      .action{
        display: flex;

        li{
          flex: 1;
          text-align: center;
          height: .80rem;
          line-height: 0.80rem;
          font-size: 0;

          span{
            padding: .03rem 0;
            color: #f1f1f1;
            font-size: .28rem;
          }

          .active_Span{
            border-bottom: .03rem solid #fff;
            color: #fff;
            font-weight: bold;
          }
        }
      }
      
    }
</style>
