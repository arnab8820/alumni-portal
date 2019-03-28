<?php
require 'connect.php';
$password = "2fc44d6722251dd8546eb3c683b3e8cd";
$reg_no = $_POST['reg_no'];
$fname = $_POST['fname'];
$mname = $_POST['mname'];
$lname = $_POST['lname'];
$degree = $_POST["degree"];
$yop = $_POST['yop'];
$email = $_POST['email'];
if ($_POST['country_code'] == "") {
	# code...
	$cc = "+91";
}
else{
	$cc = $_POST['country_code'];
}
$phone1 = $_POST['phone1'];
$phone2 = $_POST['phone2'];

$flag = 0;

$sql = 'insert into alumni_details values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
$stmnt = $dbhandler->prepare($sql);
try {
	$result = $stmnt->execute(array($reg_no, $password, $fname, $mname, $lname, $degree, $yop, $email, $cc, $phone1, $phone2));
	if ($result == true) {
		# code...
		printf("<br>Your personal data is saved successfully!");
	} 
} catch (Exception $e) {
	echo $e->getMessage();
}

$count = count($_POST['desig']);
for ($i=0; $i < $count; $i++) { 
	# code...
	if (($_POST['desig'][$i] != "") && ($_POST['company'][$i] != "") && ($_POST['yoj'][$i] != "")) {
		# code...
		//printf($_POST['desig'][$i].$_POST['company'][$i].$_POST['yoj'][$i]);
		$sql = "insert into work_details values (?, ?, ?, ?)";
		$stmnt = $dbhandler->prepare($sql);
		try {
			$result2 = $stmnt->execute(array($_POST['reg_no'], $_POST['desig'][$i], $_POST['company'][$i], $_POST['yoj'][$i]));
		} catch (Exception $e) {
			$e->getMessage();
		}
	}
	else{
		printf("<br>Cannot save following record because one or more value is missing: <br>Desination: ".$_POST['desig'][$i]." Company: ".$_POST['company'][$i]." Joining year: ".$_POST['yoj'][$i]);
		$flag = 1;
	}
}
if ($flag == 0 && $result2 == true) {
		# code...
		printf("<br>Your work data is saved successfully!");
} 

?>

