window.onload = function(){
	
    var oBtn = document.getElementById('btn');
    var oResult = document.getElementById('result');
    function judge(txt){
    	var reg = /\w|[!-\/\:-@\[-`{-~]/gi;
		//非中文字符
		var reg1 = /[^\u4e00-\u9fa5]/gi;
		//中文字符
		var reg2 =  /[\u4e00-\u9fa5]/gi; 
    	if(txt.match(reg)){
    		var str1 =txt.match(reg1) ;
    		var str2 =txt.match(reg2) ;
    		var len = (str1!=null ? str1.length:0) + (str2!=null ? str2.length * 2:0);
    		if(len<4 || len > 16){
                oResult.className = '';
                oResult.className = 'red';
                oResult.innerText = '请输入4~16位字符';
    		}else{
				oResult.className = '';
                oResult.className = 'green';
                oResult.innerText = '字符格式正确';
    		}
    	}else{
    		oResult.innerText = '字符格式不正确';
    	}

    }
    oBtn.onclick = function(){
    	var txt = document.getElementById('txt').value;
    	judge(txt);
    };
    document.getElementById('txt').onfocus = function(){
    	this.value = '';
        oResult.className = '';
        oResult.innerText = '';
    }
}