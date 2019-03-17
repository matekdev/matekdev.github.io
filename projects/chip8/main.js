// Create new instance of Chip8CPU object
let Chip8 = new Chip8CPU();

// Reset all Chip8 variables
Chip8.reset();

// Rom files
// Where we store rom file from website
let rom = null;

// Load the default rom into memory
Chip8.loadrom(Chip8.rom);

// Const for drawing
const SCALE = 10;
const CANVAS = document.getElementById("canvas");
const draw2d = CANVAS.getContext("2d");

// Value for setting emulator speed
let speed = 2;

// For pausing
var pause_flag = false;

// Stack for stepping back
let cpuStack = [];

// For keyboard
//https://codereview.stackexchange.com/questions/190905/chip-8-emulator-in-javascript
var keyMap = {
    49:0x1, 50:0x2, 51:0x3, 52:0xc,
    81:0x4, 87:0x5, 69:0x6, 82:0xd,
    65:0x7, 83:0x8, 68:0x9, 70:0xe,
    90:0xa, 88:0x0, 67:0xb, 86:0xf
};

var keyDown = function(e){
    var keycode = keyMap[e.keyCode];
    if (typeof keycode !== 'undefined') {
        Chip8.key[keycode] = 1;
    }

};

var keyUp = function(e){
    var keycode = keyMap[e.keyCode];
    if (typeof keycode !== 'undefined') {
        Chip8.key[keycode] = 0;
    }

};

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);


// SEt the speed of the emulator
let interval = setInterval(running, speed);

function running() {
    if (pause_flag) {
        //pause the emulator
    } else { // run the emulator

        // Check to see if the user uploaded a new rom
        if (rom != null) {
            // If our current rom we are 
            if (Chip8.rom != rom) {
                Chip8.rom = rom;
                restartEmulator();
            }
        }

        // Call emulate cycle
        Chip8.emulateCycle();
        // Call drawing
        window.requestAnimationFrame(visualizer());
    }
    // Displaying info to HTML
    displayToHTML(Chip8);

}

function visualizer() {
    // Lets draw
    // https://github.com/vopi181/vChip/blob/master/main.cpp
    if (Chip8.draw_flag == true) {
        // The vertical point at which we will be drawing the square
        vertical = 0;
        // The vertical offset to which we draw the box (0-32)
        vertical_offset = 0;
        // Loop through the entire graphics array
        for (let i = 0; i < Chip8.graphics.length; ++i) {
            
            // Horizontal point
            horizontal = (i % 64);

            // If we see 1 in the array
            if (Chip8.graphics[i] == 1) {
                // Draw a white square
                draw2d.fillStyle = "white";
                draw2d.fillRect(horizontal * SCALE, vertical * SCALE, 10, 10);  
            } else {
                // Otherwise draw black
                draw2d.fillStyle = "black";
                draw2d.fillRect(horizontal * SCALE, vertical * SCALE, 10, 10);  
            }

            // Move along vertically
            vertical_offset += 1;
            // Loop back and redraw if it goes outside the canvas
            if (vertical_offset == 64) {
                vertical += 1;
                vertical_offset = 0;
            }
        }
        Chip8.draw_flag = false;
    }
}

// Set the speed of the emulator
function setSpeed() {
    // Get the value from the html page
    speed = document.getElementById("speedInput").value;
    // Stop the interval
    clearInterval(interval);
    // Restart everything
    restartEmulator();
    // Start the interval again
    interval = setInterval(running, speed);
}

function pauseEmulator() {
    pause_flag = !(pause_flag);
}

function restartEmulator() {
    draw2d.clearRect(0, 0, canvas.width, canvas.height);
    Chip8.reset();
    Chip8.loadrom(Chip8.rom);
    pause_flag = false;
    cpuStack = [];
}

function stepForward() {
    if (pause_flag) {
        Chip8.emulateCycle();
        visualizer();
    }
}

function stepBackward() {
    if (pause_flag) {
        if (cpuStack.length > 0) {
            Chip8 = cpuStack.pop();
            Chip8.rom = rom;
            visualizer();
        }
    }
}

function displayToHTML(Chip8) {
    // Register_V
    document.getElementById("V0").textContent = Chip8.register_V[0].toString(16).toUpperCase();
    document.getElementById("V1").textContent = Chip8.register_V[1].toString(16).toUpperCase();
    document.getElementById("V2").textContent = Chip8.register_V[2].toString(16).toUpperCase();
    document.getElementById("V3").textContent = Chip8.register_V[3].toString(16).toUpperCase();
    document.getElementById("V4").textContent = Chip8.register_V[4].toString(16).toUpperCase();
    document.getElementById("V5").textContent = Chip8.register_V[5].toString(16).toUpperCase();
    document.getElementById("V6").textContent = Chip8.register_V[6].toString(16).toUpperCase();
    document.getElementById("V7").textContent = Chip8.register_V[7].toString(16).toUpperCase();
    document.getElementById("V8").textContent = Chip8.register_V[8].toString(16).toUpperCase();
    document.getElementById("V9").textContent = Chip8.register_V[9].toString(16).toUpperCase();
    document.getElementById("VA").textContent = Chip8.register_V[0xA].toString(16).toUpperCase();
    document.getElementById("VB").textContent = Chip8.register_V[0xB].toString(16).toUpperCase();
    document.getElementById("VC").textContent = Chip8.register_V[0xC].toString(16).toUpperCase();
    document.getElementById("VD").textContent = Chip8.register_V[0xD].toString(16).toUpperCase();
    document.getElementById("VE").textContent = Chip8.register_V[0xE].toString(16).toUpperCase();
    document.getElementById("VF").textContent = Chip8.register_V[0xF].toString(16).toUpperCase();
    document.getElementById("DT").textContent = Chip8.delay_timer;
    document.getElementById("ST").textContent = Chip8.sound_timer;
    // https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    document.getElementById("RI").textContent = (Chip8.register_I+0x10000).toString(16).substr(-4).toUpperCase();;
    document.getElementById("PC").textContent = (Chip8.program_counter+0x10000).toString(16).substr(-4).toUpperCase();;
}


// https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
// https://stackoverflow.com/questions/23144647/file-api-hex-conversion-javascript
// Reads rom from website
function readRom(e) {
    let file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
        // https://stackoverflow.com/questions/23144647/file-api-hex-conversion-javascript
        let file = e.target.result;
        let u = new Uint8Array(file);
        length = u.length;
        rom = new Array(length);
        // Convert Array to Hex
        while (length--) {
            rom[length] = (u[length] < 16 ? '0' : '') + u[length].toString(16);
        }

        // Convert Hex (strings) to normal Hex
        for (let i = 0; i < rom.length; ++i) {
            rom[i] = parseInt("0x"+rom[i]);
        }

    };
    reader.readAsArrayBuffer(file);
}
document.getElementById('input')
  .addEventListener('change', readRom, false);