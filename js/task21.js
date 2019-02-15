var tagTxt = document.getElementById('tagTxt');
var addBtn = document.getElementById('addBtn');
var tList = document.getElementById('tList');
var hList = document.getElementById('hList');

var queue = {
	tagData:[],
	hobbyData:[],
	//是否为空
	isEmpty:function() {
		return (this.data.length == 0);
	},
	//是否已达60个
	isFull:function() {
		return (this.data.length > 60);
	},
	//新增tag
	addTag:function(txt){
		if(this.tagData.length == 10){
			this.leftOut('tag',1);
		}
		if(this.tagData.indexOf(txt)==-1){
			this.tagData.push(txt);
			this.paint('tag');
		}
	},
	//新增兴趣爱好
	addHobby:function(txt){
	    var s = txt.split(/\r|,|，|\s/); 
	    var sLen = s.length;
	    var hLen = this.hobbyData.length;
	    var sub = sLen + hLen -10 ;

		if(sub > 1){
			this.leftOut('hobby',sub);
		}
		//初始输入超过10个值时取当前输入的后10个，否则取当前输入的所有值
		for(var i = sLen - ( (sub > 1 && hLen==0) ? 10 : sLen) ;i < sLen;i++){
			if(this.hobbyData.indexOf(s[i]) == -1){		
				this.hobbyData.push(s[i]);
				this.paint('hobby');
			}
		}
	},	
	leftOut:function(s,n){
		if(s=='tag'){
			for(var i = 0 ; i < n; i++){
				this.tagData.shift();
			}		
		}else{
			for(var i = 0 ; i < n; i++){
				this.hobbyData.shift();
			}	
		}
		this.paint(s);
	},
	
	paint:function(type){
		var str = '';
		if(type == 'tag'){
			for(d in this.tagData){
				str += ('<li>'+this.tagData[d]+'</li>');
			}
			tList.innerHTML = str;
		}else{
			for(d in this.hobbyData){
				str += ('<li>'+this.hobbyData[d]+'</li>');
			}
			hList.innerHTML = str;
		}
		eachElementDel(type);
	},
	deleteElement:function(index,type){
		if(type == 'tag'){
			alert(this.tagData.splice(index,1));
		}else{
			alert(this.hobbyData.splice(index,1));
		}	
		this.paint(type);
	}
};
// 每个节点的点击删除操作
function eachElementDel(type){
	var tLi = tList.getElementsByTagName('li');
	var hLi = hList.getElementsByTagName('li');
	if(type == 'tag'){
		for(var i = 0 ; i < tList.childNodes.length ;i++){
			tList.childNodes[i].onclick = function(i){
				return function(){ queue.deleteElement(i,'tag'); }
			}(i);
		}
	}else{
		for(var j = 0 ; j < hList.childNodes.length ;j++){
			hList.childNodes[j].onclick = function(j){
				return function(){ queue.deleteElement(j,'hobby'); }
			}(j)
		}
	}
}
tagTxt.onkeypress = function(event){
    var e = event || window.event ;
    //按回车---13,空格---32，英文逗号和中文逗号
    if(e && (e.keyCode == 13 || e.keyCode == 32 ||e.keyCode == ",".charCodeAt(0))){
    	e.preventDefault();
    	var tagTxt = document.getElementById('tagTxt').value.trim();
    	if(tagTxt == ''){
    		alert('请输入内容！')
    	}else{
	    	queue.addTag(tagTxt);
    	}
    	document.getElementById('tagTxt').value = '';
    	return ;
    }
};
addBtn.onclick = function(){
	var txt = document.getElementById('text').value.trim();
    queue.addHobby(txt);
	document.getElementById('text').value = '';
}


