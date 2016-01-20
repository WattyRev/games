<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Methods: POST");
require_once('./src/libsse.php');

if (!isset($_POST['id'])) {
    http_response_code(400);
    var_dump($_POST);
    echo 'Id is required';
    return;
}

$data = new SSEData('file', array('path' => './data', 'gc_lifetime' => 0));
$game = $data->get($_POST['id']);

if (strlen($game) < 1) {
    http_response_code(404);
    echo 'Could not find game with that ID.';
    return;
}
$game = json_decode($game);

$game->started = true;

array_push($game->log, array(
    'message'=>'Game has started.',
    'time'=>time(),
    'from'=>'system'
));

$game->updated = time();

$data->set($_POST['id'],json_encode($game));

echo $_POST['id'];