$(function () {
    let poke = [],
        colorArr = ['r', 'f', 'm', 'b'],
        flag = [],
        table = $('.table'),
        leftBtn = $('.leftBtn'),
        rightBtn = $('.rightBtn');


    /*  for(let i=0;i<52;i++){
         // let obj = {};
         let color = colorArr[Math.floor(Math.random()*4)],
          num = Math.floor(Math.random()*13+1);
         do{
            color = colorArr[Math.floor(Math.random()*4)];
            num = Math.floor(Math.random()*13+1);
         }while(flag[color+'_'+num]);
         poke.push({color,num});
         flag[color+'_'+num]=true;
      }*/
    while (poke.length < 52) {
        let color = colorArr[Math.floor(Math.random() * 4)],
            num = Math.floor(Math.random() * 13 + 1);
        if (!flag[color + '_' + num]) {
            poke.push({color, num});
            flag[color + '_' + num] = true;
        }
    }
    // console.log(poke)
    let index = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= i; j++) {
            let divs = $('<div>');
            let left = 350 - 50 * i + 100 * j, top = 50 * i;
            divs
                .addClass('poke').appendTo('.table')
                .attr('id', `${i}_${j}`) //标记位置
                .data('num', poke[index].num)
                .delay(index * 100)
                .animate({left, top, opacity: 1})
                .css({
                    backgroundImage: `url('img/${poke[index]['color']}_${poke[index]['num']}.JPG')`,
                    backgroundSize: 'cover'
                });
            index++;
        }
    }
    //////////////////////////////////////////////////////////////////
    //下面的poke
    // let history = [];
    for (; index < poke.length; index++) {
        let divs = $('<div>');
        divs
            .addClass('poke left').appendTo('.table')
            .attr('id', -2 + '_' + -2)
            .data('num', poke[index].num)
            .delay(index * 100)
            .animate({left: 0, bottom: 0, opacity: 1})
            .css({
                backgroundImage: `url("img/${poke[index]['color']}_${poke[index]['num']}.JPG")`, backgroundSize: 'cover',zIndex:index
            });
        // history.push(divs);
        // $('.box').append(history[history.length - 1]);

    }
  /*  $('.right').click(function () {
        let box = $('.box');
        box.append(box.children().first())
    });
    $('.left').click(function () {
        let box = $('.box');
        box.prepend(box.children().last())
    });*/
  //////////////////////////////////////////////////////////////////
    //左右按钮
    // let zIndex=0;
    rightBtn.on('click',function () {
        if(!$('.left').length){
            return ;
        }
        // zIndex++;
        $('.left').last().css({zIndex:function () {
            return  $('.right').eq(0).css('zIndex')*1+1;//显示时是右边的最后一个，在布局中是第一个
        }}).removeClass('left').addClass('right').animate({left:'+=700'})
    });
    leftBtn.on('click',function () {
       /* if (!$('.right').length) {
            return;
        }*/
        !!$('.right') && $('.right').each(function (index,obj) {
            let zIndex = $('.right').eq(-1).css('zIndex')*1 + 1;
            //&(obj) $(this) &('.right')[index]
            $(this).last()
                    .removeClass('right').addClass('left')
                    .delay(index * 50).animate({left: '-=700',zIndex})
        });
    });
    ////////////////////////////////////////////////////////////////
    //选中 游戏
    let first = null;//保存
    table.on('click', '.poke', function () {
        /*
        *     （x,y）
        * (x+1,y)(x+1,y+1)
        *
        * 获取到的是字符串coords[0]，要转换成数值类型
        * 获取到的是对象，为真，通过length判断
        * */
        let coords = $(this).attr('id').split('_');
        if ($(`#${coords[0] * 1 + 1}_${coords[1] * 1}`).length || $(`#${coords[0] * 1 + 1}_${coords[1] * 1 + 1}`).length) {
            return;
        }
        if ($(this).hasClass('active')) {
            $(this).animate({top: '+=10'})
        } else {
            $(this).animate({top: '-=10'})
        }
        $(this).toggleClass('active');
////////////////////////////////////////////////////////////////////////////
        //删除
        if (!first) {
            first = $(this);
        } else {
            let cur = first.data('num'), that = $(this).data('num');
            console.log(cur,that);
            if (cur + that == 14) {
                /*let his = $(history[history.length - 1]).data('num');
                if (cur == his || that == his) {
                    $('.box').children().last().remove();
                    history.pop();
                    // console.log(1)
                }*/
                $('.active').animate({
                    top: 0, left: 700
                }, function () {
                    $(this).remove();
                })
            } else {
                $('.active').animate({top: '+=10'}, function () {
                    $('.active').removeClass('active');
                })
            }
            first = null;
        }
    });

});