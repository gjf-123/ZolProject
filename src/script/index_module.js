define(['jlazyload'], () => {
    return {
        init: function() {
            const $list = $('.menu li');
            const $cartlist = $('.cartlist');
            const $items = $('.item');
            $list.hover(function() {
                $cartlist.show();
                $(this).addClass('active').siblings('li').removeClass('active');
                //切换内容发生改变，不同的li对应不同的内容块
                $items.eq($(this).index()).show().siblings('.item').hide();
                //改变右侧的大盒子的位置
                let $scrolltop = $(window).scrollTop();
                let $bannertop = $('.banner').offset().top;
                if ($scrolltop > $bannertop) {
                    $cartlist.css({
                        top: $scrolltop - $bannertop
                    });
                } else {
                    $cartlist.css({
                        top: 0
                    });
                }
            }, function() {
                $cartlist.hide();
                $(this).removeClass('active')
            });
            //鼠标移入右侧的大盒子，大盒子依然显示隐藏
            $cartlist.hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });
            //检测是否用户已经登录
            // if (localStorage.getItem('loginname')) {
            //     $('.admin').show();
            //     $('.login').hide();
            //     $('.admin span').html(localStorage.getItem('loginname'));
            // }
            //退出登录 - 删除本地存储
            // $('.admin a').on('click', function() {
            //     $('.admin').hide();
            //     $('.login').show();
            //     localStorage.removeItem('loginname');
            // });
                                
            const  mine  =  $('.mid3  #con .content_li');         
            $.ajax({ url: 'http://10.31.161.16/ZolProject/PHP/index1.php', dataType: 'json' }).done(function(data)  {                                                       
                // data  =  datalist;  //获取接口里面数据  
                // console.log(data);                        
                let  strhtml = '';                          
                $.each(data, function(index, value) {
                    strhtml  +=  `
                    <li>
                      <a href='detail.html?sid=${value.sid}'>
                        <div> 
                        <img class='lazy' data-original='${value.url}' alt='' width="200" height="200">
                        </div>                                                
                        <p class='title'>${value.title}</p>
                        <p class='price'>￥${value.price}</p>
                      </a>
                    </li>
                    `;
                });  
                console.log(strhtml );                          
                mine[0].innerHTML = strhtml; //懒加载                                           
                $('img.lazy').lazyload({ effect: 'fadeIn'  });
            });
        }
    }
});