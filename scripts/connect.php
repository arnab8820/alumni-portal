<?php

//database configuration
$host = "sql305.epizy.com";      //database host
$db = "epiz_22038220_alumni";    //database name
$user = "epiz_22038220";           //database username
$pass = "testsite3";               //database password
$hdb = "mysql:host=".$host.";dbname=".$db;

//$query = "select * from user_detail";
//$handle = new PDO($host, $db, $user, $pass);

//$handle = mysqli_connect($host, $user, $pass, $db);
try{
  $dbhandler = new PDO($hdb, $user, $pass);
  $dbhandler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (Exception $e) {
  echo $e->getMessage();
}

//echo md5("password");

/*$stmnt = $dbhandler->prepare($query);
$stmnt->execute();
$data = $stmnt->fetchAll();
print_r($data);
/*$data = $dbhandler->query($query)->fetchAll(PDO::FETCH_ASSOC);
print_r($data);*/
/*$data = $dbhandler->query($query);
print_r($data);
foreach ($data as $row) {
  // code...
  echo $row[0];
  echo "<br>";
}*/

?>
