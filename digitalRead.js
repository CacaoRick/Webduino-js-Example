/**
 * 讀取 Smart 上的按鈕（腳位4）狀態，用 console.log() 印出
 */

const webduino = require("webduino-js");

let board = new webduino.WebArduino("10ZrdG14");

// Webduino 準備好時的 callback
board.on(webduino.BoardEvent.READY, function () {
	console.log("board ready");
	board.systemReset();
	board.samplingInterval = 50;

	// 取得腳位4的物件
	let button = board.getDigitalPin(4);

	// 將腳位4設為 DIN
	board.setDigitalPinMode(button.number, webduino.Pin.DIN);

	// 每 500 豪秒做一次
	setInterval(() => {
		// 將 button 腳位的數值顯示出來（看起來0是按下，1是放開耶）
		console.log(button.value);
	}, 500);
});

// Webduino 錯誤時的 callback
board.on(webduino.BoardEvent.ERROR, function (err) {
	console.log("board error", err.message);
});

// Webduino 斷線前的 callback
board.on(webduino.BoardEvent.BEFOREDISCONNECT, function () {
	console.log("board before disconnect");
});

// Webduino 斷線時的 callback
board.on(webduino.BoardEvent.DISCONNECT, function () {
	console.log("board disconnect");
	// test: should not emit "disconnect" again
	board.disconnect();
});