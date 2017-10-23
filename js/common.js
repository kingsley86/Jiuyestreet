$(document).ready(function() {
	/* Search */
	$('.button-search').bind('click', function() {
		url = $('base').attr('href') + 'index.php?route=product/search';
				 
		var search = $('input[name=\'search\']').attr('value');
		
		if (search) {
			url += '&search=' + encodeURIComponent(search);
		}
		
		location = url;
	});
	
	$('#header input[name=\'search\']').bind('keydown', function(e) {
		if (e.keyCode == 13) {
			url = $('base').attr('href') + 'index.php?route=product/search';
			 
			var search = $('input[name=\'search\']').attr('value');
			
			if (search) {
				url += '&search=' + encodeURIComponent(search);
			}
			
			location = url;
		}
	});
	
	/* Ajax Cart */
	$('#cart > .heading a').live('click', function() {
		$('#cart').addClass('active');
		
		$('#cart').load('index.php?route=module/cart #cart > *');
		
		$('#cart').live('mouseleave', function() {
			$(this).removeClass('active');
		});
	});
	
	/* Mega Menu */
	$('#menu ul > li > a + div').each(function(index, element) {
		// IE6 & IE7 Fixes
		if ($.browser.msie && ($.browser.version == 7 || $.browser.version == 6)) {
			var category = $(element).find('a');
			var columns = $(element).find('ul').length;
			
			$(element).css('width', (columns * 143) + 'px');
			$(element).find('ul').css('float', 'left');
		}		
		
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();
		
		i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
		
		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});

	// IE6 & IE7 Fixes
	if ($.browser.msie) {
		if ($.browser.version <= 6) {
			$('#column-left + #column-right + #content, #column-left + #content').css('margin-left', '195px');
			
			$('#column-right + #content').css('margin-right', '195px');
		
			$('.box-category ul li a.active + ul').css('display', 'block');	
		}
		
		if ($.browser.version <= 7) {
			$('#menu > ul > li').bind('mouseover', function() {
				$(this).addClass('active');
			});
				
			$('#menu > ul > li').bind('mouseout', function() {
				$(this).removeClass('active');
			});	
		}
	}
	
	$('.success img, .warning img, .attention img, .information img').live('click', function() {
		$(this).parent().fadeOut('slow', function() {
			$(this).remove();
		});
	});	
	
	 /*底部通知栏操作*/
    $("#inform_one .one_but>div").click(function(){
    	$(this).addClass('add_class').siblings('div').removeClass('add_class');
    	//$("#inform_one").fadeOut(2000);
    });
    $("#inform_one .cha").click(function(){
    	$("#inform_one").fadeOut(1000);
    });
});

function getURLVar(key) {
	var value = [];
	
	var query = String(document.location).split('?');
	
	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');
			
			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}
		
		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
} 

