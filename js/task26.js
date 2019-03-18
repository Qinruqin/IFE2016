window.onload = function(){
    var oContainer = document.getElementById('container');
    var oBulid = document.getElementById('bulid');
    var oControl = document.getElementById('control');
    var oCommendBox = document.getElementById('commend-box');
    var shipArr = [];
    function addEvent(element,event,listener,isCorrect){
        if(element.addEventListener){
            element.addEventListener(event,listener,isCorrect);
        }else if(element.attachEvent){
            element.attachEvent('on'+event,listener,isCorrect);
        }else{
            element['on'+event] = listener;
        }
    }
    addEvent(oBulid,'click',function(){
        var len = shipArr.length;
        var str = '';
        var id = 0;
        if(len < 4){
            if(shipArr.indexOf(1)==-1){
                id = 1;
            }else if(shipArr.indexOf(2)==-1){
                id = 2;
            }else if(shipArr.indexOf(3)==-1){
                id = 3;
            }else if(shipArr.indexOf(4)==-1){
                id = 4;
            }
            shipArr.push(id);
            str = '<div class="ship" id="ship'+id+'">'+
                    '<div class="text"><label>'+id+'</label>号'+
                    '<span id="percent'+id+'">100</span>%</div>'+
                    '<div class="bg" id="bg'+id+'"></div>'+
                  '</div>';
            var div=document.createElement("div");
            div.setAttribute('id','ship-line'+id);
            div.setAttribute('class','ship-line'+id+' ship-line');
            div.innerHTML =  str;
            oContainer.appendChild(div);
            var shipLine= document.getElementById('ship-line'+id);
            var ship = new Ship(id,shipLine,control);
            ship.commend();
            var p=document.createElement("p");
            p.innerHTML = '创建'+id+'号飞船';
            oCommendBox.appendChild(p);
        }
    });
    function Ship(id,dom){
        this.width = dom.offsetWidth;
        this.id = id;
        this.isFlying = false;
        this.dom = dom;
        this.energy = 100;
        this.position = 0;
        this.commendDom = null;
        this.timer = null;
        this.timer2 = null;
        this.timer3 = null;
    }
    Ship.prototype.startFly = function(){
        var speed = 10*1/10 ;
        /*一度等于2.61799px*/
        var that = this;
        var jiaoSpeed = speed/(360/(that.width*Math.PI));
        clearInterval(this.timer2);
        if(!this.isFlying){
            this.isFlying = true;
            this.timer = window.setInterval(function(){
                that.position  = that.position + jiaoSpeed;
                that.fly(that.position);
            },100);
            var percent = document.getElementById('percent'+this.id);
            var bg = document.getElementById('bg'+this.id);
            // 减少能量
            this.timer2 = window.setInterval(function(){
                if(that.energy <= 0){
                    that.energy = 0;
                    that.stopFly();
                }else{
                    that.energy -= 4;
                }
                bg.style.width = that.energy+'px';
                percent.innerText = that.energy;
            },100);
            // 增加能量
            this.timer3 = window.setInterval(function(){
                if(that.energy >= 100){
                    that.energy = 100;
                    clearInterval(that.timer3);
                }else{
                    that.energy += 2;
                }
                bg.style.width = that.energy+'px';
                percent.innerText = that.energy;
            },100);
        }
    };
    Ship.prototype.stopFly=function(){
       clearInterval(this.timer);
       clearInterval(this.timer2);
       this.isFlying = false;
    };
    Ship.prototype.destroy=function(){
       clearInterval(this.timer);
       clearInterval(this.timer2);
       clearInterval(this.timer3);
       var ind = shipArr.indexOf(this.id);
       shipArr.splice(ind,1);
       oContainer.removeChild(this.dom);
       oControl.removeChild(this.commendDom);
    };
    Ship.prototype.fly = function(start){
        this.dom.style.transform = "rotate("+start+"deg)";
    };
    Ship.prototype.commend = function(){
        var that = this;
        var str2 =  '<label>'+this.id+'号飞船控制台：</label>'+
                    '<button id="fly'+this.id+'">起飞</button>'+
                    '<button id="stop'+this.id+'">停止</button>'+
                    '<button id="destroy'+this.id+'">销毁</button>';
        var div2 = document.createElement("div");
        div2.setAttribute('id','control'+this.id);
        div2.innerHTML = str2;
        oControl.appendChild(div2);
        var control= document.getElementById('control'+this.id);
        that.commendDom = control;
        var fly = document.getElementById('fly'+this.id);
        var stop = document.getElementById('stop'+this.id);
        var destroy = document.getElementById('destroy'+this.id);
        addEvent(fly,'click',function(){
            mediator(that,that.id,'start');
        },true);
        addEvent(stop,'click',function(){
            mediator(that,that.id,'stop');
        },true);
        addEvent(destroy,'click',function(){
            mediator(that,that.id,'destroy');
        },true);
    };
    function mediator(e,id,com){
        var p=document.createElement("p");
        if(Math.random()<0.3){
            p.innerHTML='传送信息失败';
        }else{
            if(com == 'start'){
                e.startFly();
                p.innerHTML=id+'号飞船开始飞行';
            }else if(com == 'stop'){
                e.stopFly();
                p.innerHTML=id+'号飞船停止飞行';
            }else if(com == 'destroy'){
                e.destroy();
                p.innerHTML='销毁'+id+'号飞船';
            }
        }
        oCommendBox.appendChild(p)
    }
}