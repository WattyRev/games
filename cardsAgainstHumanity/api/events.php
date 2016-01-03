<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/event-stream');
session_start();
require_once('src/libsse.php');

if (isset($_GET['id'])) {
	$GLOBALS['data'] = new SSEData('file',array('path'=>'./data'));
	$sse = new SSE();

	class CurrentGame extends SSEEvent {
		private $cache = 0;
		private $data;
		public function update(){
			return $GLOBALS['data']->get($_GET['id']);
		}
		public function check(){
			$this->data = json_decode($GLOBALS['data']->get($_GET['id']));
			if($this->data->updated !== $this->cache){
				$this->cache = $this->data->updated;
				return true;
			}
			return false;
		}
	};

	$sse->exec_limit = 30;
	$sse->addEventListener('gameUpdate', new CurrentGame());
	$sse->start();
} else {
	$GLOBALS['data'] = new SSEData('file',array('path'=>'./data'));
	$sse = new SSE();

	class CurrentGames extends SSEEvent {
		private $cache = 0;
		private $data;
		public function update(){
			return $GLOBALS['data']->get('status');
		}
		public function check(){
			$this->data = json_decode($GLOBALS['data']->get('status');
			if($this->data->updated !== $this->cache){
				$this->cache = $this->data->updated;
				return true;
			}
			return false;
		}
	};

	$sse->exec_limit = 30;
	$sse->addEventListener('statusUpdate', new CurrentGames());
	$sse->start();
}
