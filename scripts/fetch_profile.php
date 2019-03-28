<?php
require 'connect.php';

$id = $_POST['id'];

$sql = "select name, degree, yop, email, country_code, phone1, phone2, image from alumni where reg_no=?";
$stmnt = $dbhandler->prepare($sql);
$stmnt->execute(array($id));
$result1 = $stmnt->fetchAll(PDO::FETCH_ASSOC);

$sql = "select * from work_details where reg_no=? order by yoj asc";
$stmnt = $dbhandler->prepare($sql);
$stmnt->execute(array($id));
$result2 = $stmnt->fetchAll(PDO::FETCH_ASSOC);

if(count($result1) == 0)
{
	print(json_encode(array('error' => true, 'message' => "No information available")));
}
else
{
	if (count($result2) == 0) {
		print(json_encode(array('error' => false, 'working' => false, 'personal' => $result1)));
	}
	else
	{
		print(json_encode(array('error' => false, 'working' => true, 'personal' => $result1, 'work' => $result2)));
	}
	
}