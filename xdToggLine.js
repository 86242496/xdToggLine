(function (window, document) {
    var xdToggLine = function (targetDom, options) {
        // 判断是用函数创建的还是用new创建的。这样我们就可以通过xdToggLine("dom") 或 new xdToggLine("dom")来使用这个插件了  
        if (!(this instanceof xdToggLine)) return new xdToggLine(targetDom, options);

        // 参数合并  
        this.options = this.extend({
            // 这个参数以后可能会更改所以暴露出去  
            imgSrc: ""
        }, options);

        // 判断传进来的是DOM还是字符串  
        if ((typeof targetDom) === "string") {
            this.targetDom = document.querySelector(targetDom);
        } else {
            this.targetDom = targetDom;
        }

        this.CHARARR = ["A", "B", "C", "D", "E", "F", "G", "H", "I",]
        // 初始化  
        this.init();
    };
    xdToggLine.prototype = {
        init: function () {
            this.event();
        },
        extend: function (obj, obj2) {
            for (var k in obj2) {
                obj[k] = obj2[k];
            }
            return obj;
        },
        // 提示框
        toast: function (str) {
            $('body').append('<div class="splittoast">' + str + '</div>');
            setTimeout(function(){
                $('.splittoast').remove()
            },1000)
        },
        event: function () {
            var _this = this;
            var thishtml = $(_this.targetDom).html();
            $(_this.targetDom).append('<div><button class="xd-buttons xd-button-primary addLine">添加</button></div>');
            //  删除
            $(this.targetDom).find('.xdToggLinebox .deleteLine').on('click', function () {
                //最后一个时不能删除
                // if ($(_this.targetDom).find('.xdToggLinebox').length == 1) {
                //     $(_this.targetDom).find('.xdToggLinebox .deleteLine').remove();
                // }
                $(this).parent().remove();
                _this.orderNewHtml()
            })

            //  增加

            $(_this.targetDom).find('.addLine').on('click', function () {
                if ($(_this.targetDom).find('.xdToggLinebox').length == _this.CHARARR.length) {
                    _this.toast('不能再添加了');
                    return;
                }
                $(this).before($(_this.targetDom).find('.xdToggLinebox').eq(0).clone().append('<button class="xd-buttons xd-button-caution deleteLine">删除</button>'));
                $(_this.targetDom).find('.xdToggLinebox').eq($(_this.targetDom).find('.xdToggLinebox').length - 1).find('input').val("");
                $(this).unbind('click');
                $(_this.targetDom).find('.addLine').remove();
                new xdToggLine($(_this.targetDom));//实例化本身
                _this.orderNewHtml()
            })
           
        },
        orderNewHtml: function () {
            var _this = this;
            $(this.targetDom).find('.xdToggLinebox').each(function (index) {
                $(this).find('.chooseItem').html(_this.CHARARR[index]);
            })
        },
    };
    // 暴露方法
    window.xdToggLine = xdToggLine;
}(window, document));