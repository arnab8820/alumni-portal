<?php
require 'connect.php';
$bcode = $_POST['bcode'];
$name = $_POST['name'];
$degree = $_POST['degree'];
$yop = $_POST['yop'];
$limit = $_POST['limit'];
$offset = $_POST['offset'];

$sql = "select reg_no, name, degree, yop, image from alumni where";
$i = 0;
if($bcode != "")
{
	$sql.= " bcode=?";
	$param[$i] = $bcode;
	$i++;
}
if($name != "")
{
	if($i>0)
		$sql.= " and name like ?";
	else
		$sql.= " name like ?";
	$param[$i] = "%".$name."%";
	$i++;
}
if($degree != "")
{
	if($i>0)
		$sql.= " and degree=?";
	else
		$sql.= " degree=?";
	$param[$i] = $degree;
	$i++;
}
if($yop != "")
{
	if($i>0)
		$sql.= " and yop=?";
	else
		$sql.= " yop=?";
	$param[$i] = $yop;
	$i++;
}

$sql .= " limit $offset, $limit";


$stmnt = $dbhandler->prepare($sql);
$stmnt->execute($param);
$data = $stmnt->fetchAll(PDO::FETCH_ASSOC);

if(count($data) == 0)
{
	echo(json_encode(array("error"=>true, "message"=>"No result found!")));
}
else{
	echo(json_encode(array("error"=>false, "result"=>$data)));
}

?>