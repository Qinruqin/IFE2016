var leftIn = document.getElementById('leftIn');
var rightIn = document.getElementById('rightIn');
var leftOut = document.getElementById('leftOut');
var rightOut = document.getElementById('rightOut');
var sortBtn = document.getElementById('sort');
var list = document.getElementById('list');

var queue = {
	data:[],
	//是否为空
	isEmpty:function() {
		return (this.data.length == 0);
	},
	//是否已达60个
	isFull:function() {
		return (this.data.length > 60);
	},
	leftIn:function(num){
		if(!this.isFull()){
			this.data.unshift(num);
			this.paint();
		}else{
			alert('最多输入60个数字');
		}
	},
	rightIn:function(num){
		if(!this.isFull()){
			this.data.push(num);
			this.paint();
		}else{
			alert('最多输入60个数字');
		}
	},
	leftOut:function(){
		if(!this.isEmpty()){
			alert(this.data.shift());
			this.paint();
		}else{
			alert('内容为空，不可删除');
		}
	},
	rightOut:function(){
		if(!this.isEmpty()){
			alert(this.data.pop());
			this.paint();
		}else{
			alert('内容为空，不可删除');
		}
	},
	paint:function(){
		var str = '';
		for(d in this.data){
			str += ('<li style="height:'+this.data[d]+'px">'+this.data[d]+'</li>');
		}
		list.innerHTML = str;
		eachElementDel();
	},
	deleteElement:function(index){
		alert(this.data.splice(index,1));		
		this.paint();
	}
};
//每个节点的点击删除操作
function eachElementDel(){
	for(var i = 0 ; i < list.childNodes.length ;i++){
		list.childNodes[i].onclick = function(i){
			return function(){
				queue.deleteElement(i);
			}
		}(i);
	}
}
//冒泡排序
function BubbleSort(){
	var count = 0;
	var i = 0;
	var timer = '';
    timer = setInterval(function(){
    	if(count >= queue.data.length){
    		clearInterval(timer);
    	}
    	if(i == queue.data.length - 1 -count){
    		i=0;
    		count++;
    	}
    	if(queue.data[i] > queue.data[i+1]){
    		var temp = queue.data[i+1];
    		queue.data[i+1] = queue.data[i];
    		queue.data[i] = temp;
    		queue.paint();
    	}
    	i++;
    },100);
}

leftIn.onclick = function(){
	var num = document.getElementById('number').value;
	if(/^[0-9]+$/.test(num)){
		if (parseInt(num) < 10 || parseInt(num) > 100) {
                alert("请输入10~100的数字！");
        }else{
        	queue.leftIn(num);
        }
	}
	document.getElementById('number').value = '';
}
rightIn.onclick = function(){
	var num = document.getElementById('number').value;
	if(/^[0-9]+$/.test(num)){
		if (parseInt(num) < 10 || parseInt(num) > 100) {
                alert("请输入10~100的数字！");
        }else{
        	queue.rightIn(num);
        }
	}
	document.getElementById('number').value = '';
}
leftOut.onclick = function(){
	queue.leftOut();
}
rightOut.onclick = function(){
	queue.rightOut();
}
sortBtn.onclick = function(){
	BubbleSort();
}

