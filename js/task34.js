window.onload = function(){
    var oMap= document.getElementById('map');
    var doBtn = document.getElementById('do');
    var oTxt = document.getElementById('txt');
    //创建棋盘
    function mapFn(){
        var str = '';
        for(var i = 0 ; i < 100; i++){
            str += '<div class="mapBox"></div>';
        }
        str +='<div class="mover" id="mover" style="top:160px;left:160px; transform:rotate(0deg);"></div>'
        oMap.innerHTML = str;
        addEvent(doBtn,'click',doFn,true);
    }
    mapFn();
    var mover= document.getElementById('mover');
    var face = 0;
    addEvent(document,'keydown', function(e) {
        if (e.keyCode == 13 ) {
            doFn();
        }
    },true);
    //点击执行按钮
    function doFn(){
        var val = oTxt.value.trim().toLowerCase();
        if(val == 'mov lef'){
            turnLeft();
            go();
        }else if(val == 'mov rig'){
            turnRight();
            go();
        }else if(val == 'mov top'){
            turnTop();
            go();
        }else if(val == 'mov bot'){
            turnBottom();
            go();
        }else if(val == 'tra lef'){
            goLeft();
        }else if(val == 'tra rig'){
            goRight();
        }else if(val == 'tra top'){
            goTop()
        }else if(val == 'tra bot'){
            goBottom();
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
    function go(){
        var left = mover.offsetLeft;
        var top = mover.offsetTop;
        if(face % 4 == 0){
            //朝上
            if(top>=80 ){
                top = top - 40;
                mover.style.top = top+'px';
            }
        }else if((face - 2) % 4 == 0){
            //朝下
            if(top <= 360 ){
                top = top + 40;
                mover.style.top = top+'px';
            }
        }else if((face + 1) % 4 == 0){
            //朝左
            if(left >= 80 ){
                left = left - 40;
                mover.style.left = left+'px';
            }
        }else if((face - 1) % 4 == 0){
            //朝右
            if(left <= 360 ){
                left = left + 40;
                mover.style.left = left+'px';
            }
        } 
    }
    //向左转
    function turnLeft(){
        face=-1;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    //向右转
    function turnRight(){
        face = 1;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    //向上转
    function turnTop(){
        face = 0;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    //向下转
    function turnBottom(){
        face = 2;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    function goLeft(){
        var left = mover.offsetLeft;
        if(left >= 80){
            left = left - 40;
            mover.style.left = left+'px';
        }
    }
    function goRight(){
        var left = mover.offsetLeft;
        if(left <= 360){
            left = left + 40;
            mover.style.left = left+'px';
        }
    }
    function goTop(){
        var top = mover.offsetTop;
        if(top >= 80){
            top = top - 40;
            mover.style.top = top+'px';
        }
    }
    function goBottom(){
        var top = mover.offsetTop;
        if(top <= 360){
            top = top + 40;
            mover.style.top = top+'px';
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