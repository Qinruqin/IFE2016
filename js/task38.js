window.onload = function(){
    var oBody= document.getElementById('body');
    var oHead = document.getElementById('head');
    var oChinese = document.getElementById('chinese');
    var oMath = document.getElementById('math');
    var oEnglish = document.getElementById('english');
    var oEnglish = document.getElementById('english');
    var aTh = document.getElementsByTagName('th');
    var cFlag = 0 , mFlag = 0 , eFlag = 0; //0降序，1升序
    
    function addEvent(element,event,listener,isCorrect){
        if(element.addEventListener){
            element.addEventListener(event,listener,isCorrect);
        }else if(element.attachEvent){
            element.attachEvent('on'+event,listener,isCorrect);
        }else{
            element['on'+event] = listener;
        }
    }
    var data=[
        ['小明','90','80','88','258'],
        ['小王','80','90','80','250'],
        ['小红','95','70','87','252']
    ];
    var flagArr =[0,0,0,0];
    //渲染页面
    function showDom(){
        oBody.innerHTML = '';
        for(var i = 0;i<data.length;i++){
            var tr = document.createElement('tr');
            var str = '';
            for(var j = 0 ; j< data[i].length;j++){
                str += '<td>'+data[i][j]+'</td>';
            }
            tr.innerHTML = str;
            oBody.appendChild(tr)
        }
    }
    
    //排序sortType： 0 降序，1升序 
    function sortData(colNum){
        var temp ;
        for(var i = 0;i < data.length;i++){
            for (var j = i + 1; j < data.length; j++) {
                if(flagArr[colNum-1] == 1){
                    if(data[i][colNum] > data[j][colNum]){
                        temp = data[j]
                        data[j] = data[i] ; 
                        data[i] =temp;
                    }
                }else{
                    if(data[i][colNum] < data[j][colNum]){
                        temp = data[j]
                        data[j] = data[i] ; 
                        data[i] =temp;
                    }
                }
            }
        }
        if(flagArr[colNum-1] == 0){
            flagArr[colNum-1] = 1;
        }else{
            flagArr[colNum-1] = 0;
        }
    }
    //点击事件
    for(var i = 1;i < aTh.length;i++){
        addEvent(aTh[i],'click',(function(i){ return function(){
            sortData(i);
            showDom(); 
            console.log(i)
        }})(i),true);
    }
    showDom();    
}