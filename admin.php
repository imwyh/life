<?php
include 'config.php';
empty($_POST['interval']) ? $interval = "" : $interval =  $_POST['interval'];
empty($_POST['locate']) ? $locate = "" : $locate =  $_POST['locate'];
empty($_POST['contant']) ? $contant = "" : $contant =  $_POST['contant'];
empty($_POST['pw']) ? $pw = "" : $pw =  $_POST['pw'];
$pw == $password ? $date = false : $date = true;
?>
<!DOCTYPE HTML> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<?php if($date&&$_SERVER["REQUEST_METHOD"] == "POST") echo "<script>alert('密码错误')</script>";?>
</head>
<body> 
<h2>添加记录</h2>
您可以使用HTML标签，但是一定要记得关闭标签。<br>
默认对每个段落增加p标签，段落之间使用\n分割。换而言之，如果您需要换行，请直接使用\n，而非HTML br标签。<br>
如果您输入时需要使用p标签，请在p开始标签之前加入\n。<br>
目前还不支持在线编辑，所以如果输入错误需要进入数据库修改。<br>
<a href = "/">点此返回首页</a><br>
祝您使用愉快<br><br>

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"> 
   时间：<input type="text" name="interval" value = "<?php if($date) echo $interval;?>">&nbsp;&nbsp;如上午，中午。如果为空则使用服务器准确时间
   <br><br>
   地点：<input type="text" name="locate" value = "<?php if($date) echo $locate;?>">
   <br><br>
   评论：<textarea name="contant" rows="20" cols="80"><?php if($date) echo $contant;?></textarea>
   <br><br>
   密码：<input type="password" name="pw">
   <br><br>
   <input type="submit" name="submit" value="提交"> 
</form>
 <br><br>
 <a href = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"><b>为了防止重复提交，点击这里刷新页面，而不要使用浏览器的刷新</b></a>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && (!$date)) {

	echo "<h2>您的输入：</h2>";
	echo $interval;
	echo "<br>";
	echo $locate;
	echo "<br>";
	echo $contant;
	$x = date('Y-m-d');
	$y = date('H:i:s');
	$z = $_SERVER["REMOTE_ADDR"];
	mysql_query("INSERT INTO life_posts VALUES ('', '$x', '$y', '$interval', '$locate', '$contant', '0', '0', '$z')");
	echo "<br>已成功载入数据库";
	echo "<script>alert('写入成功')</script>";
}
?>
</body>
</html>
