window.onload = function () {
    document.querySelector('.main_right').addEventListener('touchmove',function(e){

        e.preventDefault();

    });
    document.querySelector('.main_left').addEventListener('touchmove',function(e){

        e.preventDefault();

    });
    /*区域滚动效果*/
    /*条件：一个容器装着一个容器html结构*/
    /*找到大容器*/
    /*子容器大于父容器*/
    new IScroll(document.querySelector('.main_right'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.main_left'),{
        scrollX:false,
        scrollY:true
    });
}