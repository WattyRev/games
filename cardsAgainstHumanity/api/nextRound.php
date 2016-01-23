<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Methods: POST");
require_once('./src/libsse.php');

if (!isset($_POST['gameId'])) {
    http_response_code(400);
    var_dump($_POST);
    echo 'gameId is required';
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

// Discard played cards
if ($game->currentBlack) {
    array_push($game->blackDiscarded, $game->currentBlack);
    $game->currentBlack = null;
}
if ($game->currentWhite) {
    foreach($game->currentWhite as $played) {
        array_push($game->whiteDiscarded, $played->card);
    }
    $game->currentWhite = array();
}

// Set the next czar
$pastCzar = null;
$nextCzar = null;
for ($i = 0; $i < count($game->players); $i++) {
    $player = $game->players[$i];
    if ($player->isCzar) {
        $player->isCzar = false;
        $pastCzar = $i;
    }
}
if ($pastCzar === null) {
    for ($i = 0; $i < count($game->players); $i++) {
        $player = $game->players[$i];
        if ($player->id === $_POST['czarId']) {
            $nextCzar = $i;
        }
    }
} else {
    if ($pastCzar + 1 === count($game->players)) {
        $nextCzar = 0;
    } else {
        $nextCzar = $pastCzar + 1;
    }
}
$game->players[$nextCzar]->isCzar = true;

// Reload each user up to 10 cards
foreach($game->players as $player) {
    for ($i = count($player->hand); $i < 10; $i++) {
        if (count($game->whiteDeck) === 0) {
            reloadWhiteDeck();
        }
        array_push($player->hand, array_shift($game->whiteDeck));
    }
}

// Set next black card
if (count($game->blackDeck) === 0) {
    reloadBlackDeck();
}
$game->currentBlack = array_shift($game->blackDeck);

function reloadWhiteDeck() {
    shuffle($game->whiteDiscarded);
    $game->whiteDeck = $game->whiteDiscarded;
    $game->whiteDiscarded = array();
}

function reloadBlackDeck() {
    shuffle($game->blackDiscarded);
    $game->blackDeck = $game->blackDiscarded;
    $game->blackDiscarded = array();
}

// Update Log
array_push($game->log, array(
    'message'=>$game->players[$nextCzar]->name . ' is now the Czar.',
    'time'=>time(),
    'from'=>'system'
));

// Update updated time
$game->updated = time();

// Save
$data->set($_POST['gameId'],json_encode($game));
