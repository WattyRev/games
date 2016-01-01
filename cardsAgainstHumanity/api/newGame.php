<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Methods: PUT");
require_once('src/libsse.php');

if (!isset($_GET['host']) || !isset($_GET['nickname'])) {
    http_response_code(400);
    echo 'Host and nickname are required';
    return;
}

$newId = uniqid();
$data = new SSEData('file',array('path'=>'./data'));
function create($data) {
    $newId = uniqid();
    if (!empty(json_decode($data->get($newId))) {
        setcookie('currentGame', $newId, time()+60*60*24);
        $data->set($newId,json_encode(
            array(
                'players'=>array(),
                'host'=>$_GET['host'],
                'deck'=>file_get_contents('cards.json'),
                'discarded'=>array(),
                'id'=>$newId,
                'nickname'=>$_GET['nickname'],
                'started'=>false,
                'log'=>array(),
                'updated'=>time()
            )
        ));
        echo $newId;
        return;
    // } else {
    //     create($data);
    }
}
create($data);
