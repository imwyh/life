<?php
$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
mysql_select_db(SAE_MYSQL_DB, $con);
$page_contants_num = 7;//单页最大数量
$password = "wyh($(#%#%";
mysql_query("SET NAMES 'UTF8'"); 
mysql_query("SET CHARACTER SET UTF8");
mysql_query("SET CHARACTER_SET_RESULTS=UTF8'"); 
