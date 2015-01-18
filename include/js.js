//												设置基本变量
var contantTop = $("#contant").children().eq(0).offset().top; //偏移量
var scrollTop = $(document).scrollTop(); //滚动量
var rightContant = $("#contant").children().length;
var calendar = false; //						检查日历打开状态
var browse = false; // 							可以滑动
var overtime = 123; //							优化点击最上时触发时间
var date_eq = 123; //							优化固定日期更新速度
var date_top = new Array();
var date_bottom = new Array();
var page = 2; //								页码
var page_connecting = false; //					传送中
var slide_speed = 50;//							辅助加速度
var wind = true; //								手机还是电脑


//											载入以后执行
$(document).ready(function() {//			初始化操作
	setno(); //									初始化类
	settime(); //								初始化time
	recorddate(); //							初始化date数据库
	setdate(); //								初始化date
	show_date_time();
	//											窗体触发操作
	$(window).scroll(function() { //		滚动操作
		scrollTop = $(document).scrollTop();
		if (calendar) set_calendar();
		setdate();
		settime(true);
	});
	$(window).resize(function() { //		窗口大小改变
		if (calendar) set_calendar();
		recorddate();
		setdate();
		settime();
	});
	//										下面是点击或者悬浮的操作
	$("#time ol li,#center-line div span").click(function(e){click_time_ol_li(e, $(this));});
	$(".com").click(function(){click_com($(this));}); 
	$(".like").click(function(e){click_like(e,$(this));});
	$(".liked").click(function(e){click_alert(e,"您已经赞过啦(~￣3￣)~么么哒");});
	$(".liking").click(function(e){click_alert(e,"服务器正在连接中╮(╯▽╰)╭怪我咯");});
	$("#nextpage p").click(function(e) {
		if (page) {
			if(page_connecting) {click_alert(e,"伦家已经在尽力o(╥﹏╥)o别急撒");return;}
			page_connecting = true;
			if (calendar) set_calendar();
			$("#nextpage p").css("cursor", "wait");
			var uid = getCookie('uid');
			if(uid == null)  uid="" ;
			$.ajax({
				url: "nextpage.php",
				data: {
					p:page,
					uid:uid,
					rand:Math.random()
				},
				dataType: "script",
				error: function(XML, reason){
					$("#nextpage p").css("cursor", "pointer").text("AJAX文件错误 原因: "+reason+" 单击重试");
					page_connecting = false;
				},
				success: function(){page_connecting = false;}
			});
//			$.get("nextpage.php?p=" + page + uid+"&rand=" + Math.random(),function(x,y){
//				if(y=="success") {eval(x);page_connecting = false;}
//				else{
//					$("#nextpage p").css("cursor", "pointer").text("AJAX文件错误 原因: "+y+" 单击重试");
//					page_connecting = false;
//				}
//			});
		}
	}).hover(function() {
		if (page) $(this).css({
			"color": "#444",
			"background-color": "#ccc"
		});
	},
	function() {
		if (page) $(this).css({
			"color": "#000",
			"background-color": "#EEE"
		});
	});

	$("#browse_up").hover(function(e) { //	向上或者向下滑动
		$(this).css("background-color", "#888");
		$("#browse_up span").css({
			"border-bottom": "8px solid #EEE",
			"border-left": "4px solid #EEE",
			"border-right": "4px solid #EEE"
		});
		if (overtime + 1300 < e.timeStamp) {
			browse = true;
			slide(true);
		}
	},
	function() {
		$(this).css("background-color", "#EEE");
		$("#browse_up span").css({
			"border-bottom": "8px solid #888",
			"border-left": "4px solid transparent",
			"border-right": "4px solid transparent"
		});
		browse = false;
		slide_speed = 50;
	}).click(function() {
		if (wind) browse = false;
		slide_speed = 50;
	});
	$("#browse_down").hover(function() {
		$(this).css("background-color", "#888");
		$("#browse_down span").css({
			"border-top": "8px solid #EEE",
			"border-left": "4px solid #EEE",
			"border-right": "4px solid #EEE"
		});
		browse = true;
		slide(false);
	},
	function() {
		$(this).css("background-color", "#EEE");
		$("#browse_down span").css({
			"border-top": "8px solid #888",
			"border-left": "4px solid transparent",
			"border-right": "4px solid transparent"
		});
		browse = false;
		slide_speed = 50;
	}).click(function() {
		if (wind) browse = false;
		slide_speed = 50;
	})
});
function getCookie(c_name) { //			弄一个取得cookie的函数
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
	return ""
}
function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function click_com(x) { //				设置评论收放
	x.parent().siblings(".comment").css("height") != "0px" ? x.parent().siblings(".comment").css("height", "0px") : x.parent().siblings(".comment").css("height", "auto");
	if (calendar) set_calendar();
	settime(); //						重设time
	recorddate();
	setdate(); //						重设日期
}
function click_time_ol_li(e, x) { //	点击日期
	if (calendar) {
		var tag = findtop(x.attr("id"));
		$('body,html').animate({scrollTop: tag[0] - 100},400);
		setTimeout(point([tag[1],"#BBB"]),0);
		setTimeout(point([tag[1],"#FFF"]),800);
		setTimeout(point([tag[1],"#BBB"]),1600);
		setTimeout(point([tag[1],"#EEE"]),2400);
		set_calendar();
		return;
	} else {
		set_calendar();
		overtime = e.timeStamp;
	}
}
function point(tag) {return function(){_point(tag);}}
function _point(tag){tag[0].css("background-color",tag[1])}
function click_like(e, x){//			赞
	if(x.attr("class")=="liking") {click_alert(e,"浏览器君正在努力传送_(¦3」∠)__别酱");return;};//防止DOM树没有更新的情况
	if(x.attr("class")!="liked"){
		x.attr("class","liking");
		var ID = x.parent().parent().attr("id").substr(12);
		var uid = getCookie('uid');
		if(uid ==null || uid=="") {uid = 0;}
		$.ajax({
			url: "zan.php",
			data: {
				ID:ID,
				uid:uid
			},
			type: "POST",
			dataType: "script",
			error: function(XML, reason){
				x.attr("class","like");
				click_alert(e,"服务器正在火星度假 (ヽ(`Д ́)ノ( ┻━┻ 你TM逗我么");
			},
			success: function(){
				x.text("赞("+new_num+")").attr("class","liked");
				if(new_uid) setCookie("uid",new_uid,"31536000");
				new_uid = null;
				click_alert(e,"么么哒(づ￣³￣)づ喜欢哒");
			}
		});
		/*$.post("zan.php",{ID:ID,uid:uid},function(date,status){
			if(status == "success") {
				eval(date);
				x.text("赞("+new_num+")").attr("class","liked");
				if(new_uid) setCookie("uid",new_uid,"31536000");
				click_alert(e,"么么哒(づ￣³￣)づ喜欢哒");
			}
			else{
				x.attr("class","like");
				click_alert(e,"服务器正在火星度假 (ヽ(`Д ́)ノ( ┻━┻ 你TM逗我么")
			}
		});*/
	}
	else click_alert(e,"您刚刚已经赞过啦- ( ゜- ゜)つロ乾杯~");
}
function click_alert(e,n){
	var $i=$("<p/>").text(n).attr("onselectstart","return false");
	$i.css({
		"left":e.pageX,
		"top":e.pageY-40,
		"color":"#DB4937",
		"position":"absolute",
		"z-index":99999,
		"background-color":"#FFF",
		"box-shadow":"2px 4px 10px #555",
		"-webkit-box-shadow":"2px 4px 10px #555",
		"border-radius":"4px",
		"padding":"5px",
		"border":"1px solid #E18B10"
	});
	$("body").append($i);
	$i.animate(
		{"top":e.pageY-170,"opacity":0},
		2000,
		function(){$i.remove();}
	);
	e.stopPropagation();
}
function lastpage() { //				最后一页
	$("#nextpage p").attr("id","lastpage").text("已是最后一页");
}
function slide(k) { //					滑动操作
	if (!browse) return;
	if (k) {
		if ($(".no0").offset().top - scrollTop > 0.6 * $(window).height()) return;
		$("#time").animate({
			top: "+=" + slide_speed + "px"
		},
		300);
		$("#center-line div").animate({
			top: "+=" + slide_speed + "px"
		},
		300);
		slide_speed += 25;
		setTimeout("slide(true)", 300);
	} else {
		if ($("#day li").last().offset().top - scrollTop < 0.6 * $(window).height()) return;
		$("#time").animate({
			top: "-=" + slide_speed + "px"
		},
		300);
		$("#center-line div").animate({
			top: "-=" + slide_speed + "px"
		},
		300);
		slide_speed += 25;
		setTimeout("slide(false)", 300);
	}
}
function set_calendar() { //			日历目录
	if (calendar) { //					日历打开状态，关闭日历
		$("#browse").css("display", "none");
		$("#time").css("top", "0");
		$("#center-line").css("top", "-50px");
		$("#center-line div").css("top", "0");
		settime();
		$("#date").css("display", "inline-block");
		calendar = false;
		return;
	}
	if (!calendar) { //					日历关闭状态，打开日历
		var z = $(window).height();
		$("#browse").css({
			"top": scrollTop + 0.04 * z + "px",
			"display": "block"
		});
		$("#time").css("top", scrollTop + 0.04 * z + 40 + "px");
		$("#center-line div").css("top", scrollTop + 0.04 * z + 40 + "px");
		var y = 0;
		for (var n = 0; n < rightContant; n++) {
			if ($(".no" + n).length) {
				$(".no" + n).css({
					"top": 40 * y + "px",
					"opacity": 1
				});
				y++;
			}
		};
		$("#date").css("display", "none");
		if (($("#main").height() + $("#header").height() - scrollTop - z) >= -10) var x = z - 105;
		else x = $("#main").height() + $("#header").height() - scrollTop - 90;
		$("#browse_down").css("top", x - 0.08 * z + "px");
		calendar = true;
		return;
	}
}
function settime(k) { //				改变方块位置，改变透明度
	var l = true;
	for (var n = rightContant - 1; n >= 0; n--) {
		var c = $("#contant").children().eq(n).offset().top - contantTop;
		if (!arguments[0]) {
			$(".no" + n).css({
				"top": c + "px"
			});
		}
		if (l) {
			var d = c - scrollTop;
			if (d >= 85) {
				$(".no" + n).css("opacity", 1);
				continue;
			}
			if (d <= 35) {
				$(".no" + n).css("opacity", 0);
				l = false;
				if (arguments[0]) return;
			}
			$(".no" + n).css("opacity", 0.02 * (d - 35));
		}
	}
}
function findtop(str, k) { //			查询对应的偏移量。如果k TRUE，返回底部偏移量。
	for (var n = 0; n < rightContant; n++) {
		if ($("#contant").children().eq(n).attr("id").indexOf(str) != -1) {
			var b = $("#contant").children().eq(n).offset().top;
			if (k) b += $("#contant").children().eq(n).height();
			return [b,$("#contant").children().eq(n)];
		}
	}
}
function recorddate() { //				将右侧位置计入数组
	for (var n = 0; n < rightContant; n++) {
		var a = $("#contant").children().eq(n);
		date_top[n] = a.offset().top - contantTop;
		date_bottom[n] = a.offset().top - contantTop + parseInt(a.css("height"));
	}
}
function setdate() { //					设置左侧日历
	$("#date").css("top", scrollTop);
	for (var n = rightContant - 1; n > 0; n--) {
		if (date_top[n] - scrollTop <= 17 && date_bottom[n] - scrollTop >= -5) {
			if (n == date_eq) return;
			break;
		}
	}
	var str = $("#contant").children().eq(n).attr("id");
	if (!str) return;
	$("#date_y_contant").text(str.substr(2, 4));
	var m = str.substr(7, 2);
	var d = str.substr(10, 2);
	if (m.indexOf("0") == 0) m = m.substr(1, 1);
	if (d.indexOf("0") == 0) d = d.substr(1, 1);
	$("#date_m_contant").text(m);
	$("#date_d_contant").text(d);
	date_eq = n;
}
function setno() { //					设置同一高度的类别
	for (var n = 0; n < rightContant; n++) {
		var str = $("#contant").children().eq(n).attr("id");
		var y = $("#" + str.substr(1, 5));
		var m = $("#" + str.substr(1, 8));
		var d = $("#" + str.substr(1, 11));
		var p = $("#" + str.substr(2, 10));
		if (y.attr("class").indexOf("no") == -1) y.addClass("no" + n);
		if (m.attr("class").indexOf("no") == -1) m.addClass("no" + n);
		if (d.attr("class").indexOf("no") == -1) d.addClass("no" + n);
		if (p.attr("class").indexOf("no") == -1) p.addClass("no" + n);

	}
}
function show_date_time(){
	window.setTimeout("show_date_time()", 1000);
	BirthDay=new Date("1/15/2015 13:57:36");//月，日，年，小时，分钟，秒
	today=new Date();
	timeold=(today.getTime()-BirthDay.getTime());
	sectimeold=timeold/1000
	secondsold=Math.floor(sectimeold);
	msPerDay=24*60*60*1000
	e_daysold=timeold/msPerDay
	daysold=Math.floor(e_daysold);
	e_hrsold=(e_daysold-daysold)*24;
	hrsold=setzero(Math.floor(e_hrsold));
	e_minsold=(e_hrsold-hrsold)*60;
	minsold=setzero(Math.floor((e_hrsold-hrsold)*60));
	seconds=setzero(Math.floor((e_minsold-minsold)*60));
	span_dt_dt.innerHTML=daysold+"天"+hrsold+"小时"+minsold+"分"+seconds;
	}
	function setzero(i){
	if (i<10)
	{i="0" + i};
	return i;
}
//												下面是网上抄下来识别手机的
(function() {
	var res = GetRequest();
	var par = res['index'];
	if (par != 'gfan') {
		var ua = navigator.userAgent.toLowerCase();
		var contains = function(a, b) {
			if (a.indexOf(b) != -1) {
				return true;
			}
		};
		var toMobileVertion = function() {
			$("body").css({
				"width": "100%",
				"min-width": "450px"
			});
			$("#header").css({
				"width": "100%",
				"min-width": "450px"
			});
			wind = false;
		}

		if (contains(ua, "ipad") || (contains(ua, "rv:1.2.3.4")) || (contains(ua, "0.0.0.0")) || (contains(ua, "8.0.552.237"))) {
			return false
		}
		if ((contains(ua, "android") && contains(ua, "mobile")) || (contains(ua, "android") && contains(ua, "mozilla")) || (contains(ua, "android") && contains(ua, "opera")) || contains(ua, "ucweb7") || contains(ua, "iphone")) {
			toMobileVertion();
		}
	}
})();
function GetRequest() {
	var url = location.search;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
//											识别手机结束
/*
	function settime(k,l){//批量重设
		var k = arguments[0] ? arguments[0] : true;
		var l = arguments[1] ? arguments[1] : true;
		settop($("#year"),k,l);
		settop($("#month"),k,l);
		settop($("#day"),k,l);
		settop($("#center-line"),k,l);
	}
	function settop(item){//对象（year等），改变位置，改变透明度
		var k = arguments[1] ? arguments[1] : true;
		var l = arguments[2] ? arguments[2] : true;
		for (var n=item.children().length-1;n>=0;n--){
			var a = item.children().eq(n);
			var b = a.attr("id");
			b.indexOf("y") == 0 ? b:b="y"+b;//针对中线点的ID传递参数修改
			var c = findtop(b);
			if(k) a.css({"top":c+"px"});
			if(l){
				var d = c - scrollTop;
				if(d<85&&d>35)	a.css("opacity",0.02*(d-35));
				if(d<=35) {a.css("opacity",0); l=false}
				if(d>=85) a.css("opacity",1);
			}
		}
	}
	*/
