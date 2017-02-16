/**
 * 設定 Smart 上的LED（RGB分別為腳位15, 12, 13），做成呼吸燈
 */

const webduino = require("webduino-js");

let board = new webduino.WebArduino("10ZrdG14");

// Webduino 準備好時的 callback
board.on(webduino.BoardEvent.READY, function () {
	console.log("board ready");
	board.systemReset();
	board.samplingInterval = 50;

	// 取得LED腳位的物件
	let rLed = board.getDigitalPin(15);
	let gLed = board.getDigitalPin(12);
	let bLed = board.getDigitalPin(13);
	// 設為 PWM 模式
	board.setDigitalPinMode(rLed.number, webduino.Pin.PWM);
	board.setDigitalPinMode(gLed.number, webduino.Pin.PWM);
	board.setDigitalPinMode(bLed.number, webduino.Pin.PWM);
	// 先全部關掉
	rLed.write(0);
	gLed.write(0);
	bLed.write(0);

	let ledIntensity = 0;	// 記錄現在的 Led 強度
	let addMode = true;		// 記錄現在是增加強度還是減少強度

	// 每 10 豪秒做一次
	setInterval(() => {

		// 寫入目前的強度
		bLed.write(ledIntensity);

		// 印出 LED 的 value
		console.log(bLed.value);

		// 根據是否為增加模式來計算下一次的強度
		if (addMode) {
			ledIntensity += 0.01;
			if (ledIntensity > 1) {
				addMode = !addMode;
			}
		} else {
			ledIntensity -= 0.01;
			if (ledIntensity <= 0) {
				addMode = !addMode;
			}
		}
	}, 10);
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