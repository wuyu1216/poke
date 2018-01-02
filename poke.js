$(function () {
   let poke = [],
    colorArr = ['r','f','m','b'],
       flag=[];

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
   while(poke.length<52){
       let color = colorArr[Math.floor(Math.random()*4)],
           num = Math.floor(Math.random()*13+1);
       if(!flag[color+'_'+num]){
          poke.push({color,num});
          flag[color+'_'+num] = true;
       }
   }
   // console.log(poke)
    let index = 0;
    for(let i=0;i<7;i++){
      for(let j=0;j<=i;j++){
          let color = colorArr[Math.floor(Math.random()*4)],
              num = Math.floor(Math.random()*13+1);
         let divs = $('<div>');
         let left = 350 - 50*i + 100*j,top = 50*i;
         divs.addClass('poke').appendTo('.table').delay(index*100).animate({left,top,opacity:1}).css({backgroundImage:`url("img/${color}_${num}.JPG")`,backgroundSize:'cover'})
      }
      index++;
    }
    for(;index<poke.length;index++){
        let color = colorArr[Math.floor(Math.random()*4)],
            num = Math.floor(Math.random()*13+1);
        let divs = $('<div>');
        divs.addClass('poke').appendTo('.table').delay(index*100).animate({left:0,bottom:0,opacity:1}).css({backgroundImage:`url("img/${color}_${num}.JPG")`,backgroundSize:'cover'})
    }
});