/**
 * 讀取 Smart 上的光敏電阻（腳位A0），用 console.log() 印出讀值
 */

const webduino = require("webduino-js");

let board = new webduino.WebArduino("10ZrdG14");

// 設定收到類比資料時的 callback
board.on(webduino.BoardEvent.ANALOG_DATA, (data) => {
	// 印出時間和數值
	console.log(new Date(), data.pin.value);
});

// Webduino 準備好時的 callback
board.on(webduino.BoardEvent.READY, function () {
	console.log("board ready");
	board.systemReset();

	// 設定取樣頻率（預設是16）
	board.samplingInterval = 50;

	// 設定腳位 A0 為 AIN
	board.setAnalogPinMode(0, webduino.Pin.AIN);
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