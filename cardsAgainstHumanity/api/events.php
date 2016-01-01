<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/event-stream');
session_start();
require_once('src/libsse.php');

$GLOBALS['data'] = new SSEData('file',array('path'=>'./data'));
$sse = new SSE();

class CurrentGame extends SSEEvent {
	private $cache = 0;
	private $data;
	public function update(){
		return 'test';
	}
	public function check(){
		$this->data = json_decode($GLOBALS['data']->get('currentGame'));
		if($this->data->updated !== $this->cache){
			$this->cache = $this->data->updated;
			return true;
		}
		return false;
	}
};

$sse->exec_limit = 30;
$sse->addEventListener('gameUpdate',new CurrentGame());
$sse->start();
