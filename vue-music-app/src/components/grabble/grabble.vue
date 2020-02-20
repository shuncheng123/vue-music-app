<template>
    <div class="grabble">
        <div class="grabble-head">
            <i @click="backspacing" class="iconfont icon-left1"></i>
            <input @input="inputEvent" v-model="grabbleValue" type="text" placeholder="搜索歌曲、歌手">
            <i class="iconfont icon-cross" v-show="grabbleValue" @click="deleteContent" ></i>
        </div>
        <div class="grabble-center" v-show="!this.grabbleValue">
            <div class="hot">
                <p>热门搜索</p>
                <Loading v-show="!this.hotGrabbleList.length" setHeight="1.6rem"></Loading>
                <ul class="hot-list">
                    <li v-for="(item, index) in hotGrabbleList" :key="index">{{item.first}}</li>
                </ul>
            </div>
            <div class="history">
                <div class="history-head">
                    <p>搜索历史</p>
                    <i class="iconfont icon-shanchu"></i>
                </div>
                <ul class="history-list">
                    <li  v-for="(item, index) of grabbleHistoryList" :key="index">
                        <p @click="enter">{{item}}</p><i @click="remove(index)" class="iconfont icon-cross"></i>
                    </li>
                    
                </ul>
            </div>
        </div>
        <div class="grabble-contentShow" v-show="this.grabbleValue">
            <Loading v-show="!this.grabbleContent.length" setHeight="100%"></Loading>
            <ul>
                <li v-for="(item ,index) in grabbleContent" :key="index">
                    <p>{{item.name}}</p>
                    <span>{{item.artists[0]['name']}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>




<script>

    import utils from '../../api/utils'
    import Loading from '../../common/loading'


    export default {
        data(){
            return{
                // 热门搜索
                hotGrabbleList: [],
                // 搜索历史
                grabbleHistoryList: ['周俊杰','周婷','钟鹏'],
                // input值
                grabbleValue: '',

                timouetKey: null,
                // 搜索内容
                grabbleContent: [],

            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                utils.sendRequest('http://localhost:3000/search/hot','get',(response) => {
                    this.hotGrabbleList = response.result.hots;
                });
                
            },
            
            inputEvent(event){
                this.timouetKey && clearTimeout(this.timouetKey);
                if(event.target.value == ''){
                    this.grabbleContent = [];
                    return ;
                }
                this.timouetKey = setTimeout(() =>{
                    utils.sendRequest('http://localhost:3000/search?keywords='+this.grabbleValue, 'get', (response) =>{
                        this.grabbleContent = response.result.songs;
                    })
                },500);
            },
            deleteContent(){
                this.grabbleValue = '';
                this.grabbleContent = [];
            },
            backspacing(){
                this.$router.push('/recommendView');
            },
            enter(){

            },
            remove(index){
                this.grabbleHistoryList.splice(1,index);
            }
        },
        computed:{
            isNull:function(){
                
            }
        },
        components:{
            Loading,
        }
        
    }
</script>

<style lang="scss" scoped>
    .grabble{
        height: 100%;
        &-head{
            height: 0.80rem;
            background: #d44538;
            font-size: 0;

            input{
                width: 5rem;
                border: none;
                height: 0.44rem;
                border-bottom: 0.02rem solid #EDB0AE;
                background: #D44538;
                color: #fff;
                outline: none;
                margin: 0.15rem 0;
                font-size: 0.26rem;
            }
            input::-webkit-input-placeholder {
                color: #EDB0AE;
            }
            i{
                float: left;
                width: 0.90rem;
                height: 100%;
                text-align: center;
                line-height: 0.80rem;
                font-size: 0.36rem;
                color: #FFFFFF;
            }
            i:last-child{
                float: right;
                font-size: 0.42rem;

            }
        }
        &-center{
            height: calc(100% - 0.80rem);
            padding: 0 0.45rem;
            padding-top: 0.42rem;
            .hot{

                p{
                    font-size: 0.24rem;
                    color: #838383;
                    margin-bottom: 0.24rem;
                }

                &-list{
                    overflow: hidden;
                    min-height: 0.80rem;

                    li{
                        float: left;
                        font-size: 0.30rem;
                        border: 1px solid #a2a4a7;
                        padding: 0.12rem 0.10rem;
                        border-radius: 0.15rem;
                        color: #2D302F;
                        margin-right: 0.13rem;
                        margin-bottom: 0.14rem;

                    }
                }
            }

            .history{
                padding: 0.20rem 0.10rem;
                
                &-head{
                    height: 0.60rem;
                    line-height: 0.60rem;
                    overflow: hidden;
                    p{
                        font-size: 0.24rem;
                        color: #838383;
                        float: left;
                    }
                    i{
                        float: right;
                        padding: 0 0.12rem;
                        width: 0.36rem;
                        text-align: center;
                    }
                }

                &-list{
                    font-size: 0.30rem;

                    li{
                        overflow: hidden;
                        height: 0.80rem;
                        line-height: 0.80rem;

                        p{
                            width: 90%;
                            float: left;
                        }

                        i{
                            width: 10%;
                            text-align: center;
                            float: right;
                            font-size: 0.40rem;
                        }
                    }
                }
            }
        }

        &-contentShow{
            height: calc(100% - 0.80rem);

            ul{
                padding-top: 0.20rem;

                li{
                    padding: 0.10rem 0.40rem;
                    border-bottom: 1px solid #e4e4e4;

                    p{
                        font-size: 0.34rem;
                        margin-bottom: 0.10rem;
                        color: #2E3030;
                    }
                    span{
                        font-size: 0.24rem;
                        display: block;
                        color: #757575;
                    }
                }
            }
        }
    }
</style>