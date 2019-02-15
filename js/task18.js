var leftIn = document.getElementById('leftIn');
var rightIn = document.getElementById('rightIn');
var leftOut = document.getElementById('leftOut');
var rightOut = document.getElementById('rightOut');
var list = document.getElementById('list');

//操作方法 dir：左、右，operation:入、出
function Fn(dir,operation){
	var txt = document.getElementById('txt').value;
	if(operation== 'in'){
		if(txt==''){
	   	    alert('请输入内容！')
	    }else{
	    	var li = document.createElement('li');
	        li.innerText = txt; 
	        //左侧入
	        if(dir == 'left'){
	        	list.prepend(li);
	        }else{ 
	        	//右侧入
	        	list.append(li);
	        }
	        clickLi();
	        document.getElementById('txt').value = '';
	    }
	}else if(operation == 'out'){
		var aLi = document.getElementsByTagName('li');
		var len = aLi.length;
		if(len > 0){
			//左侧出
			if(dir == 'left'){
				alert(aLi[0].innerText);
				list.removeChild(aLi[0]);
			}else{
			//右侧出
				alert(aLi[len-1].innerText);
				list.removeChild(aLi[len-1]);
			}
		}
		
	}
}
//点击数字，删除
function clickLi(){
	var aLi = document.getElementsByTagName('li');
	for(var i = 0;i < aLi.length; i++){
        aLi[i].onclick = function(){
        	this.remove();
        }
	}
}

leftIn.onclick = function(){
	Fn('left','in');
}
rightIn.onclick = function(){
	Fn('right','in');
}
leftOut.onclick = function(){
	Fn('left','out');
}
rightOut.onclick = function(){
	Fn('right','out');
}
clickLi();
