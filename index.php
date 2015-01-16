<?php
if (isset($_COOKIE["uid"])) {$uid = substr($_COOKIE["uid"],32); include 'users.php';}
include 'contant.php';
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>生活</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="author" content="王宇晗">
<link href="include/style.css" rel="stylesheet" type="text/css" />
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js" type="text/javascript"></script>
</head>
<body>
	<div id="header">
		<div id="top">
			<a id="title" href="/">WEDC_life</a>
		</div>
		<div id="shelter_sq"></div>
		<div id="shelter_l" class="shelter_c"></div>
	    <div id="shelter_r" class="shelter_c"></div>
	</div>
	<div id="main">
		<div id="main_left">
			<div id="time" onselectstart ='return false'>
				<ol id="year">
					<?php year_li(); ?>
				</ol>
				<ol id="month">
					<?php month_li(); ?>
				</ol>
				<ol id="day">
					<?php day_li(); ?>
				</ol>
				<ol id="date">
					<li id="date_y"><span id="date_y_contant"></span>年</li>
					<li id="date_m"><span id="date_m_contant"></span>月</li>
					<li id="date_d"><span id="date_d_contant"></span>日</li>
					<li id="date_p" style="width: 9px;height: 9px;margin: 11px 6px 0;padding: 0;border-radius: 5px;background-color: #E18B10;position: absolute; cursor: auto;"></li>
				</ol>
			</div>
			<div id="browse">
				<div id="browse_up"><span></span></div>
				<div id="browse_down"><span></span></div>
			</div>
			<div id="center-line">
				<div>
					<?php line_span(); ?>
				</div>
			</div>
		</div>
		<div id="main_right">
			<div id="contant">
				<?php empty($liked_ID) ? contant_li() : contant_li(false,$liked_ID); ?>
			</div>
			<div id="<?php if ($life_post_length[0]<=2*$page_contants_num) echo 'lastpage'; else echo 'nextpage' ?>" onselectstart ="return false"><p><?php if ($life_post_length[0]<=2*$page_contants_num) echo '已是最后一页'; else echo '单击加载下一页' ?></p></div>
		</div>
		<div style="clear:both;"></div>
	</div>
	<div id="footer">
		<a href="http://blog.wedc.cc" target="_blank">博客</a> | <a href="http://sign.wedc.cc" target="_blank">签到</a> | <a href="http://code.wedc.cc" target="_blank">代码</a> | <a href="http://life.wedc.cc" target="_blank">生活</a><br/>
		© <a href="http://wedc.cc" target="_blank">WEDC</a>_<a href="http://life.wedc.cc">life</a>&nbsp;&nbsp;已运行<SPAN id="span_dt_dt"></SPAN>秒<br>
		<?php echo date('Y'); ?>&nbsp;&nbsp;All Rights Reserved
	</div>
	<script src="include/js.js" type="text/javascript"></script>
</body>
 


