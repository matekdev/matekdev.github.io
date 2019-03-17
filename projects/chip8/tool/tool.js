// Setup drawing on canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Create pixel class to be set
class Pixel {
    set = false;

    Pixel() {
        set = false;
    }
}

// The hex values for each row
let rows = [
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[]
            ]

// Create the grid of pixels
let grid = [];

// Populate the grid of pixels
for (let i = 0; i < 15; ++i) {
    grid[i] = [];
    for (let j = 0; j < 8; ++j) {
        obj = new Pixel();
        grid[i][j] = obj;
    }
}

// Constant draw loop
setInterval(drawLoop, 10);

// Draw the pixels onto the screen
function drawLoop() {
    for (let i = 0; i < 15; ++i) {
        for (let j = 0; j < 8; ++j) {
            // Draw black if the pixel isn't set
            if (grid[i][j].set == false) {
                ctx.fillStyle = "black";
                ctx.fillRect(j*30, i*30, 30, 30);
            // Draw white if the pixel is set
            } else if (grid[i][j].set == true) {
                ctx.fillStyle = "white";
                ctx.fillRect(j*30, i*30, 30, 30);
            }
        }
    }

    // Draw the vertical grid lines
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 15; ++j) {
            ctx.fillStyle = "grey";
            ctx.fillRect(i*30, j*30, 1, 30);
        }
    }

    for (let i = 0; i < 15; ++i) {
        for (let j = 0; j < 15; ++j) {
            ctx.fillStyle = "grey";
            ctx.fillRect(j*30, i*30, 30, 1);
        }
    }

    // Convert the grid to binary
    convertGridToBinary();
    // Convert and display the grid to hex
    convertGridToHex();
}

// Takes the grid, and converts each "pixel" to a number, either 1 or 0
function convertGridToBinary() {
    for (let i = 0; i < 15; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (grid[i][j].set == true) {
                rows[i][j] = 1;
            } else {
                rows[i][j] = 0;
            }
        }
    }
}

// Convers the grid to hex, then displays it on the webpage
function convertGridToHex() {
    // The pairs of hex values
    hexArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // Join together the entire grid array, and convert it to hex
    for (let i = 0; i < 15; ++i) {
        hexArray[i] = rows[i].join("");
        hexArray[i] = parseInt(hexArray[i], 2).toString(16).toUpperCase();
    }

    // Add a 0 before every value thats smaller than 0xF (because chip8 deals with two hex values at a time)
    for (let i = 0; i < 15; ++i) {
        if (parseInt(hexArray[i], 16) <= 0xF && parseInt(hexArray[i], 16) >= 0) {
            hexArray[i] = "0" + hexArray[i];
        }
    }

    for (let i = 0; i < 15; ++i) {
        hexArray[i] = "0x" + hexArray[i];
    }

    // Print to the webiste
    document.getElementById("Hex").innerHTML = hexArray[0] + " " + hexArray[1] + " " + hexArray[2] + " " + hexArray[3] + " " + hexArray[4] + " " + hexArray[5] + " " + hexArray[6] + " " + hexArray[7] + " " + hexArray[8] + " " + hexArray[9] + " " + hexArray[10] + " " + hexArray[11] + " " + hexArray[12] + " " + hexArray[13] + " " + hexArray[14];
}


// Reference
// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
// Set the pixel if clicked
function drawPixel(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    x = (parseInt(x / 30, 10) * 30)/30;
    y = (parseInt(y / 30, 10) * 30)/30;

    // If the click is out of the array set it back within
    if (y == 15) {
        y = 14;
    }

    // If the click is out of the array set it back within
    if (x == 8) {
        x = 7;
    }

    // Set the pixel within the grid
    if (grid[y][x].set == true) {
        grid[y][x].set = false;
    } else if (grid[y][x].set = true) {
        grid[y][x].set = true;
    }
    

}

function resetDrawing() {
    for (let i = 0; i < 15; ++i) {
        for (let j = 0; j < 8; ++j) {
            grid[i][j].set = false;
        }
    }
}
