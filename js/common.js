function My$(id) {
    return document.getElementById(id);

}
//根据父级元素获得第一个子级元素
function getFirstChildElement(element) {
    if(element.firstElementChild)
    {
        return element.firstElementChild;
    }
    else{
        var node = element.firstChild;
        while(node && node!=1)
        {
            node = node.nextSibling;
        }
        return node;
    }
}
//根据父级元素获得最后一个子级元素
function getLastChildElement(element) {
    if(element.lastElementChild)
    {
        return element.lastElementChild;
    }
    else{
        var node = element.lastChild;
        while(node && node!=1)
        {
            node = node.previousSibling;
        }
        return node;
    }
}
//根据元素获得上一个元素
function getPreviousElement(element) {
    if(element.previousElementSibling)
    {
        return element.previousElementSibling;
    }
    else
    {
        node = element.previousSibling;
        while(node && node!=1)
        {
            node = element.previousSibling;
        }
        return node;
    }
}
//根据元素获得下一个元素
function getNextElement(element) {
    if(element.nextElementSibling)
    {
        return element.nextElementSibling;
    }
    else
    {
        node = element.nextSibling;
        while(node && node!=1)
        {
            node = element.nextSibling;
        }
        return node;
    }
}
//为任意元素，绑定任意的事件  任意的元素，任意的事件类型，任意的事件处理函数
function addEventListener(element,type,fn) {

    if (element.addEventListener) {
        console.log("1");
        element.addEventListener(type,fn,false);
    }
    else if (element.attachEvent) {
        console.log("2");
        element.attachEvent("on"+type,fn);
    }
    else {
        element["on"+type] = fn;
    }
}

//为任意元素，解绑任意的事件  任意的元素，任意的事件类型，任意的事件处理函数
function addEventListener(element,type,fnName) {

    if (element.removeEventListener) {
        console.log("1");
        element.removeEventListener(type,fnName,false);
    }
    else if (element.detachEvent) {
        console.log("2");
        element.detachEvent("on"+type,fnName);
    }
    else {
        element["on"+type] = null;
    }
}
function constantAnimate(element,target,step) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        // var step = 10;
        step = (target>current) ? step:-step;
        if (Math.abs(target-current) > Math.abs(step))
        {
            current+=step;
            element.style.left = current+"px";
        }
        else
        {
            element.style.left=target+"px";
            clearInterval(element.timeId);
        }
    },10);
}

//封装变速动画函数
function shiftAnimate(element,target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        var step = (target - current)/10;
        step = (step>0) ? Math.ceil(step):Math.floor(step);
        current+=step;
        element.style.left = current +"px";
        if (current == target)
        {
            clearInterval(element.timeId);
        }
    },10);
}
//封装最终变速动画函数
//参数element ：要实现动画效果的元素
//json:一个对象 ，该对象里面保存元素多个目标属性和值
//fn :函数名称 可实现函数回调
function animate(element,json,fn) {
    //清除定时器
    clearInterval(element.timeId);
    //定时器,返回的是定时器的id
    element.timeId = setInterval(function () {
        var flag = true;//默认,假设,全部到达目标
        //遍历json对象中的属性 以及属性对应的属性值
        for (var attr in json)
        {
            if (attr == "opacity")//判断这个属性attr中是不是opacity
            {
                var current = getStyle(element,attr)*100;
                var target = json[attr]*100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的值
                element.style[attr] = current / 100;
            }
            else if (attr == "zIndex") //判断这个属性attr中是不是zIndex
            {
                //层级改变就是直接改变这个属性的值
                element.style[attr] = json[attr];
            }
            else
            {//普通的属性
                //获得元素这个属性当前的值 有的属性值为带px单位的字符串 所以需要转化为数字
                var current = parseInt(getStyle(element,attr));
                var target = json[attr];
                step = (target - current)/10;
                var step = (step>0) ? Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr] = current +"px";
            }
            if (current != target)
            {
                flag = false;
            }
            //测试代码
            console.log("元素: "+element+",属性："+attr+"，目标:" + target + ",当前:" + current + ",每次的移动步数:" + step);
        }
        if (flag)
        {
            clearInterval(element.timeId);
            if (fn)
            {
                fn();
            }
        }

    },20);
}
//封装getScroll函数
function getScroll(){
    return {
        left : window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
        top : window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    };
}
//封装getStyle函数
function getStyle(element,attr) {
    if (window.getComputedStyle)
    {
        return window.getComputedStyle(element,null)[attr];
    }
    else
    {
        return element.currentStyle[attr];
    }
}
//封装计算事件位置属性的对象
var evt = {
    getEvent: function (evt) {//获得当前事件
        return evt ? evt : window.event;
    },
    getClientX: function (evt) {
        return this.getEvent(evt).clientX;
    },
    getClientY: function (evt) {
        return this.getEvent(evt).clientY;
    },
    getScrollX: function () {
        return window.pageXOffset || document.documentElement.scrollWidth
            || document.body.scrollWidth || 0;
    },
    getScrollY: function () {
        return window.pageYOffset || document.documentElement.scrollHeight
            || document.body.scrollHeight || 0;
    },
    getX: function (evt) {
        return this.getEvent(evt).pageX ? this.getEvent(evt).pageX : this.getClientX(evt) + this.getScrollX;
    },
    getY: function (evt) {
        return this.getEvent(evt).pageY ? this.getEvent(evt).pageY : this.getClientY(evt) + this.getScrollY;
    },
};
function PutLarge(){
    document.body.innerHTML = "<div class = \"small\" id=\"small\">\n" +
        "    <img src=\"../images/small.png\"/>\n" +
        "    <div class=\"mask\" id=\"mask\" ></div>\n" +
        "</div>\n" +
        "<div class = \"big\" id = \"big\">\n" +
        "    <img src=\"../images/big.jpg\" id=\"big-img\"/>\n" +
        "</div>";
    My$("small").onmouseover = function () {
        My$("mask").style.display = "block";
        My$("big").style.display = "block";
        //鼠标移动
        document.onmousemove = function (e) {
            var x = evt.getX(e);
            var y = evt.getY(e);
            x = x - My$("small").offsetLeft - My$("mask").offsetWidth / 2;
            y = y - My$("small").offsetTop - My$("mask").offsetHeight / 2;
            //X轴、Y轴移动的最小距离为0
            x = x > 0 ? x : 0;
            y = y > 0 ? y : 0;
            //X轴、Y轴移动的最大距离为
            var maxX=  My$("small").offsetWidth - My$("mask").offsetWidth;
            var maxY=  My$("small").offsetHeight - My$("mask").offsetHeight;
            x = (x > maxX) ? maxX : x;
            y = (y > maxY) ? maxY : y;
            //遮挡层移动
            My$("mask").style.left = x;
            My$("mask").style.top = y;

            //大图片移动
            //移动比例为 ： 遮挡层移动距离/大图片移动距离 = 遮挡层最大移动距离/大图片最大移动距离
            //大图片移动距离 = 遮挡层移动距离*大图片最大移动距离/遮挡层最大移动距离
            var bigX = x * (My$("big-img").offsetWidth - My$("big").offsetWidth) / maxX;
            var bigY = y * (My$("big-img").offsetWidth - My$("big").offsetWidth) / maxX;
            My$("big-img").style.marginLeft = -bigX+"px";
            My$("big-img").style.marginTop = -bigY+"px";
        };
    };
    My$("small").onmouseout = function () {
        My$("mask").style.display = "none";
        My$("big").style.display = "none";
        document.onmousemove = null;
    };
}