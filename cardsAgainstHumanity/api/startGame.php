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

$data = new SSEData('file', array('path' => './data', 'gc_lifetime' => 16000));
$game = $data->get($_POST['id']);

if (strlen($game) < 1) {
    http_response_code(404);
    echo 'Could not find game with that ID.';
    return;
}
$game = json_decode($game);

// Start Game
$game->started = true;
$game->startedTime = time();

// Update Log
array_push($game->log, array(
    'message'=>'Game has started.',
    'time'=>time(),
    'from'=>'system'
));

// Shuffle Decks
shuffle($game->blackDeck);
shuffle($game->whiteDeck);

// Update updated time
$game->updated = time();

// Save
$data->set($_POST['id'],json_encode($game));

echo $_POST['id'];
