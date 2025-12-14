const container = document.querySelector(".container");
const innerContainer = document.createElement("div");
const button = document.createElement("button");
button.textContent = "Adjust Grid Size";
document.body.insertAdjacentElement("afterbegin", button);

function createElement(size) {
    const div = document.createElement("div");
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.border = "1px solid #777";
    innerContainer.append(div);
}

function colorize(e) {
    e.target.style.backgroundColor = "blue";
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
        console.log(t2 - t1);
    } else {
        alert("Invalid Value");
    }
});
