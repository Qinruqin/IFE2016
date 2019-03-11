window.onload = function(){
    var ifStudent = document.getElementById('ifStudent');
    var aSelectList = document.getElementsByTagName('select');
    function addEvent(element,event,listener,isCorrect){
        if(element.addEventListener){
            element.addEventListener(event,listener,isCorrect);
        }else if(element.attachEvent){
            element.attachEvent('on'+event,listener,isCorrect);
        }else{
            element['on'+event] = listener;
        }
    }
    function selectStuent(e){
        var e = e || window.evnet;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() == 'input'){
            var selectBox = document.getElementById('select-box');
            var inputBox = document.getElementById('input-box');
            if(target.value == 1){
                selectBox.style.display='block';
                inputBox.style.display='none';
            }else{
                selectBox.style.display='none';
                inputBox.style.display='block';
            }
        }
    }
    function selectChange(e){
        var e = e || window.evnet;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() == 'select'){
            for(var i = 1;i<aSelectList.length ; i++){
                aSelectList[i].style.display = 'none';
            }
            if(target.value == '北京'){
                aSelectList[1].style.display = 'inline-block';
            }else{
                aSelectList[2].style.display = 'inline-block';
            }
        }
    }
    addEvent(ifStudent,'click',selectStuent,true);
    addEvent(aSelectList[0],'change',selectChange,true);
}