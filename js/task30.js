window.onload = function(){
    function addEvent(element,event,listener,isCorrect){
        if(element.addEventListener){
            element.addEventListener(event,listener,isCorrect);
        }else if(element.attachEvent){
            element.attachEvent('on'+event,listener,isCorrect);
        }else{
            element['on'+event] = listener;
        }
    }
    var validate = {
        //验证名称
        judgeName: function(txt,tip){
        	var reg = /\w|[!-\/\:-@\[-`{-~]/gi;
    		//非中文字符
    		var reg1 = /[^\u4e00-\u9fa5]/gi;
    		//中文字符
    		var reg2 =  /[\u4e00-\u9fa5]/gi; 
            if(txt.length == 0){
                tip.className = '';
                tip.className = 'red';
                tip.innerText = '请输入4~16位字符';
            }else{
            	if(txt.match(reg)){
            		var str1 =txt.match(reg1) ;
            		var str2 =txt.match(reg2) ;
            		var len = (str1!=null ? str1.length:0) + (str2!=null ? str2.length * 2:0);
            		if(len<4 || len > 16){
                        tip.className = '';
                        tip.className = 'red';
                        tip.innerText = '请输入4~16位字符';
            		}else{
        				tip.className = '';
                        tip.className = 'green';
                        tip.innerText = '格式正确';
            		}
            	}else{
                    tip.className = '';
                    tip.className = 'red';
            		tip.innerText = '字符格式不正确';
            	}
            }
        },
        //验证密码
        judgePsw: function(psw,tip){
            //非中文字符
            var reg1 = /[^\u4e00-\u9fa5]/gi;
            if(psw.length == 0){
                tip.className = '';
                tip.className = 'red';
                tip.innerText = '请输入密码';
            }else{
                if(psw.match(reg1)){
                    var len = psw.length ;
                    if(len<6 || len > 16){
                        tip.className = '';
                        tip.className = 'red';
                        tip.innerText = '密码请输入6~16位字符';
                    }else{
                        tip.className = '';
                        tip.className = 'green';
                        tip.innerText = '格式正确';
                    }
                }else{
                    tip.className = '';
                    tip.className = 'red';
                    tip.innerText = '密码格式不正确';
                }
            }        
        },
        //验证确认密码
        judgePsw2: function(psw2,tip){
            var psw = document.getElementById('psw').value.trim();
            if(psw2.length == 0){
                tip.className = '';
                tip.className = 'red';
                tip.innerText = '请输入确认密码';
            }else{
                if(psw != psw2){
                    tip.className = '';
                    tip.className = 'red';
                    tip.innerText = '两次输入的密码不一致';
                }else{
                    tip.className = '';
                    tip.className = 'green';
                    tip.innerText = '格式正确';
                }
            }
        },
        //验证邮箱
        judgeEmail: function(email,tip){
            var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g ;
            if(email.length == 0){
                tip.className = '';
                tip.className = 'red';
                tip.innerText = '请输入邮箱';
            }else{
                if(email.match(reg)){
                    tip.className = '';
                    tip.className = 'green';
                    tip.innerText = '格式正确';
                }else{
                    tip.className = '';
                    tip.className = 'red';
                    tip.innerText = '邮箱格式不正确';
                }
            }
        },
        //验证手机号
        judgeMobile: function(mobile,tip){
            var reg = /^1[34578]\d{9}$/;
            if(mobile.length==0){
                tip.className = '';
                tip.className = 'red';
                tip.innerText = '请输入手机号';
            }else{
                if(mobile.match(reg)){
                    tip.className = '';
                    tip.className = 'green';
                    tip.innerText = '格式正确';
                }else{
                    tip.className = '';
                    tip.className = 'red';
                    tip.innerText = '手机号格式不正确';
                }
            }    
        }
    };
    var events = {
        inputFocus:function(e){
            var e = e || window.evnet;
            var target = e.target || e.srcElement;
            if(target.tagName.toLowerCase() == 'input'){
                var tip = target.parentElement.nextElementSibling ;
                tip.style.display = 'block';
            }
        },
        inputBlur:function(e){
            var e = e || window.evnet;
            var target = e.target || e.srcElement;
            if(target.tagName.toLowerCase() == 'input'){
                var tip = target.parentElement.nextElementSibling ;
                switch(target.name){
                    case 'username':
                        validate.judgeName(target.value,tip);
                        break;
                    case 'psw':
                        validate.judgePsw(target.value,tip);
                        break;
                    case 'psw2':
                        validate.judgePsw2(target.value,tip);
                        break;
                    case 'email':
                        validate.judgeEmail(target.value,tip);
                        break;
                    case 'mobile':
                        validate.judgeMobile(target.value,tip);
                        break;
                }
                
            }

        },
    };
    var form = document.getElementById('formData');
    addEvent(form,'focus',events.inputFocus,true);
    addEvent(form,'blur',events.inputBlur,true);    
}