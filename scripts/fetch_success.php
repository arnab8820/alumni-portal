<?php
require 'connect.php';

$sql = "select name, degree, yop, image, story from alumni,success_stories where alumni.reg_no=success_stories.reg_no";

$stmnt = $dbhandler->prepare($sql);
$stmnt->execute();
$result = $stmnt->fetchAll(PDO::FETCH_ASSOC);

echo(json_encode($result));