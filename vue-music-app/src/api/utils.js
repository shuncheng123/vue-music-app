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
    }
}