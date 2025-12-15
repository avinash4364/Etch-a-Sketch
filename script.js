const container = document.querySelector(".container");
const innerContainer = document.createElement("div");
const clearButton = document.querySelector(".clear-btn");
const button = document.createElement("button");
const colorScheme = document.getElementById("color-scheme");
button.textContent = "Adjust Grid Size";
document.body.insertAdjacentElement("afterbegin", button);

function createElement(size) {
    const div = document.createElement("div");
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.border = "1px solid rgba(119, 119, 119, 0.30)";
    div.style.backgroundColor = "#fff";
    innerContainer.append(div);
}

function generateColor() {
    const rgb = [];
    for (let i = 0; i < 3; i++) {
        rgb.push(Math.floor(Math.random() * 255) + 1);
    }
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

function colorize(e) {
    const shadesOfGrey = [
        "#000",
        "#111",
        "#222",
        "#333",
        "#444",
        "#555",
        "#666",
        "#777",
        "#888",
        "#999",
    ];
    if (colorScheme.selectedIndex === 0) {
        e.target.style.backgroundColor =
            shadesOfGrey[Math.floor(Math.random() * 10) + 1];
    } else if (colorScheme.selectedIndex === 1) {
        e.target.style.backgroundColor = generateColor();
    } else {
        let backgroundColor = e.target.style.backgroundColor;
        console.log(`earlier background: ${backgroundColor}`);
        let [r, g, b] = backgroundColor
            .slice(4, -1)
            .split(",")
            .map((color) => Math.floor(Math.max(0, parseFloat(color) - 25.5)));
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}

function addHoverEffect(add = true) {
    const divs = innerContainer.children;
    if (add) {
        for (const div of divs) {
            div.addEventListener("mouseenter", colorize);
        }
    } else {
        for (const div of divs) {
            div.removeEventListener("mouseenter", colorize);
        }
    }
}

function createLayout(size = 16) {
    let gridInRow = size;
    const noOfGrids = gridInRow * gridInRow;
    const sizeOfDiv = container.clientWidth / gridInRow;
    for (let i = 0; i < noOfGrids; i++) {
        createElement(sizeOfDiv);
    }
    container.append(innerContainer);
}

function removeLayout() {
    innerContainer.textContent = "";
}

function removeColor() {
    const divs = innerContainer.children;
    for (const div of divs) {
        div.style.backgroundColor = "initial";
        div.style.opacity = 1;
    }
}

createLayout();
addHoverEffect();
button.addEventListener("click", () => {
    const size = parseInt(
        prompt(
            "Specify the no. of grid squares per row for the sketch pad b/w 16 and 100"
        )
    );
    if (size && size <= 100 && size >= 16) {
        // let t1 = performance.now();
        removeLayout();
        addHoverEffect(false);
        createLayout(size);
        addHoverEffect();
        // let t2 = performance.now();
        // console.log(t2 - t1);
    } else {
        alert("Invalid Value");
    }
});

// colorScheme.addEventListener("change", removeColor);
clearButton.addEventListener("click", removeColor);
