<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Methods: POST");
require_once('./src/libsse.php');

if (!isset($_POST['gameId']) || !isset($_POST['cards']) || !isset($_POST['userId'])) {
    http_response_code(400);
    var_dump($_POST);
    echo 'gameId, cards, and userId are required';
    return;
}

$data = new SSEData('file', array('path' => './data', 'gc_lifetime' => 16000));
$game = $data->get($_POST['gameId']);

if (strlen($game) < 1) {
    http_response_code(404);
    echo 'Could not find game with that ID.';
    return;
}

$game = json_decode($game);

// Find the user
$user;
foreach($game->players as $player) {
    if ($player->id === $_POST['userId']) {
        $user = $player;
    }
}

// Move the cards from the user's hand to in play
if(!isset($game->currentWhite)) {
    $game->currentWhite = array();
}
$cards = new stdClass();
$cards->user = $user->id;
$cards->cards = array();
foreach($_POST['cards'] as $card) {
    foreach($user->hand as $index => $handCard) {
        if ($card === $handCard->text) {
            array_push($cards->cards, $handCard);
            array_splice($user->hand, $index, 1);
            break;
        }
    }
}
array_push($game->currentWhite, $cards);

// Update Log
array_push($game->log, array(
    'message'=>$user->name . ' played his/her card(s).',
    'time'=>time(),
    'from'=>'system'
));

// Update updated time
$game->updated = time();

// Save
$data->set($_POST['gameId'],json_encode($game));
