/**
* 获取当前时间
*/
export default function orderNum(orderId) {
    var date = new Date();
    var year = date.getFullYear(); //月份从0~11，所以加一
    let month = date.getMonth();
    console.log("month", month);
    var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
    //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
    for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
            dateArr[i] = "0" + dateArr[i];
        }
    }
    //  生成随机四位数
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //调用
    var randnum = rand(1000, 9999);


    let strDate =
        year +
        dateArr[0] +
        dateArr[1] +
        dateArr[2] +
        dateArr[3] +
        dateArr[4] +
        orderId +
        randnum;
    //此处可以拿外部的变量接收  strDate:2022-05-01 13:25:30
    //this.date = strDate;
    // console.log("随机数==>", strDate);
    return strDate
}
// orderNum()