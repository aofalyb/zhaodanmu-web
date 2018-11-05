$(function () {
    $(window).ajaxStart(function () {
        NProgress.start();
    });
    $(window).ajaxSend(function () {
        NProgress.done();
    });
   // 监听搜索框回车事件并响应
   $("#zdm-nav-search input").on('keypress',function (e) {
       if (e.charCode == 13) {
           var value = $(this).val();
           var res = judgeInputval(value);
           $(this).popover();//初始化弹框 必须要有
           if (res < 0) {
               var html = '';
               if (res == -1){
                   html = '请输入查询内容';
               }else if (res == -2){
                   html = '最多输入12个字符';
               }
               // $(this).data('content',html);
               this.dataset.content = html;//设置弹框内容
               $(this).popover('show');//显示弹框
           }else{
               $(window).attr('location','searchResult.html?input_value='+value)
               $(this).popover('hide');//隐藏弹框
           }
       }
   });
   var judgeInputval = function (value) {
       value = $.trim(value);
       var res = 1;
       if (!value.length){
           res = -1;
       }else if (value.length > 12){
           res = -2;
       }
       return res;
   }
});