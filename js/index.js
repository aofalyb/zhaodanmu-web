//header动画效果实现分析
//1、header背景透明度初始状态为0
//2、header从开始移动到banner界面显示完成，对应的透明度从0 到0.85
//3、透明度到0.85后，继续往下移动透明度不再变化

// banner动画效果实现分析
//1、自动无缝播放，并且索引圆点相应变化.now样式
//2、可以左右滑动图片 并且图片跟随滑动距离和方向移动
//3、当滑动结束时距离小于1/3 图片回到滑动之前显示那张
//4、当滑动结束时距离大于1/3 图片显示下一张或者上一张 根据方向决定

//页面加载完成
window.onload = function () {

    hdOpcityChange();
    //轮播图
    bannerScroll();

    timeKill();
};
var bannerObj = document.querySelector('.jd_banner');
//函数实现header背景透明度变化
function hdOpcityChange() {
    var hdObj = document.querySelector('.jd_search_box');
    var height = bannerObj.offsetHeight;
    window.onscroll = function () {
        // console.log(document.body.scrollTop);
        // console.log(document.documentElement.scrollTop);
        // console.log(window.pageYOffset);
        var scrollY = window.pageYOffset || document.documentElement.scrollTop
            || document.body.scrollTop || 0;
        var currentOpcity = 0;
        console.log(scrollY);
        if (scrollY <= height){
            currentOpcity= scrollY/height * 0.85;
        }else{
            currentOpcity = 0.85;
        }
        console.log(currentOpcity);
        hdObj.style.background = 'rgba(201,21,35,'+currentOpcity+')';
    }
}
function bannerScroll() {
    var index = 1;//索引值
    var timerId = 0;//定时器ID值
    var ulObj = bannerObj.querySelector('.pic');//ul元素
    var width = bannerObj.offsetWidth;//容器宽度   移动长度为 index*width
    var indexObjs = bannerObj.querySelectorAll('.index li');
    //添加过渡功能
    var  addTransition = function(){
        ulObj.style.transition = 'all 0.2s linear';
        ulObj.style.webkitTransition = 'all 0.2s linear';
    };
    //清除过渡功能
    var removetransition = function () {
        ulObj.style.transition = 'none';
        ulObj.style.webkitTransition = 'none';
    };
    //设置x轴位移功能
    var setTransform = function (moveX) {
        ulObj.style.transform = 'translateX('+ moveX +'px)';
        ulObj.style.webkitTransform = 'translateX('+ moveX +'px)';
    }
    //修改索引圆点功能
    var changeIndex = function () {
        for (var i = 0; i < indexObjs.length; i++) {
            if (indexObjs[i].classList.contains('now')) {
                indexObjs[i].classList.remove('now');
            }
        }
        indexObjs[index - 1].classList.add('now');
    }
    //自动轮播图片功能
    var autoScroll = function () {
        timerId = setInterval(function () {
            index++;
            var moveX  = -index* width;
            //过渡
            addTransition();
            //平移
            setTransform(moveX);
        },1000);
    }
    //自动轮播图片
    autoScroll();
    //监听过渡事件是否完成 完成后判断索引值 webkitTransitionEnd
    console.dir(ulObj);
    var transitionEvent = whichTransitionEvent();
    console.log(transitionEvent);
    ulObj.addEventListener(transitionEvent,function () {
        console.log('hahahh');
        if (index == 9) {
            index = 1;
            //瞬间定位
            //清除过渡
            removetransition();
            //做位移
            setTransform(-index* width);
        }else if (index <= 0) {
            index = 8;
            //瞬间定位
            //清除过渡
            removetransition();
            //做位移
            setTransform(-index* width);
        }
        //索引圆点样式变化 1-8  ->  0-7  索引为：index-1
        changeIndex();
    });
    //监听是否滑动图片
    var startX = 0;
    var distanceX = 0;
    var ismove = false;
    ulObj.addEventListener("touchstart",function (e) {
        clearInterval(timerId);
        console.log('start');
        startX = e.touches[0].clientX;
    });
    ulObj.addEventListener("touchmove",function (e) {
        ismove = true;
        var currentX = e.touches[0].clientX;
        distanceX = currentX - startX;//往右边滑动 移动距离为正 x轴偏移值也为正
        //移动距离为当前位置 加滑动距离
        addTransition();
        setTransform(-index*width + distanceX);
    });
    ulObj.addEventListener("touchend",function (e) {
        if (ismove && Math.abs(distanceX) >= width/3){
            if (distanceX > 0){//往右边滑动 移动距离为正  上一张图片
                index--;
            }else {//往左边滑动 移动距离为负  下一张图片
                index++;
            }
        }
        //添加过渡
        addTransition();
        //位移
        setTransform(-index*width);
        //重置
        ismove = false;
        startX = 0;
        distanceX = 0;
        //结束滑动后继续自动轮播
        clearInterval(timerId);
         autoScroll();
    });
}
function whichTransitionEvent(){
    var t,
        el = document.createElement('surface'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        }
    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
var timeKill = function () {
    var time = 4* 60*60;
    spans = document.querySelectorAll('.time span');
    var timer = setInterval(function () {
        time --;
        /*格式化  给不同的元素html内容*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    }, 1000)
}