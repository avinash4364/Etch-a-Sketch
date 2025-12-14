const container = document.querySelector(".container");
const button = document.createElement("button");
button.textContent = "Adjust Grid Size";
document.body.insertAdjacentElement("afterbegin", button);

function createElement(size) {
    const div = document.createElement("div");
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.border = "1px solid #444";
    container.append(div);
}

function colorize(e) {
    e.target.style.backgroundColor = "blue";
}

function addHoverEffect() {
    const divs = container.children;
    for (const div of divs) {
        div.addEventListener("mouseenter", colorize);
    }
}

function createLayout(size = 16) {
    let gridInRow = size;
    const noOfGrids = gridInRow * gridInRow;
    const sizeOfDiv = container.clientWidth / gridInRow;
    for (let i = 0; i < noOfGrids; i++) {
        createElement(sizeOfDiv);
        addHoverEffect();
    }
}

function removeHoverEffect() {
    const divs = container.children;
    for (const div of divs) {
        div.removeEventListener("mouseenter", colorize);
    }
}

function removeLayout() {
    container.textContent = "";
    removeHoverEffect();
}

createLayout();
button.addEventListener("click", () => {
    const size = parseInt(
        prompt("Specify the no. of grid squares per row for the sketch pad")
    );
    let t1 = performance.now();
    removeLayout();
    createLayout(size);
    let t2 = performance.now();
    console.log(t2 - t1);
});
