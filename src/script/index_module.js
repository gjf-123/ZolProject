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
            if (localStorage.getItem('loginname')) {
                $('.admin').show();
                $('.login').hide();
                $('.admin span').html(localStorage.getItem('loginname'));
            }

            //退出登录 - 删除本地存储
            $('.admin a').on('click', function() {
                $('.admin').hide();
                $('.login').show();
                localStorage.removeItem('loginname');
            });

                                
            const  $mine  =  $('.mid3 .content_li');         
            $.ajax({ url: 'http://10.31.161.16/ZolProject/PHP/index1.php', dataType: 'json' }).done(function(data) {                                                       
                // console.log(data);                        
                let  $strhtml = '';                          
                $.each(data, function(index, value) { 
                    $strhtml += `
                          <li>
                            <a href="detail.html?sid=${value.sid}">
                              <div>
                                <img class="lazy" data-original="${value.url}"/>
                              </div>
                              <p class="title">${value.title}</p>
                              <p class="price">${value.price}</p>
                            </a>
                          </li>
                        `
                });  
                console.log($strhtml);    
                $mine.html($strhtml);                      
                // $mine.innerHTML = strhtml;                            
                $('img.lazy').lazyload({ effect: 'fadeIn' });
            });


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
                    var bstop = true;
                    for (var attr in json) {

                        var currentvalue = 0;
                        if (attr == 'opacity') {
                            currentvalue = Math.round(getstyle(obj, attr) * 100);
                        } else {
                            currentvalue = parseInt(getstyle(obj, attr));
                        }

                        speed = (json[attr] - currentvalue) / 5;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                        if (currentvalue != json[attr]) {
                            if (attr == 'opacity') {
                                obj.style.opacity = (currentvalue + speed) / 100;
                                obj.style.filter = 'filter: alpha(opacity:' + (currentvalue + speed) + ');';
                            } else {
                                obj.style[attr] = currentvalue + speed + 'px';
                            }
                            bstop = false;
                        }
                    }

                    if (bstop) {
                        clearInterval(obj.timer);
                        fn && fn();
                    }
                }, 10);
            }











            (function() {
                var baidu = document.querySelector('.baidu');
                var aBtn = document.querySelectorAll('.baidu ol li');
                var aPicList = document.querySelectorAll('.pic_list li');
                var oLeft = document.querySelector('#btn_left');
                var oRight = document.querySelector('#btn_right');
                var oUl = document.querySelector('.pic_list');
                var num = 0;
                var timer = null;
                var bstop = true;
                //改变布局
                var firstLi = aPicList[0].cloneNode(true);
                var lastLi = aPicList[aPicList.length - 1].cloneNode(true);
                oUl.insertBefore(lastLi, oUl.children[0]);
                oUl.appendChild(firstLi);

                //给ul设置宽度
                var liwidth = aPicList[0].offsetWidth;
                aPicList = oUl.children; //10张图
                oUl.style.width = liwidth * aPicList.length + 'px';
                oUl.style.left = -liwidth + 'px';


                //按钮添加点击事件进行类的切换图片的运动
                for (var i = 0; i < aBtn.length; i++) {
                    aBtn[i].index = i; //按钮上面自定义索引
                    aBtn[i].onclick = function() {
                        num = this.index; //当前的索引0-7
                        tabswitch();
                        aBtn[num].className = 'active';
                    }
                }

                //左右箭头显示
                // baidu.onmouseover = function() {
                //     oLeft.style.display = 'block';
                //     oRight.style.display = 'block';
                //     clearInterval(timer);
                // };
                // baidu.onmouseout = function() {
                //     oLeft.style.display = 'none';
                //     oRight.style.display = 'none';
                //     timer = setInterval(function() {
                //         oRight.onclick();
                //     }, 2000);
                // };

                //左右箭头添加点击事件
                oRight.onclick = function() {
                    if (bstop) {
                        bstop = false;
                        num++;
                        tabswitch();
                        if (num == aBtn.length) {
                            aBtn[0].className = 'active';
                        } else {
                            aBtn[num].className = 'active';
                        }
                    }

                }


                oLeft.onclick = function() {
                    if (bstop) {
                        bstop = false;
                        num--;
                        tabswitch();
                        if (num == -1) {
                            aBtn[aBtn.length - 1].className = 'active';
                        } else {
                            aBtn[num].className = 'active';
                        }
                    }
                }

                //切换的函数
                function tabswitch() {
                    for (var i = 0; i < aBtn.length; i++) {
                        aBtn[i].className = '';
                    }
                    //移动的核心
                    buffermove(oUl, {
                        left: -liwidth * (num + 1)
                    }, function() {
                        //每次运动完成之后确认是否是最后一张，如果是，位置重新设置
                        if (num == aBtn.length) {
                            oUl.style.left = -liwidth + 'px';
                            num = 0; //重置了
                        }

                        if (num == -1) {
                            oUl.style.left = -liwidth * aBtn.length + 'px';
                            num = aBtn.length - 1;
                        }
                        bstop = true;
                    });
                }


                timer = setInterval(function() {
                    oRight.onclick();
                }, 2000);
            })()

        }
    }
});