window.onload = function(){
    var oMap= document.getElementById('map');
    var doBtn = document.getElementById('do');
    var oText = document.getElementById('text');
    var control = document.getElementById('control');
    var numList = document.getElementById('num-list');
    var aLi = numList.getElementsByTagName('li');
    
    var face = 0;
    var num = 1; //记录textarea的列数

    addEvent(control,'click',main,true);
    //创建棋盘
    function mapFn(){
        var str = '';
        for(var i = 0 ; i < 100; i++){
            str += '<div class="mapBox"></div>';
        }
        str +='<div class="mover" id="mover" style="top:160px;left:160px; transform:rotate(0deg);"></div>'
        oMap.innerHTML = str;
    }
    mapFn();
    var mover= document.getElementById('mover');
    addEvent(oText,'focus',function(){
        var txtArr = oText.value.split('\n');
        numList.innerHTML = '';
        for(num = 1 ;num < txtArr.length;num++){
            numList.innerHTML += '<li>'+num+'</li>';
        }
        oText.value.trim();
    },true);
    var s = 0;
    addEvent(oText,'scroll', function() {
        if(oText.scrollTop > (num- 11)*24){
            oText.scrollTop = (num- 11)*24;
        }        
        var top = oText.scrollTop;
        numList.scrollTop = top;
    });
    
    function main(e){
        var e = e||window.event;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() == 'button'){
            if(target.id != 'do' && target.id != 'refresh'){
                numList.innerHTML += '<li>'+num+'</li>';
                num++;
                oText.value += target.innerHTML+'\n';
            }else if(target.id=='do'){
                doFn();
            }else if(target.id=='refresh'){
                numList.innerHTML ='';
                oText.value = ''
            }
        }    
    }
    //点击执行按钮
    function doFn(){
        var val = oText.value.trim().toLowerCase();
        var arr = val.split('\n');
        var i = 1;
        if(arr.length>0 && arr!=''){
            show(arr[0],0);
            aLi[0].style.backgroundColor = 'red';
            var timer = setInterval(function(){
                if(i<arr.length){
                    aLi[i-1].style.backgroundColor = '#ccc';
                    aLi[i].style.backgroundColor = 'red';
                    show(arr[i],i);
                    ++i;
                }else{
                    clearInterval(timer);
                }
            },500);
        }
    }
    //显示效果
    function show(cmd,i) {
        var cmdArr = cmd.trim().split(' ');
        if(cmdArr[0] == 'tun'){
            switch(cmdArr[1]){
                case 'lef':
                   turnLeft(cmdArr[2]);
                   break;
                case 'rig':
                   turnRight(cmdArr[2]);
                   break;
                case 'back':
                   turnBack(cmdArr[2]);
                   break;
            }             
        }else if(cmdArr[0] == 'tra'){
            switch(cmdArr[1]){
                case 'lef':
                   traLeft(cmdArr[2]);
                   break;
                case 'rig':
                   traRight(cmdArr[2]);
                   break;
                case 'top':
                   traTop(cmdArr[2]);
                   break;
                case 'bot':
                   traBottom(cmdArr[2]);
                   break;
            } 
        }else if(cmdArr[0] == 'mov'){
            switch(cmdArr[1]){
                case 'lef':
                   movLeft(cmdArr[2]);
                   break;
                case 'rig':
                   movRight(cmdArr[2]);
                   break;
                case 'top':
                   movTop(cmdArr[2]);
                   break;
                case 'bot':
                   movBottom(cmdArr[2]);
                   break;
            } 
        }else if(cmdArr[0] == 'go'){
            go(cmdArr[1]);
        }else{
            alert('请输入以下指令，'+'\n'+
                    'TRA LEF：向屏幕的左侧移动一格，方向不变'+'\n'+
                    'TRA TOP：向屏幕的上面移动一格，方向不变'+'\n'+
                    'TRA RIG：向屏幕的右侧移动一格，方向不变'+'\n'+
                    'TRA BOT：向屏幕的下面移动一格，方向不变'+'\n'+
                    'MOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格'+'\n'+
                    'MOV TOP：方向转向屏幕上面，向屏幕的上面移动一格'+'\n'+
                    'MOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格'+'\n'+
                    'MOV BOT：方向转向屏幕下面，向屏幕的下面移动一格)');
        } 
    }
    //前进
    function go(i=1){
        var left = mover.offsetLeft;
        var top = mover.offsetTop;
        if((face + 1) % 4 == 0){
            //朝左
            traLeft(i);
        }else if((face - 1) % 4 == 0){
            //朝右
            traRight(i);
        }else if(face % 4 == 0){
            //朝上
            traTop(i);
        }else if((face - 2) % 4 == 0){
            //朝下
            traBottom(i);
        }
    }
    //向左转
    function turnLeft(){
        --face;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    //向右转
    function turnRight(){
        face++;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    //向后转
    function turnBack(){
        face = face+2;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    //向屏幕左边转，方向向左
    function movLeft(i=0){
        face = -1;
        mover.style.transform = 'rotate('+face*90+'deg)'; 
        traLeft(i);
    }
    //向屏幕右边转，方向向右
    function movRight(i=0){
        face = 1;
        mover.style.transform = 'rotate('+face*90+'deg)'; 
        traRight(i);
    }
    //向屏幕上边转，方向向上
    function movTop(i=0){
        face = 0;
        mover.style.transform = 'rotate('+face*90+'deg)'; 
        traTop(i);
    }
    //向屏幕下边转，方向向下
    function movBottom(i=0){
        face = 2;
        mover.style.transform = 'rotate('+face*90+'deg)'; 
        traBottom(i);
    }
    //向左边转，方向不变
    function traLeft(i=1){
        var left = mover.offsetLeft;
        left = left - 40*i;
        if(left >= 0){
            mover.style.left = left+'px';
        }else{
            mover.style.left = 0+'px';
        }
    }
    //向右边转，方向不变
    function traRight(i=1){
        var left = mover.offsetLeft;
        left = left + 40*i;
        if(left <= 360){
            mover.style.left = left+'px';
        }else{
            mover.style.left = 360+'px';
        }
    }
    //向上边转，方向不变
    function traTop(i=1){
        var top = mover.offsetTop;
        top = top - 40 * i;
        if(top >= 0){
            mover.style.top = top+'px';
        }else{
            mover.style.top = 0+'px';
        }
    }
    //向下边转，方向不变
    function traBottom(i=1){
        var top = mover.offsetTop;
        top = top + 40 * i;
        if(top <= 360){
            mover.style.top = top+'px';
        }else{
            mover.style.top = 360+'px';
        }
    }
    function addEvent(element,event,listener,isCorrect){
        if(element.addEventListener){
            element.addEventListener(event,listener,isCorrect);
        }else if(element.attachEvent){
            element.attachEvent('on'+event,listener,isCorrect);
        }else{
            element['on'+event] = listener;
        }
    }
}