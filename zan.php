<?php
$ID = $_POST["ID"];

if(strlen($_POST["uid"])<32){//木有uid
	new_zan_cookie($ID);
}
else{//已有uid
	$uid = substr($_POST["uid"],32);
	$uid_confirm = substr($_POST["uid"],0,32);
	add_zan($ID,$uid,$uid_confirm);
}
function new_zan_cookie($ID){
	include 'config.php';
	$life_posts_zan = mysql_fetch_array(mysql_query("SELECT Zan FROM life_posts where ID = $ID"));
	$zan_num = $life_posts_zan[0]+1;
	$x = date('Y-m-d H:i:s');
	$y = $_SERVER["REMOTE_ADDR"];
	mysql_query("INSERT INTO life_users (FirstTime, zan, ip) VALUES ('$x', '$ID', '$y')");
	$new_uid = mysql_fetch_array(mysql_query("SELECT uid FROM life_users ORDER BY uid DESC limit 0,1"));
	mysql_query("UPDATE life_posts SET Zan = $zan_num WHERE ID = $ID");
	mysql_close($con);
	echo 'var new_uid="'.md5($x).$new_uid[0].'";';
	echo 'var new_num='.$zan_num.';';
}
function add_zan($ID,$uid,$uid_confirm){
	$uid = substr($_POST["uid"],32);
	$uid_confirm = substr($_POST["uid"],0,32);
	include 'config.php';
	$life_posts_zan = mysql_fetch_array(mysql_query("SELECT Zan FROM life_posts where ID = $ID"));
	$life_users_zan = mysql_fetch_array(mysql_query("SELECT zan,FirstTime FROM life_users where uid = $uid"));
	if($uid_confirm != md5($life_users_zan[1])) {new_zan_cookie($ID);return;}
	$zan_num = $life_posts_zan[0]+1;
	$usr_zan = explode('-',$life_users_zan[0]);
	array_push($usr_zan,$ID);
	array_unique($usr_zan);
	rsort($usr_zan);
	$new_zan = "'" . $usr_zan[0];
	if($usr_zan[1]!=""){//防止第一次空的情况
		for($n=1;$n<sizeof($usr_zan);$n++){
			if($usr_zan[$n-1] == $usr_zan[$n]) continue;
		$new_zan = $new_zan . '-' . $usr_zan[$n];
		}
	}
	$new_zan = $new_zan . "'";
	mysql_query("UPDATE life_posts SET Zan = $zan_num WHERE ID = $ID");
	mysql_query("UPDATE life_users SET zan = $new_zan WHERE uid = $uid");
	mysql_close($con);
	echo 'var new_uid=false;';
	echo 'var new_num='.$zan_num.';';
}
