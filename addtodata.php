<?php
mysql_connect('localhost','root','');
mysql_select_db('newdata') or die( "Unable to select database");
$sEmail = isset($_POST['email']);
if($sEmail != ""){
    $query = "INSERT INTO newsletter VALUES (email,'".$_POST['email']."')";
    mysql_query($query);
    $response['status'] = 'success';}
    else{
    $response['status'] = 'fail';
}
header('Content-type: application/json');
echo json_encode($response);
?>