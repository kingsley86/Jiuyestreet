$(function(){	
	/*对ie8以及以下浏览器的兼容性处理*/
    if(!$.support.leadingWhitespace){
		$("#nav_out").css("position","static");
	}	
	
	/*friendlink部分的操作*/
	var $link_img = 0;
	$("#f_link .link_left").click(function(){
		if($link_img==0){
			return false;
		}else{
			$("#f_link .link_img").animate({left:$link_img+1000},500);
		    $link_img=$link_img+1000;
		}
	});

	$("#f_link .link_right").click(function(){
		if($link_img==-3000){
			return false;
		}else{
			$("#f_link .link_img").animate({left:$link_img-1000},500);
		    $link_img=$link_img-1000;
		}
	});
	
	/*placeholder的制作*/
	$(".hang_self .kuang").click(function(){
		$(this).find(".holder").hide().next("input").focus();
	});
	$(".hang_self .kuang input").blur(function(){
		if($(this).val()==""||$(this).val()==" "||$(this).val()=="  "){
			$(this).prev("div").show();
		}else{
			return false;
		}
	});

	/*登录弹出框操作*/
//	$("#login_but").click(function(){
//		$('#menu_login_lx').val('0');
//		$('#login_url').val('');
//	    $("#login_out").fadeIn(500).css('width',$(window).width()).css('height',$(window).height());
//	    $(".login_in").css('left',($(window).width())/2).css('top',($(window).height())/2);
//		$('.geren_left').click();
//		//1秒后执行操作
//		//var t1 = window.setTimeout("$('.qiye_left').click();window.setTimeout(\"$('.geren_left').click();\",1000)",1000); 
//		//window.clearTimeout(t1);//去掉定时器 
//
//		
//	});  
//	
//	$("#login_but_qiye").click(function(){
//		$('#menu_login_lx').val('0');
//		$('#login_url').val('');
//	    $("#login_out").fadeIn(500).css('width',$(window).width()).css('height',$(window).height());
//	    $(".login_in").css('left',($(window).width())/2).css('top',($(window).height())/2);
//		$('.qiye_left').click();
//		//1秒后执行操作
//		//var t1 = window.setTimeout("$('.qiye_left').click();window.setTimeout(\"$('.geren_left').click();\",1000)",1000); 
//		//window.clearTimeout(t1);//去掉定时器 
//
//		
//	});  
	
    $(window).resize(function(){
	    $("#login_out").css('width',$(window).width()).css('height',$(window).height());
	    $(".login_in").css('left',($(window).width())/2).css('top',($(window).height())/2);
	});	
	$(".login_in .yes").click(function(){
	    $("#login_out").fadeOut(500);
	});
    $("#login_out").click(function(){
        $("#login_out").fadeOut(500);
    });
    $(".login_in").click(function(e){
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;            
	});
	
	$(".login_in .qiehuan .geren_left").click(function(){
		$(this).animate({left:"0px"},500).next("div").animate({left:"85px"},500);
		//$("#login_out .geren").show();
		//$("#login_out .qiye").hide();
		$('#login_lx').val('1');
		$(".geren_data").css('display','block');
	});
	$(".login_in .qiehuan .qiye_left").click(function(){
		$(this).animate({left:"0px"},500).prev("div").animate({left:"85px"},500);
		//$("#login_out .geren").hide();
		//$("#login_out .qiye").show();
		$('#login_lx').val('2');
		$(".geren_data").css('display','none');
	});
	$("#login_out .duihao").click(function(){
		$(this).toggleClass("duihao_hou");
	});
	
	
	
		/*意见反馈弹出框操作*/
	$("#yijian_fankui").click(function(){
	    $("#fankui_out").fadeIn(500).css('width',$(window).width()).css('height',$(window).height());
	    $(".fankui_in").css('left',($(window).width())/2).css('top',($(window).height())/2);
	});  
    $(window).resize(function(){
	    $("#fankui_out").css('width',$(window).width()).css('height',$(window).height());
	    $(".fankui_in").css('left',($(window).width())/2).css('top',($(window).height())/2);
	});	
	$(".fankui_in .but1").click(function(){
	    $("#fankui_out").fadeOut(500);
	});
	$(".fankui_in .but2").click(function(){
	    $("#fankui_out").fadeOut(500);
	});
    $("#fankui_out").click(function(){
        $("#fankui_out").fadeOut(500);
    });
    $(".fankui_in").click(function(e){
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;            
	});
	
	/*中奖弹出框操作
  $("#login_out .login_in button.denglu").click(function(){
  }); */ 
    $(window).resize(function(){
      	$("#jiangpin_out").css('width',$(window).width()).css('height',$(window).height());
      	$(".jiangpin_in").css('left',($(window).width())/2).css('top',($(window).height())/2);
  	}); 
//  	$(".jiangpin_in .but1").click(function(){
//      	$("#jiangpin_out").fadeOut(500);
//  	});
//  	$(".jiangpin_in .but2,.jiangpin_in .cha").click(function(){
//      	$("#jiangpin_out").fadeOut(500);
//  	});
//    $("#jiangpin_out").click(function(){
//        $("#jiangpin_out").fadeOut(500);
//    });
    $(".jiangpin_in").click(function(e){
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;            
  	});
	
	$(".placeholder").click(function(){
		$(this).addClass("border_color").find('span').hide();
		$(this).find('input[type="text"],input[type="password"]').focus();
		//$(this).find("select").focus();
	});

	$(".placeholder input,.placeholder select").focus(function(){
		$(this).next("span").hide().parent().addClass("border_color");
	});
	$(".placeholder input[type='text'],.placeholder input[type='password'],.placeholder select").blur(function(){
		$(this).parent().removeClass("border_color");
		if($(this).val()=="" || $(this).val()== " "|| $(this).val()== "  " ||$(this).val() ==  '0'){
			$(this).next("span").show();
		}else{
			return false;
		}
	});
	
})
 

