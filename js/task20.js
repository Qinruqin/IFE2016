var leftIn = document.getElementById('leftIn');
var rightIn = document.getElementById('rightIn');
var leftOut = document.getElementById('leftOut');
var rightOut = document.getElementById('rightOut');
var searchBtn = document.getElementById('searchBtn');
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
		this.data.unshift(num);
		this.paint();
		
	},
	rightIn:function(num){
		this.data.push(num);
		this.paint();
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
			str += ('<li>'+this.data[d]+'</li>');
		}
		list.innerHTML = str;
		eachElementDel();
	},
	deleteElement:function(index){
		alert(this.data.splice(index,1));		
		this.paint();
	},
	search:function(str){
		var i  = this.data.indexOf(str);
		list.getElementsByTagName('li')[i].style.background = 'green';
	}
};
//每个节点的点击删除操作
function eachElementDel(){
	var aLi = list.getElementsByTagName('li');
	for(var i = 0 ; i < list.childNodes.length ;i++){
		 list.childNodes[i].onclick = function(i){
			 return function(){ queue.deleteElement(i); }
		}(i)
	}
}

leftIn.onclick = function(){
	var txt = document.getElementById('text').value.trim();
    queue.leftIn(txt);
	document.getElementById('text').value = '';
}
rightIn.onclick = function(){
	var txt = document.getElementById('text').value.trim();
	queue.rightIn(txt);
	document.getElementById('text').value = '';
}
leftOut.onclick = function(){
	queue.leftOut();
}
rightOut.onclick = function(){
	queue.rightOut();
}
searchBtn.onclick = function(){
	var str = document.getElementById('searchTxt').value.trim();
	queue.search(str);	
}

