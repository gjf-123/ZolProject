<?php
header('Access-Control-Allow-Origin:*');  //允许任意的域名访问
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";

$result=$conn->query("select * from shouye");

$arr = array();

for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);