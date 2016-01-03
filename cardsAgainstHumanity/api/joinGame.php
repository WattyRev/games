<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Methods: GET");
require_once('./src/libsse.php');

if (!isset($_GET['id']) || !isset($_GET['userid']) || !isset($_GET['username'])) {
    http_response_code(400);
    var_dump($_GET);
    echo 'ID,userid, and username are required';
    return;
}

$data = new SSEData('file',array('path'=>'./data'));
$game = $data->get($_GET['id']);

if (strlen($game) < 1) {
    http_response_code(404);
    echo 'Could not find game with that ID.';
}


$game = json_decode($game);

if ($game->host === $_GET['userid']) {
    echo 'User is host';
    return;
}

$userFound = false;

foreach($game->players as $player) {
    if ($player->id === $_GET['userId']) {
        $userFound = true;
    }
    break;
}

if ($userFound) {
    echo 'User is already in the game';
    return;
}

array_push($game->players, array(
    'id'=>$_GET['userid'],
    'name'=>$_GET['username'],
    'hand'=>array(),
    'points'=>0,
));

array_push($game->log, array(
    'message'=>$_GET['username'] . '" joined the game.',
    'time'=>time(),
    'from'=>'system'
));

$game->updated = time();

$data->set($_GET['id'],json_encode($game));

echo $_GET['id'];
