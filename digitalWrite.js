/**
 * 設定 Smart 上的LED（RGB分別為腳位15, 12, 13）
 */

const webduino = require("webduino-js");

let board = new webduino.WebArduino("10ZrdG14");

// Webduino 準備好時的 callback
board.on(webduino.BoardEvent.READY, function () {
	console.log("board ready");
	board.systemReset();
	board.samplingInterval = 50;

	// 取得腳位15的物件（看要什麼色）
	let led = board.getDigitalPin(15);

	// 記錄現在的 Led 狀態
	let ledOn = false;

	// 每 500 豪秒做一次
	setInterval(() => {
		// 改變 led 狀態
		ledOn = !ledOn;

		// 根據狀態決定要不要亮
		led.write(ledOn ? 1 : 0);
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