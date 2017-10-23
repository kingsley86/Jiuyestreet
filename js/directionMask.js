$(function(){
    $(".i-pinpai li").on("mouseenter mouseleave",function(e) {
        var $this=$(this);
        var w = $this.width();
        var h = $this.height();
        var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        var eventType = e.type;
        var dirName = new Array('上方','右侧','下方','左侧');
        if(e.type == 'mouseenter'){
            //console.log(dirName[direction]+'进入'+direction);
            enterFun($this,direction,1);
        }else{
            //console.log(dirName[direction]+'离开'+direction);
            enterFun($this,direction,0);
        }
    })
    
    function enterFun(obj,direction,o){
        var target=obj.find('.i-pinpai-tips');
        var w=target.width();
        var h=target.height();
        if(o==1){
            anigoIn(target,direction,w,h);
        }else{
            anigoOut(target,direction,w,h);
        }
        
    }
    
    function anigoIn(obj,a,w,h){
        obj.stop();
        //obj.parent().find('img').stop();
        if(a==0){
            obj.css({"top":-h,"left":"0"});
            obj.animate({"top":"0"},300)
        }else if(a==1){
            obj.css({"top":"0","left":w});
            obj.animate({"left":"0"},300)
        }else if(a==2){
            obj.css({"top":h,"left":"0"});
            obj.animate({"top":"0"},300)
        }else if(a==3){
            obj.css({"top":"0","left":-w});
            obj.animate({"left":"0"},300)
        }
        //obj.parent().find('img').animate({"width":"120%","height":"120%"},500);
        obj.next().css({"bottom":"-50px"});
    }
    
    function anigoOut(obj,a,w,h){
        obj.stop();
        //obj.parent().find('img').stop();
        obj.next().stop();
        if(a==0){
            obj.animate({"top":-h},300)
        }else if(a==1){
            obj.animate({"left":w},300)
        }else if(a==2){
            obj.animate({"top":h},300)
        }else if(a==3){
            obj.animate({"left":-w},300)
        }
        //obj.parent().find('img').animate({"width":"100%","height":"100%"},500);
        setTimeout(function() {
            obj.next().animate({"bottom":"0"},300);
        }, 500);
    }
    function config(obj){
        obj.css({"left":"0","top":"330px"})
    }    
})
