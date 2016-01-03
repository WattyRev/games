<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Methods: PUT");
require_once('./src/libsse.php');

if (!isset($_POST['id'] || !isset($_POST['user']))) {
    http_response_code(400);
    echo 'ID and user are required';
    return;
}

$data = new SSEData('file',array('path'=>'./data'));
$game = $data->get($_POST['id'])

if (strlen($game) < 1) {
    http_response_code(404);
    echo 'Could not find game with that ID.';
}

$game = json_decode($game);
array_push($game->players, array(
    'id'=>$_POST['user']->id,
    'name'=>$_POST['user']->name,
    'hand'=>array(),
    'points'=>0,
));

$data->set($_POST['id'],json_encode($game));

echo $_POST['id'];
