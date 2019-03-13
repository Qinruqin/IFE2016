window.onload = function(){
    var oMap= document.getElementById('map');
    var oWallBox = document.getElementById('wallBox');
    var doBtn = document.getElementById('do');
    var oText = document.getElementById('text');
    var control = document.getElementById('control');
    var numList = document.getElementById('num-list');
    var aLi = numList.getElementsByTagName('li');
    var wallColor = document.getElementById('wallColor');
    
    var face = 0;
    var num = 1; //记录textarea的列数
    var boxX = 160,boxY=160;//方块的x、y坐标 
    var row = 11 , col = 11; //矩阵行数、列数
    var s = 0;

    addEvent(control,'click',main,true);
    //创建棋盘
    function mapFn(){
        var str = '';
        for(var i = 0 ; i < 100; i++){
            str += '<div class="mapBox"></div>';
        }
        str +='<div class="mover" id="mover" style="top:160px;left:160px; transform:rotate(0deg);"></div>'
        oMap.innerHTML = str;
    }
    mapFn();
    var mover= document.getElementById('mover');
    //textarea输入
    addEvent(oText,'focus',function(){
        var txtArr = oText.value.split('\n');
        numList.innerHTML = '';
        for(num = 1 ;num < txtArr.length;num++){
            numList.innerHTML += '<li>'+num+'</li>';
        }
        oText.value.trim();
    },true);
    //textarea滚动
    addEvent(oText,'scroll', function() {
        if(oText.scrollTop > (num- 11)*24){
            oText.scrollTop = (num- 11)*24;
        }        
        var top = oText.scrollTop;
        numList.scrollTop = top;
    });
    //键盘方向键操作
    addEvent(document,'keyup',function(e){
        var e = e || window.event;
        if(e.keyCode == 38){
            boxGo.movTop(1);
        }else if(e.keyCode == 39){
            boxGo.movRight(1);
        }else if(e.keyCode == 40){
            boxGo.movBottom(1);
        }else if(e.keyCode == 37){
            boxGo.movLeft(1);
        }
    },true);
    function main(e){
        var e = e||window.event;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() == 'button'){
            if(target.id != 'do' && target.id != 'refresh'&& target.id != 'bulid' && target.id != 'ranbulid'&& target.id != 'clear' && target.id != 'brush'){
                numList.innerHTML += '<li>'+num+'</li>';
                num++;
                oText.value += target.innerHTML+'\n';
            }else if(target.id=='do'){
                doFn();
            }else if(target.id=='refresh'){
                numList.innerHTML ='';
                oText.value = ''
            }else if(target.id == 'bulid'){
                //建墙
                wall.build();
            }else if(target.id == 'ranbulid'){
                //随机建墙
                wall.ranBulid();
            }else if(target.id == 'clear'){
                //清除墙
                wall.clear();
            }else if(target.id == 'brush'){
                //刷墙
                wall.brush(face,boxX,boxY,wallColor.value);
            }
        }    
    }
    //点击执行按钮
    function doFn(){
        var val = oText.value.trim().toLowerCase();
        var arr = val.split('\n');
        var i = 1;
        if(arr.length>0 && arr!=''){
            show(arr[0],0);
            aLi[0].style.backgroundColor = 'red';
            var timer = setInterval(function(){
                if(i<arr.length){
                    aLi[i-1].style.backgroundColor = '#ccc';
                    aLi[i].style.backgroundColor = 'red';
                    show(arr[i],i);
                    ++i;
                }else{
                    clearInterval(timer);
                }
            },500);
        }
    }
    //显示效果
    function show(cmd,i) {
        var cmdArr = cmd.trim().split(' ');
        if(cmdArr[0] == 'tun'){
            switch(cmdArr[1]){
                case 'lef':
                   boxGo.turnLeft(cmdArr[2]);
                   break;
                case 'rig':
                   boxGo.turnRight(cmdArr[2]);
                   break;
                case 'back':
                   boxGo.turnBack(cmdArr[2]);
                   break;
            }             
        }else if(cmdArr[0] == 'tra'){
            switch(cmdArr[1]){
                case 'top':
                   boxGo.traTop(cmdArr[2]);
                   break;
                case 'rig':
                   boxGo.traRight(cmdArr[2]);
                   break;
                case 'bot':
                   boxGo.traBottom(cmdArr[2]);
                   break;
                case 'lef':
                   boxGo.traLeft(cmdArr[2]);
                   break;
            } 
        }else if(cmdArr[0] == 'mov'){
            switch(cmdArr[1]){
                case 'top':
                   boxGo.movTop(cmdArr[2]);
                   break;
                case 'rig':
                   boxGo.movRight(cmdArr[2]);
                   break;
                case 'bot':
                   boxGo.movBottom(cmdArr[2]);
                   break;
                case 'lef':
                   boxGo.movLeft(cmdArr[2]);
                   break;
            } 
        }else if(cmdArr[0] == 'go'){
            boxGo.go(cmdArr[1]);
        }
    }
    var boxGo = {
        left:mover.offsetLeft,
        top:mover.offsetTop,
        //前进
        go:function(i=1){
            var left = mover.offsetLeft;
            var top = mover.offsetTop;
            if((face + 1) % 4 == 0){
                //朝左
                this.traLeft(i);
            }else if((face - 1) % 4 == 0){
                //朝右
                this.traRight(i);
            }else if(face % 4 == 0){
                //朝上
                this.traTop(i);
            }else if((face - 2) % 4 == 0){
                //朝下
                this.traBottom(i);
            }
        },
        //向左转
        turnLeft:function(){
            --face;
            mover.style.transform = 'rotate('+face*90+'deg)';  
        },
        //向右转
        turnRight:function(){
            ++face;
            mover.style.transform = 'rotate('+face*90+'deg)';   
        },
        //向后转
        turnBack:function(){
            face = face + 2;
            mover.style.transform = 'rotate('+face*90+'deg)'; 
        },
        //向屏幕上边转，方向向上
        movTop:function(i=1){
            face = 0;
            mover.style.transform = 'rotate('+face*90+'deg)'; 
            this.traTop(i);
        },
        //向屏幕右边转，方向向右
        movRight:function(i=1){
            face = 1;
            mover.style.transform = 'rotate('+face*90+'deg)'; 
            this.traRight(i);
        },
        //向屏幕下边转，方向向下
        movBottom:function(i=1){
            face = 2;
            mover.style.transform = 'rotate('+face*90+'deg)'; 
            this.traBottom(i);
        },
        //向屏幕左边转，方向向左
        movLeft:function(i=1){
            face = -1;
            mover.style.transform = 'rotate('+face*90+'deg)'; 
            this.traLeft(i);
        },
        //向上边转，方向不变
        traTop:function(i=1){
            var left = mover.offsetLeft;
            var top = mover.offsetTop;
            for(var j = 1;j<=i;j++){
                top = top - 40 ;
                if(wall.allowBulid(left,top) != 1){
                    break;
                }else{
                    if(top >= 0){
                        mover.style.top = top+'px';
                        boxY = top;
                    }else{
                        mover.style.top = 0+'px';
                        boxY = 0;
                    }
                }
            }
        },
        //向右边转，方向不变
        traRight:function(i=1){
            var left = mover.offsetLeft;
            var top = mover.offsetTop;
            for(var j= 1;j<=i;j++){
                left = left + 40;
                if(wall.allowBulid(left,top) != 1){
                    break;
                }else{
                    if(left <= 360){
                        mover.style.left = left+'px';
                        boxX = left;
                    }else{
                        mover.style.left = 360+'px';
                        boxX = 360;
                    }
                }
            }
        },
        //向下边转，方向不变
        traBottom:function(i=1){
            var left = mover.offsetLeft;
            var top = mover.offsetTop;
            
            for(var j= 1;j<=i;j++){
                top = top + 40 ;
                if(wall.allowBulid(left,top) != 1){
                    break;
                }else{
                    if(top <= 360){
                        mover.style.top = top+'px';
                        boxY = top;
                    }else{
                        mover.style.top = 360+'px';
                        boxY = 360;
                    }
                }
            }
        },
        //向左边转，方向不变
        traLeft:function(i=1){
            var left = mover.offsetLeft;
            var top = mover.offsetTop;
            for(var j= 1;j<=i;j++){
                left = left - 40;
                if(wall.allowBulid(left,top) != 1){
                    break;
                }else{
                    if(left >= 0){
                        mover.style.left = left+'px';
                        boxX = left;
                    }else{
                        mover.style.left = 0+'px';
                        boxX = 0;
                    }
                }
            }
        },
    };
    var wall = {
        list: {
            'x':[],
            'y':[],
            'color':[]
        },
        //建墙
        build:function(){
            var wX,wY;
            if((face + 1) % 4 == 0){
                //朝左
                wX = boxX - 40;
                wY = boxY;
            }else if((face - 1) % 4 == 0){
                //朝右
                wX = boxX + 40;
                wY = boxY;
            }else if(face % 4 == 0){
                //朝上
                wX = boxX;
                wY = boxY - 40;
            }else if((face - 2) % 4 == 0){
                //朝下
                wX = boxX;
                wY = boxY + 40;
            }

            if(this.allowBulid(wX,wY) == 1){
                this.createWall(wX,wY);
            }  
        },
        clear:function(){
            this.list.x = [];
            this.list.y = [];
            this.list.color = [];
            oWallBox.innerHTML = '';
        },
        allowBulid:function(x,y){
            var i = this.list.x.length;
            //超过边界
            if(x<0||x>360||y<0||y>360){
                console.log('超过边界了！');
                return 2;
            }
            while(i--){
                if((this.list.x[i] == x && this.list.y[i] == y) || (this.list.x[i] == boxX && this.list.y[i] == boxY)){
                    console.log('已经有墙了！');
                    return 3;//已经有墙了
                }
            }
            return 1;
        },
        brush:function(face,x,y,color){
            var i = -1;
            if((face + 1) % 4 == 0){
                //朝左
                i = this.findWall(x-40,y);
            }else if((face - 1) % 4 == 0){
                //朝右
                i = this.findWall(x+40,y);
            }else if(face % 4 == 0){
                //朝上
                i = this.findWall(x,y-40);
            }else if((face - 2) % 4 == 0){
                //朝下
                i = this.findWall(x,y+40);
            }
            if(i>=0){
                this.list.color[i]=color;
                var li = document.getElementById('wall-'+i);
                li.style.background = color ;
            }
        },
        findWall:function(x,y){
            for(var i = 0; i <this.list.x.length;i++){
                if( x ==this.list.x[i] && y == this.list.y[i]){
                    return i;
                }
            }
        },
        createWall:function(x,y){
            var id = 0;
            id = this.list.x.length;
            this.list.x.push(x);
            this.list.y.push(y);
            this.list.color.push('red');
            var str = '<li id="wall-'+id+'" style="top:'+y+'px;left:'+x+';color:red;"></li>'
            oWallBox.innerHTML += str;
        },
        ranBulid:function(){
            var x = ran(0,col)*40;
            var y = ran(0,row)*40;
            while(this.allowBulid(x,y) != 1){
                x = ran(0,col)*40;
                y = ran(0,row)*40;
            }
            this.createWall(x,y);
        }
    }
    //获取随机数
    function ran(n,m){
        return parseInt(Math.random()*(m-n)+n);
    }
    function addEvent(element,event,listener,isCorrect){
        if(element.addEventListener){
            element.addEventListener(event,listener,isCorrect);
        }else if(element.attachEvent){
            element.attachEvent('on'+event,listener,isCorrect);
        }else{
            element['on'+event] = listener;
        }
    }
}