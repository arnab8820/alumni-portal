<?php
require 'connect.php';

$sql = "select * from message order by date desc";

$stmnt = $dbhandler->prepare($sql);
$stmnt->execute();
$result = $stmnt->fetchAll(PDO::FETCH_ASSOC);

echo(json_encode($result));

?>