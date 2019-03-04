window.onload = function () {
	var preBtn  = document.getElementById('pre');
	var midBtn  = document.getElementById('mid');
	var lastBtn  = document.getElementById('last');
	var queue = [] , head ,timer;
	var root = document.getElementById('one');
	//前序
	function preOrder(node){
		if(node != null){
			queue.push(node);
			preOrder(node.firstElementChild);
			preOrder(node.lastElementChild);
		}
	}
	//中序
	function midOrder(node){
		if(node != null){
			midOrder(node.firstElementChild);
			queue.push(node);
			midOrder(node.lastElementChild);
		}
	}
	//后序
	function lastOrder(node){
		if(node != null){
			lastOrder(node.firstElementChild);
			lastOrder(node.lastElementChild);
			queue.push(node);
		}
	}
	function show(){
		head = queue.shift();
		if(head){
			head.style.backgroundColor = "#f00";//显示红色
			timer = setTimeout(function(){
				head.style.backgroundColor='#fff';
				show();
			},1000)
		}
	}
	preBtn.onclick= function(){
		clearBg();
		preOrder(root);	
		show();
	}
	midBtn.onclick= function(){
		clearBg();
		midOrder(root);	
		show();
	}
	lastBtn.onclick= function(){
		clearBg();
		lastOrder(root);	
		show();
	}
	// 清除背景色
	function clearBg(){
		if (queue.length > 0) { //如果队列非空即正在遍历
			head.style.backgroundColor = "#fff";//清除残留蓝色
			queue = []; //清空队列
			clearTimeout(timer); //清除定时器
		}
	}
	//显示效果
	function show(){
		head = queue.shift();
		if(head){
			head.style.backgroundColor = "#f00";//显示红色
			timer = setTimeout(function(){
				head.style.backgroundColor='#fff';
				show();
			},1000)
		}
	}
}
