var val, msg, reset = false, cells, cellsCopy, rule, k = 55;
const regx = /^([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

function setup() {
	createCanvas(windowWidth, windowHeight);
	val = createInput();
	val.position(710, 15);
	var msg = createP("Enter a number (0 - 255) to print rule : ");
	msg.position(450, 0);
	val.input(()=> {
		reset = true;
	});
	frameRate(10);
}

function draw() {
	if (regx.test(val.value())) {
		if (reset) {
			rule = decimalToBinary(parseInt(val.value()));
			cells = [];
			cellsCopy = [];
			for (i = 0; i < 274; i++) {
				cells.push(0);
			}
			cells[137] = 1;
			cellsCopy = cells.slice();
			k = 55;
			clear();
			reset = false;
		}
		drawCell();
		update();
	}
}

function drawCell() {
	if (k < 390) {
		let j = 0;
		for (let i = 0; i < windowWidth; i += 5) {
			if (cells[j] == 0) {
				fill(0);
			}
			else {
				fill(255);
			}
			rect(i, k, 5, 5);
			j++;
		}
		update();
		k+=5;
	}
}

function update() {
	for (let i = 1; i < cells.length - 2; i++) {
		cellsCopy[i] = getNewState(cells[i - 1], cells[i], cells[i + 1]);
	}
	cells = cellsCopy.slice();
}

function getNewState(left, center, right) {
	if (left == 1 && center == 1 && right == 1) {
		return rule[0];
	}
	if (left == 1 && center == 1 && right == 0) {
		return rule[1];
	}
	if (left == 1 && center == 0 && right == 1) {
		return rule[2];
	}
	if (left == 1 && center == 0 && right == 0) {
		return rule[3];
	}
	if (left == 0 && center == 1 && right == 1) {
		return rule[4];
	}
	if (left == 0 && center == 1 && right == 0) {
		return rule[5];
	}
	if (left == 0 && center == 0 && right == 1) {
		return rule[6];
	}
	if (left == 0 && center == 0 && right == 0) {
		return rule[7];
	}
}

function decimalToBinary(decimal) {
	let bin = [];
	while (decimal > 0) {
		bin.unshift(decimal % 2);
		decimal = parseInt(decimal / 2);
	}
	while (bin.length < 8) {
		bin.unshift(0);
	}
	return bin;
}
