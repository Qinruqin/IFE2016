window.onload = function () {
	var delBtn  = document.getElementById('del');
	var addBtn  = document.getElementById('add');
	var queue = [] , head ,timer , txt = '';
	var target = '', e = '';//记录点击的目标
	var root = document.getElementById('one');
	//添加
	addBtn.onclick = function(){
		clearBg();
		txt = document.getElementById('txt').value;
		console.log(target)
		if(target == null){
			alert('请选择节点！')
		}else{
			var divElement =  document.createElement('div');
			divElement.innerHTML = txt;
			target.appendChild(divElement);
			target = null;
		}
	}
	//删除
	delBtn.onclick = function(){
		clearBg();
		console.log(target)
		if(target == null){
			alert('请选择节点！');
			return;
		}else{
			delNode();
		}
	}
	// 清除背景色
	function clearBg(){
		root.style.backgroundColor = "#fff";
		var aDiv = root.getElementsByTagName('div');
		for(var i = 0; i < aDiv.length; i++){
			aDiv[i].style.backgroundColor = '#fff';
		}
	}
	//删除节点
	function delNode(){
		if(target == null){
			alert('请选择节点！');
			return;
		}else{
            target.parentNode.removeChild(target);
            target = null;
		}
	}
	//选择节点
	function checkNode(event){
		var event = event || window.event;
		clearBg();
		target = event.target || event.srcElement;
		target.style.backgroundColor = "#f0f";
	}
	root.onclick = function(){
		e = event;
		checkNode(event);
	}
}
