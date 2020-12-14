function buffermove(obj, json, fn) {
    function getstyle(obj, attr) {
        if (window.getComputedStyle) {
            return getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
    var speed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bstop = true; //假设所有的属性都到了。
        for (var attr in json) { //attr:属性   json[attr]:值
            //1.获取当前属性的值
            var currentvalue = 0;
            if (attr == 'opacity') {
                currentvalue = Math.round(getstyle(obj, attr) * 100);
            } else {
                currentvalue = parseInt(getstyle(obj, attr)); //非opacity
            }
            //求速度,如果是透明度，目标值也要夸大100倍
            speed = (json[attr] - currentvalue) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //判断运动停止
            //如果有一个属性到了目标点，立刻停止定时器--bug
            //思路：如果某个属性没有到目标点，继续运动。
            if (currentvalue != json[attr]) {
                if (attr == 'opacity') {
                    obj.style.opacity = (currentvalue + speed) / 100; //标准
                    obj.style.filter = 'filter: alpha(opacity:' + (currentvalue + speed) + ');'; //IE
                } else {
                    obj.style[attr] = currentvalue + speed + 'px';
                }
                bstop = false;
            }
        }
        //所有的属性都到了目标点，停止定时器
        if (bstop) {
            clearInterval(obj.timer);
            fn && fn();
        }
    }, 10);
}