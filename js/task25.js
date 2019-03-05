window.onload = function(){
	var root = document.getElementById('list');
	var oSearch = document.getElementById('search');
	var oBfsBtn = document.getElementById('bfsBtn');
	var oDfsBtn = document.getElementById('dfsBtn');
	var currentCheck = null;
	var head , queue = [];
	function addEvent(element,event,listener){
		if(element.addEventListener){
			element.addEventListener(event , listener , false);
		}else if(element.attachEvent){
			element.attachEvent('on' + event , listener);
		}else{
			element['on'+event] = listener;
		}
	}
	function deleateEvent(element,tag,event,listener){
		addEvent(element,event,function(){
			var e = arguments[0] || window.event;
			var target = e.target || e.srcElement;
			if(target && target.tagName == tag.toUpperCase()){
                listener.call(target,event) ;
			}
		});
	}
	function spanStyle(element,style){
		var aSpan = element.getElementsByTagName('span');
		for(var i = 0;i < aSpan.length ; i++ ){
			aSpan[i].style.display = style;
		}
	}
	function pClass(element,className){
		if(className=='none'){
			element.className = '';
		}else{
			element.className = className;
		}
	}
	deleateEvent(root,'p','click',checkElement);
	function checkElement(){
		pClass(this,'none');
		if(currentCheck){
			if(currentCheck == this){
				spanStyle(this,'none');
				currentCheck = null;
			}else{
			    pClass(currentCheck, "none");
                spanStyle(currentCheck, "none");
				pClass(this,'checked');
				spanStyle(this,'block');
				currentCheck = this;
			}
		}else{
			pClass(this,'checked');
			spanStyle(this,'block');
			currentCheck = this;
		}
	}
	//span的点击事件
	deleateEvent(root,'span','click',spanOperate);
	function spanOperate(){
		if(this.className == 'add'){
			var txt = prompt('请输入插入的内容');
			if(txt && txt.trim() !=''){
				if(this.parentNode.nextSibling){
					var aLi = document.createElement('li')
					aLi.innerHTML ='<p>'+txt+'<span class="add">+</span><span class="del">x</span><span class="open">v</span></p>';
					this.parentNode.nextSibling.appendChild(aLi)
				}else{
					var aUl = document.createElement('ul')
					aUl.innerHTML ='<li><p>'+txt+'<span class="add">+</span><span class="del">x</span><span class="open">v</span></p></li>';
					this.parentNode.parentNode.appendChild(aUl)
				}
			}else{
				alert('请先输入插入内容！！！');
			}
			
		}else if(this.className == 'del'){
			this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
		}else if(this.className == 'open'){
			if(this.parentNode.parentNode.childNodes.length>1){
				this.innerText = '>';
				this.parentNode.parentNode.childNodes[2].style.display = 'none';
				this.className = 'close';
			}else{
				alert('所选元素无子节点！')
			}
		}else if(this.className == 'close'){
			this.innerText = 'v';
			this.parentNode.parentNode.childNodes[2].style.display = 'block';
			this.className = 'open';
		}
	}
	addEvent(oBfsBtn , 'click' , searchFn);
	addEvent(oDfsBtn , 'click' , searchFn);
	function searchFn(){
		var e = arguments[0] || window.event ;
		console.log(this)
		reset();
		if(this.getAttribute('id') == 'bfsBtn'){
			BFS(root, 'p')
		}else{
			DFS(root, 'p')
		}
		show();
	}
	//重置属性
	function reset() {
        if (currentCheck) {
            pClass(currentCheck, "none");
            spanStyle(currentCheck, "none");
        }
        //如果队列非空
        if(queue.length > 0) { 
            found = false;
            text = "";
            head.className = "none";
            queue = []; 
            clearTimeout(timer); 
        }
    }
    //广度搜索
    function BFS(node,value) {   
	    if (node != null) {  
	        var nodeList = [];  
	        nodeList.unshift(node);  
	        while (nodeList.length != 0) {  
	            var item = nodeList.shift();  
	            if(item.tagName.toLowerCase() == value){
	    			queue.push(item);
	    		}   
	            var children = item.children;  
	            for (var i = 0; i < children.length; i++)  
	                nodeList.push(children[i]);  
	        }  
	    }  
	}
    //深度搜索
    function DFS(node,value) {  
		if (node) {  
		    var stack = [];  
		    stack.push(node);  
		    while (stack.length != 0) {  
		        var item = stack.pop(); 
		        if(item.tagName.toLowerCase() == value){
	    			queue.push(item);
	    		} 
		        var childrenList = item.children;  
		        for (var i = childrenList.length - 1; i >= 0; i--)  
		            stack.push(childrenList[i]);  
	        }  
		}    
	}   
	//显示效果
	function show(){
		head =queue.shift();
		if(head){
			pClass(head,'checked');
			timer = setTimeout(function(){
				if(oSearch.value!='' && head.firstChild.nodeValue == oSearch.value){
					queue = []; //清空队列
					pClass(head,'checked');
					currentCheck = head;
					if(head.parentNode.childNodes.length>1){
						head.childNodes[3].innerText = 'v';
						head.parentNode.childNodes[2].style.display = 'block';
						head.childNodes[3].className = 'open';
					}
					spanStyle(head,'block');
					clearTimeout(timer); //清除定时器
					oSearch.value = '';
				}else{
					pClass(head,'none');
					show();
				}
			},1000)
		}else{
			alert('无数据');
		}
	}

}