<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/event-stream');
session_start();
require_once('src/libsse.php');

if (isset($_GET['id'])) {
	$GLOBALS['data'] = new SSEData('file',array('path'=>'./data', 'gc_lifetime' => 6400));
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

	$sse->exec_limit = 0;
	$sse->addEventListener('gameUpdate', new CurrentGame());
	$sse->start();
} else {
	$GLOBALS['data'] = new SSEData('file',array('path'=>'./data', 'gc_lifetime' => 16000));
	$sse = new SSE();

	class CurrentGames extends SSEEvent {
		private $cache = 0;
		private $data;
		public function update(){
			$status = $GLOBALS['data']->get('status');
			if (strlen($status) < 1) {
				return json_encode(array(
					'games'=>array()
				));
			} else {
				return $status;
			}
		}
		public function check(){
			$this->data = json_decode($GLOBALS['data']->get('status'));
			if($this->data->updated !== $this->cache){
				$this->cache = $this->data->updated;
				return true;
			}
			return false;
		}
	};

	$sse->exec_limit = 0;
	$sse->addEventListener('statusUpdate', new CurrentGames());
	$sse->start();
}
