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
        return function(){
            let now = new Date();
            if(last == 0){ //首次不执行
                last = now;
            }
            if(now - last > delay){
                method.apply(this,arguments);
                last = now;
            }
        }
    },
}