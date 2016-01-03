<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Methods: POST");
require_once('./src/libsse.php');

if (!isset($_POST['gameId']) || !isset($_POST['userId']) || !isset($_POST['message'])) {
    http_response_code(400);
    var_dump($_POST);
    echo 'gameId, userId, and message are required';
    return;
}

$data = new SSEData('file',array('path'=>'./data'));
$game = $data->get($_POST['gameId']);

if (strlen($game) < 1) {
    http_response_code(404);
    echo 'Could not find game with that ID.';
    return;
}

$userFound = false;

forEach($game->players as $player) {
    if ($player->id === $_POST['userId']) {
        $userFound = true;
    }
    break;
}

if (!$userFound) {
    http_response_code(401);
    echo 'User has not joined the game.';
    return;
}

$game = json_decode($game);

array_push($game->log, array(
    'message'=>$_POST['message'],
    'time'=>time(),
    'from'=>$_POST['userId']
));

$data->set($_POST['gameId'],json_encode($game));

echo $_POST['gameId'];