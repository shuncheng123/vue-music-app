<template>
    <div class="head">
      <div class="title">
        <i class="iconfont icon-cebianlan"></i>
        <p>music</p>
        <i class="iconfont icon-sousuo"></i>
      </div>
      
      <ul class="action">
        <li v-for="(item,index) in action" @click="action_atv(index,item)" :key="index">
          <span  v-bind:class="{active_Span: index == actionMrka }">
              {{index}}
          </span>
        </li>
      </ul>
    </div>    
</template>

<script>


export default {
    data(){
        return{
            action: {
              '推荐': 'home',
              '排行': 'ranking',
              '歌手': 'singer',
              },
            actionMrka: '推荐',
        }
    },
    methods: {
        action_atv(index,site){ // 点击按钮切换下标
          console.log(index);
          this.actionMrka = index;
          this.$router.push({ name: site, params: {'actionMrka' : index}})
        }
    },
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
