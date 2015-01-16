<?php
include 'config.php';

if(!empty($_GET["p"])) {$page_first_num = ($_GET["p"]-1)*$page_contants_num-1;$page_contants_num++;}
else $page_first_num=0;

$life_posts = mysql_query("SELECT * FROM life_posts ORDER BY ID DESC limit $page_first_num,$page_contants_num");
$life_post_length = mysql_fetch_array(mysql_query("SELECT ID FROM life_posts ORDER BY ID DESC limit 0,1"));

for($n = 0; $row = mysql_fetch_array($life_posts);$n++){
	$ID[$n] = $row['ID'];
	$m = explode('-',$row['Date']);
	$liid[$n] = 'ty'.$m[0].'m'.$m[1].'d'.$m[2];
	$time[$n] = $row['Time'];
	$interval[$n]  = $row['Interval'];
	$locate[$n] = $row['Locate'];
	$contant[$n] = $row['Contant'];
	$like[$n] = $row['Zan'];
	$commentnum[$n] = $row['CommentNum'];
}
$n = null;
$m = null;
$row = null;
$life_posts = null;

mysql_close($con);

function year_li($page=false){
	global $liid;
	$page ? $a = substr($liid[0],1,5) : $a = '0123';
	foreach ($liid as $x){
		if($a != substr($x,1,5)){
			$a = substr($x,1,5);
			echo '<li id="'.$a.'" class="slow">'.substr($a,1,4).'年</li>';
		}
	}
}
function month_li($page=false){
	global $liid;
	$page ? $a = substr($liid[0],1,8) : $a = '0123';
	foreach ($liid as $x){
		if($a != substr($x,1,8)){
			$a = substr($x,1,8);
			echo '<li id="'.$a.'" class="slow">'.(int)substr($a,6,2).'月</li>';
		}
	}
}
function day_li($page=false){
	global $liid;
	$page ? $a = substr($liid[0],1,11) : $a = '0123';
	foreach ($liid as $x){
		if($a != substr($x,1,11)){
			$a = substr($x,1,11);
			echo '<li id="'.$a.'" class="slow">'.(int)substr($a,9,2).'日</li>';
		}
	}
}
function line_span($page=false){
	global $liid;
	$page ? $a = substr($liid[0],2,10) : $a = '0123';
	foreach ($liid as $x){
		if($a != substr($x,2,10)){
			$a = substr($x,2,10);
			echo '<span id="'.$a.'" class="slow"></span>';
		}
	}
}
function contant_li($page=false,$is_liked=false){
	global $ID,$liid,$time,$interval,$locate,$contant,$like,$commentnum;
	$b = 0;
	$c = 0;
	foreach ($liid as $a){
		if($page&&$b==0){$b++;continue;}
		echo '<li id="'.$a.$ID[$b].'">';
		$interval[$b] == null ? $t[$b] = $time[$b]  : $t[$b] = $interval[$b];
		echo '<p class="location">'.$t[$b].' | '.$locate[$b].'</p>';
		echo '<div class="text">';
		contant_li_div_p($contant[$b]);
		echo '</div>';
		if(!$is_liked) echo '<p class="l_c" onselectstart ="return false"><a class="like">赞('.$like[$b].')</a> <a class="com">评论('.$commentnum[$b].')</a></p>';
		else{
			if((!empty($is_liked[$c]))&&$is_liked[$c]==$ID[$b]) {
				echo '<p class="l_c" onselectstart ="return false"><a class="liked">赞('.$like[$b].')</a> <a class="com">评论('.$commentnum[$b].')</a></p>';
				$c++;
			}
			else echo '<p class="l_c" onselectstart ="return false"><a class="like">赞('.$like[$b].')</a> <a class="com">评论('.$commentnum[$b].')</a></p>';
			
		}
		echo '<div class="comment">/**评论系统正在开发中**/</div>';
		echo '</li>';
		$b++;
		}
}
function contant_li_div_p($text){
	$c = explode('\n',$text);
	foreach($c as $d){
		if(stristr($d,'<p'))  echo $d;
		else  echo '<p>'.$d.'</p>';
	}
}
