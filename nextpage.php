<?php
include 'contant.php';
if(!empty($_GET["uid"])) {
	$uid = substr($_GET["uid"],32);
	include 'users.php';
	if(md5($life_users_zan[1])!=substr($_GET["uid"],0,32)) $liked_ID = false;
	if(!$liked_ID) $nextpage_liked_ID = false;
	else{
		$page_first_ID = $life_post_length[0] - $page_contants_num * ($_GET["p"]-1) ;
		$page_last_ID = $life_post_length[0] - $page_contants_num * ($_GET["p"]-1) - $page_contants_num + 1;
		$x = 0;
		foreach ($liked_ID as $n) {
			if($n > $page_first_ID) continue;
			if($n <- $page_last_ID) break;
			$nextpage_liked_ID[$x] = $n;
			$x++; 
		}
		$x = null;
		$n = null;
	}	
}
if(empty($nextpage_liked_ID)) $nextpage_liked_ID = false;
?>
$('#year').append('<?php year_li(true) ?>');
$('#month').append('<?php month_li(true) ?>');
$('#day').append('<?php day_li(true) ?>');
$('#center-line div').append('<?php line_span(true) ?>');
$('#contant').append('<?php contant_li(true,$nextpage_liked_ID) ?>');
$("#time ol li,#center-line div span,.com,.like,.liked").unbind();
$("#time ol li,#center-line div span").click(function(e){click_time_ol_li(e,$(this));});
$(".com").click(function(){click_com($(this));});
$(".like").click(function(e){click_like(e,$(this));});
$(".liked").click(function(e){click_alert(e,"您已经赞过啦");});
$("#nextpage p").css("cursor", "pointer");
page++;
<?php if ($life_post_length[0]<=$_GET["p"]*$page_contants_num) echo "lastpage();page=false;"; ?>
scrollTop = $(document).scrollTop();
rightContant = $("#contant").children().length;
setno();
settime();
recorddate();
