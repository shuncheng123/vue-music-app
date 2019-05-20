

import axios from 'axios';

export default {

    // 对象数组去重
    unique(arr, u_key){ // 数组, 对象Key值
        let result = {};
        let finalResult = [];

        for(let i = 0; i<arr.length; i++){
            
            if(!result[arr[i][u_key]]){
                result[arr[i][u_key]] = arr[i];
                finalResult.push(arr[i]);
            }
        }
        return finalResult;
    },
    
    // 节流
    throttle(method, delay){
        let last = 0; //采用闭包来封装全局功能,这个闭包属性很关键(如果不采用闭包属性,那么last属性就必须定义在组件内)
        let key = null;
        return function(){
            let now = new Date();
            clearInterval(key);
            if(last == 0){ //首次不执行
                last = now;
            }
            if(now - last > delay){
                method.apply(this,arguments);
                last = now;
            }
            //事件触发停止后，隔150ms再执行一次
            key = setTimeout(function(){
                method.apply(this,arguments);
            }.bind(this),50);
        }
    },

    // 播放量装换
    conversion(count){
        count = count.toString().split('.')[0];
        if(count.length >= 9){
           return ((Number(count)/100000000).toFixed(1)/1) + '亿';
        }else if(count.length >= 5){
           return (Number(count)/10000).toFixed(0) + '万';
        }else{
          return count;
        }
      },

    // request
        /* 
                         url  String    请求地址
                 requestType  String    请求类型
             successCallback  Function  成功回调
                       param  Object    请求对象
        
        */

    requestAction(url, requestType, successCallback, param ){

        let resove = (response)=> {
            successCallback && successCallback(response.data);
        }
        let reject = (error)=> {
            console.log('请求报错:'+ error);
        } 

        if(requestType === 'get'){
            axios.get(url)
            .then(resove)
            .catch(reject)
        }else if(requestType === 'post'){
            axios.post(param, url)
            .then(resove)
            .catch(reject)
        }

    }
    
}