define(['jcookie'], () => {
    return {
        init: function() {
            //1.通过地址栏获取列表页面传入的sid。
            let $sid = location.search.substring(1).split('=')[1];

            if (!$sid) { //列表页面没有传入sid，默认为1
                $sid = 1;
            }

            //2.将sid传给后端，后端根据对应的sid返回不同的数据。
            $.ajax({
                url: 'http://10.31.161.16/ZolProject/PHP/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {

                $('#smallpic').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);
                $('#bpic').attr('src', data.url);

                //渲染小图
                let $picurl = data.urls.split(',');
                let $strhtml = '<ul>';
                const $list = $('#list');
                $.each($picurl, function(index, value) {
                    $strhtml += `<li><img src="${value}"/></li>`;
                });
                $strhtml += '<ul>';
                $list.html($strhtml);
            });


            const $left = $('#left');
            const $right = $('#right');




            //小图切换 - 小图是渲染出来的，找不到li。
            $('#list').on('click', 'li', function() {
                let imgurl = $(this).find('img').attr('src');
                $('#smallpic').attr('src', imgurl);
                $('#bpic').attr('src', imgurl);
            });


            //左右箭头事件
            let $num = 6;
            $right.on('click', function() {
                let $lists = $('#list ul li');
                if ($lists.size() > $num) {
                    $num++;
                    $left.css('color', '#333');
                    if ($lists.size() == $num) {
                        $right.css('color', '#fff');
                    }

                    //列表运动
                    $('#list ul').animate({
                        left: -($num - 6) * $lists.eq(0).outerWidth(true)
                    });
                }
            });
            $left.on('click', function() {
                let $lists = $('#list ul li');
                if ($num > 6) {
                    $num--;
                    $right.css('color', '#333');
                    if ($num <= 6) {
                        $left.css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 6) * $lists.eq(0).outerWidth(true)
                    });
                }
            });


            //4.购物车：(商品sid、商品数量)

            let arrsid = [];
            let arrnum = [];


            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }


            $('.p-btn a').on('click', function() {
                getcookietoarray();
                if ($.inArray($sid, arrsid) === -1) {
                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else {

                    let $index = $.inArray($sid, arrsid);

                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
                alert('您购买的商品已成功添加进购物车');
            });
        }
    }
});