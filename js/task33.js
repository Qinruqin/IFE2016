window.onload = function(){
    var oMap= document.getElementById('map');
    var control = document.getElementById('control');
    var oTxt = document.getElementById('txt');
    //创建棋盘
    function mapFn(){
        var str = '';
        for(var i = 0 ; i < 100; i++){
            str += '<div class="mapBox"></div>';
        }
        str +='<div class="mover" id="mover" style="top:160px;left:160px; transform:rotate(0deg);"></div>'
        oMap.innerHTML = str;
        addEvent(control,'click',main,true);
    }
    mapFn();
    var mover= document.getElementById('mover');
    var face = 0;
    addEvent(document,'keydown', function(e) {
        if (e.keyCode == 13 ) {
            doFn();
        }
    },true);
    function main(e){
        var e = e||window.event;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() == 'button'){
            switch(target.id){
                case 'go':
                    go();
                    break;
                case 'left':
                    turnLeft();
                    break;
                case 'right':
                    turnRight();
                    break;
                case 'back':
                    turnBack();
                    break;
                case 'do':
                    doFn();
                    break;
            } 
        }    
    }
    //点击执行按钮
    function doFn(){
        var val = oTxt.value.trim().toLowerCase();
        if(val == 'go'){
            go()
        }else if(val == 'left'){
            turnLeft()
        }else if(val == 'right'){
            turnRight()
        }else if(val == 'back'){
            turnBack()
        }else{
            alert('请输入以下指令，go：前进，left：向左转，right：向右转，back：向后转')
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
        --face;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    //向右转
    function turnRight(){
        ++face;
        mover.style.transform = 'rotate('+face*90+'deg)';  
    }
    //向后转
    function turnBack(){
        face = face+2;
        mover.style.transform = 'rotate('+face*90+'deg)';  
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