<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Methods: PUT");
session_start();
require_once('./src/libsse.php');

if (!isset($_GET['host']) || !isset($_GET['nickname'])) {
    http_response_code(400);
    echo 'Host and nickname are required';
    return;
}

$data = new SSEData('file',array('path'=>'./data'));
function create($data) {
    $newId = uniqid();
    if (strlen($data->get($newId) < 1)) {
        $data->set($newId,json_encode(
            array(
                'players'=>array(),
                'host'=>$_GET['host'],
                'deck'=>json_decode(file_get_contents('cards.json')),
                'discarded'=>array(),
                'id'=>$newId,
                'nickname'=>$_GET['nickname'],
                'started'=>false,
                'log'=>array(
                    array(
                        'message'=>'New game "' . $_GET['nickname'] . '" created.',
                        'time'=>time(),
                        'from'=>'system'
                    )
                ),
                'updated'=>time()
            )
        ));
        $status = array(
            'updated'=>time(),
            'games'=>array()
        );
        if (strlen($data->get('status') > 0)) {
            $status = json_decode($data->get('status'));
        }
        var_dump($status);
        $status['updated'] = time();
        array_push($status->games, array(
            'id'=>$newId,
            'nickname'=>$_GET['nickname'],
            'created'=>time()
        ));
        $data->set('status',json_encode($status));
        echo $newId;
        return;
    } else {
        create($data);
    }
}
create($data);
