<?php
include 'config.php';
if ($uid){
	$life_users_zan = mysql_fetch_array(mysql_query("SELECT zan,FirstTime FROM life_users where uid = $uid"));
}
mysql_close($con);
if(!empty($life_users_zan[0])) $liked_ID = explode('-',$life_users_zan[0]);
else $liked_ID = false;


function update_cookie($uid,$name,$mail,$site,$like){
	setcookie("uid",$uid,time()+31536000);
	setcookie("name",$name,time()+31536000);
	setcookie("mail",$mail,time()+31536000);
	setcookie("site",$site,time()+31536000);
}