function addToCart(product_id, quantity) {
	quantity = typeof(quantity) != 'undefined' ? quantity : 1;

	$.ajax({
		url: 'index.php?route=checkout/cart/add',
		type: 'post',
		data: 'product_id=' + product_id + '&quantity=' + quantity,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information, .error').remove();
			
			if (json['redirect']) {
				location = json['redirect'];
			}
			
			if (json['success']) {
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');
				
				$('#cart-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}
function addToWishList(product_id) {
	$.ajax({
		url: 'index.php?route=account/wishlist/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');
				
				$('#wishlist-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}	
		}
	});
}

function addToCompare(product_id) { 
	$.ajax({
		url: 'index.php?route=product/compare/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('.success').fadeIn('slow');
				
				$('#compare-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}

	//取随机数
	function GetRandomNum(Min,Max)
	{   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	}
	
	//检验是否有必填项为空
	function func_validate(classname) { 
		var flag = 1;
		$('.' + classname).each(function(){
			if($(this).attr('isnull') == '0')	{	//表明不能为空
				if($(this).val() == '') {
					//alert($(this).attr('desc') + '不能为空');
					$.MsgBox.Alert("消息",$(this).attr('desc') + '不能为空');     
					flag = 0;
				}
			}
		});
		if(flag == 1)
			return true;
		else
			return false;
	}
	
	//检验是否有必填项为空
	function func_validate2() { 
		var flag = 1;
		$('form input,form textarea').each(function(){
			if($(this).attr('isnull') == '0')	{	//表明不能为空
				if($(this).val() == '' || $(this).val() == '0' || $(this).val() == $(this).attr('placeholder')) {
					//alert($(this).attr('desc') + '不能为空');
					$.MsgBox.Alert("消息",$(this).attr('desc') + '不能为空');     
					flag = 0;
				}
			}
		});
		if(flag == 1)
			return true;
		else
			return false;
	}	
	
	function loadImageFile(imgCon,fileCon,imgPreview,hid_img_src) {
		//if (document.getElementById("uploadImage").files.length === 0) { return; }
		if(Sys.firefox || Sys.chrome){
			//如果是火狐浏览器
			var oFile = document.getElementById(fileCon).files[0];
			document.getElementById(imgCon).src = window.URL.createObjectURL(oFile);
			document.getElementById(hid_img_src).value = window.URL.createObjectURL(oFile);
			
		} else if((Sys.ie<="6.0")){
			//ie5.5,ie6.0
			document.getElementById(imgCon).src = document.getElementById(fileCon).value;
			document.getElementById(hid_img_src).value = document.getElementById(fileCon).value;
		}else{
			//如果是其他浏览器
			document.getElementById(fileCon).select();
			document.getElementById(imgPreview).innerHTML="";
			document.getElementById(imgPreview).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + document.selection.createRange().text + "\")";//使用滤镜效果www.2cto.com  
			document.getElementById(hid_img_src).value = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + document.selection.createRange().text + "\")";//使用滤镜效果www.2cto.com  
			//alert(document.getElementById(imgPreview).style.filter);
			//document.getElementById(imgCon).src =document.selection.createRange().text;		
			//$('#'+imgCon).attr("src",document.selection.createRange().text + "?t="+Math.random());
	//);
			//alert(document.getElementById("photo").src);
			//document.getElementById(fileCon).style.display = "none";	
		}		
		//oFReader.readAsDataURL(oFile);
	}
	
	function deleteString(input_ctl,string,tag) {
		var tmp_string = '';
		if($('#' + input_ctl).val().indexOf(tag + string) != -1) {
			tmp_string = $('#' + input_ctl).val().replace(tag + string,'');					 
		}
		if($('#' + input_ctl).val().indexOf(string + tag) != -1) {
			tmp_string = $('#' + input_ctl).val().replace(string + tag,'');						 
		}
		if($('#' + input_ctl).val() == string) {
			tmp_string = '';						 
		}
		$('#' + input_ctl).val(tmp_string);
	}
	
	function addString(input_ctl,string,tag) {
		if($('#' + input_ctl).val() == '') {
			$('#' + input_ctl).val(string);
		} else {
			if($('#' + input_ctl).val().indexOf(string) == -1)
				$('#' + input_ctl).val($('#' + input_ctl).val() + tag + string);
		}
	}
	
	function func_search(lx,text_search,hy_id) {
		if(lx == '1') {		//职位
			if(text_search != '') {
				//window.location.href = "index.php?route=qiye/zhiwei&search=" + text_search + "&hy_id=" + hy_id; 
				window.location.href = "index.php?route=qiye/jianli&search=" + text_search; 
			}
		} else {
			if($('#hidden_customer_id').val() != '' && text_search != '') {
				window.open("index.php?route=qiye/account&customer_id=" + $('#hidden_customer_id').val());
			} else {
				$.MsgBox.Alert('消息','没有符合条件的公司信息！');
			}
		}
	}
	
	String.prototype.trim = function()  {  
		return this.replace(/(^\s*)|(\s*$)/g, "");  
	}
	
	function len(s) {
		var l = 0;
		var a = s.split("");
		for(var i=0;i<a.length;i++) {
			if(a[i].charCodeAt(0) < 299) {
				l++;
			} else {
				l+=2;
			}
		}
		return l;
	}
	
	function f_substr(s,length) {
		var f_return = '';
		var l = 0;
		var a = s.split("");
		for(var i=0;i<a.length;i++) {
			if(a[i].charCodeAt(0) < 299) {
				l++;
			} else {
				l+=2;
			}
			f_return += a[i];
			if(l >= length) {
				return f_return;
			}
		}
	}
	
	function shoucang(lx,zhiwei_id,shoucang_id) {
		/*根据shoucang_id来判断是进行收藏还是取消收藏*/
		$.ajax({
			url:'index.php?route=qiye/tuijian_new/shoucang',
			type:'post',
			dataType:'json',
			data:'lx=' + lx + '&id=' + zhiwei_id + '&shoucang_id=' + shoucang_id,
			success:function(data) {
				if(data['success'] == 1) {
					$('#shoucang_' + lx + '_' + zhiwei_id).removeClass();
					$('#shoucang_' + lx + '_' + zhiwei_id).removeClass();
					if(data['shoucang_id'] == 0) {	//表示取消收藏成功						
						$('#shoucang_' + lx + '_' + zhiwei_id).addClass('shoucang');
					} else {						//表示收藏成功						
						$('#shoucang_' + lx + '_' + zhiwei_id).addClass('yishoucang');
					}
					$('#shoucang_' + lx + '_' + zhiwei_id).attr('onclick','shoucang(\'' + lx + '\',\'' + zhiwei_id + '\',\'' + data['shoucang_id'] + '\')');
				}
			}	
		});
	}
	
	function load_fyxx1(total,page,limit,c_page,filter) {
		//alert(total);alert(page);alert(limit);
		//记算总页数
		var num_pages = Math.ceil(parseFloat(total)/parseFloat(limit));
		var fyxx_string = '';
		var from = (parseFloat(page) - 1) * parseFloat(limit) + 1;
		var to = parseFloat((page - 1) * parseFloat(limit)) + parseFloat(limit);
		to = parseFloat(to) >= parseFloat(total) ? parseFloat(total) : parseFloat(to);
		//加载上一页箭头
		if(parseFloat(num_pages) >= 2) {
			if(parseFloat(page) > 1) {
				//fyxx_string = '<div class="fanye_left" onclick="$(\'#hidden_geren_hexin_page\').val(parseFloat($(\'#hidden_geren_hexin_page\').val()) - 1);geren_hexin();"></div>';
				fyxx_string += ' <a href="javascript:void(0)" onclick="$(\'#' + c_page + '\').val(1);' + filter + ';"> |&lt; </a> <a href="javascript:void(0)" onclick="$(\'#' + c_page + '\').val(parseFloat(' +　page +　') - 1);' + filter + ';"> &lt; </a> ';
			}
			if (parseFloat(num_pages) > 1) {
				if (parseFloat(num_pages) <= 10) {
					var start = 1;
					var end = parseFloat(num_pages);
				} else {
					var start = parseFloat(page) - Math.floor(10 / 2);
					var end = parseFloat(page) + Math.floor(10 / 2);
				
					if (start < 1) {
						end += Math.abs(parseFloat(start)) + 1;
						start = 1;
					}
							
					if (parseFloat(end) > parseFloat(num_pages)) {
						start -= (parseFloat(end) - parseFloat(num_pages));
						end = parseFloat(num_pages);
					}
				}
	
				if (parseFloat(start) > 1) {
					fyxx_string += ' .... ';
				}
	
				for (var i = start; i <= end; i++) {
					if (page == i) {
						fyxx_string += ' <b>' + i + '</b> ';
					} else {
						fyxx_string += ' <a href="javascript:void(0)" onclick="$(\'#' + c_page + '\').val(' +　i +');' + filter + ';">' + i + '</a> ';
					}	
				}
								
				if (parseFloat(end) < parseFloat(num_pages)) {
					fyxx_string += ' .... ';
				}
			}
			
			if (parseFloat(page) < parseFloat(num_pages)) {
				fyxx_string += ' <a href="javascript:void(0)" onclick="$(\'#' + c_page + '\').val(parseFloat(' + page + ') + 1);' + filter + ';"> &gt; </a> <a href="javascript:void(0)" onclick="$(\'#' + c_page + '\').val(' + num_pages +　');' + filter + ';"> &gt;| </a> ';
			}
			
			fyxx_string = '<div class="pagination"><div class="links">' + fyxx_string + '</div>' + '<div class="results">显示 ' +　from +' - ' +　to +' / ' + total + ' (总 ' +　num_pages +' 页)</div></div>';
			
		}
		return fyxx_string;
	}		
	
	function indexOf_new(index_string,string,tag) {
		var tmp_array = string.split(tag);
		var result = '0';
		for(var i=0;i<tmp_array.length;i++) {
			if(tmp_array[i] == index_string) {
				result = 1;
				break;
			}
		}
		return result;
	}
	
	