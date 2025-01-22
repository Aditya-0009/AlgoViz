let blocks = document.querySelector(".drawing-area");
let addEdge = false;
let cnt = 0;
let graph = [];
let nodes = [];
let arr = [];

// Alert user to read instructions
let alerted = localStorage.getItem("alerted") || "";
if (alerted !== "yes") {
  alert("Read instructions before proceeding by clicking the 'i' icon in the top-right corner");
  localStorage.setItem("alerted", "yes");
}

// Called when user starts adding edges
const addEdges = () => {
  if (cnt < 2) {
    alert("Create at least two nodes to add an edge");
    return;
  }

  addEdge = true;
  document.getElementById("add-edge-enable").disabled = true;
  document.getElementsByClassName("run-btn")[0].disabled = false;
  graph = new Array(cnt).fill(null).map(() => []);
};

// Create and append a node to the canvas
const appendBlock = (x, y) => {
  document.querySelector(".reset-btn").disabled = false;
  document.querySelector(".click-instruction").style.display = "none";
  
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.top = `${y}px`;
  block.style.left = `${x}px`;
  block.style.transform = `translate(-50%,-50%)`;
  block.id = cnt;
  block.innerText = cnt;
  nodes[cnt] = { x, y };

  block.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!addEdge) return;

    block.style.backgroundColor = "coral";
    arr.push(block.id);

    if (arr.length === 2) {
      drawEdge(arr[0], arr[1]);
      arr = [];
    }
  });

  blocks.appendChild(block);
  cnt++;
};

// Allow creating nodes on screen by clicking
blocks.addEventListener("click", (e) => {
  if (addEdge) return;
  if (cnt > 12) {
    alert("Cannot add more than 12 vertices");
    return;
  }
  appendBlock(e.x, e.y);
});

// Draw a line between nodes
const drawEdge = (id1, id2) => {
  if (id1 === id2 || graph[id1].includes(parseInt(id2))) return; // Avoid self-loops and duplicate edges

  const x1 = nodes[id1].x;
  const y1 = nodes[id1].y;
  const x2 = nodes[id2].x;
  const y2 = nodes[id2].y;
  const length = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

  graph[id1].push(parseInt(id2));
  graph[id2].push(parseInt(id1));

  const line = document.createElement("div");
  line.classList.add("line");
  line.style.width = `${length}px`;
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;

  const angle = Math.atan2(y2 - y1, x2 - x1);
  line.style.transform = `rotate(${angle}rad)`;

  blocks.appendChild(line);
};

// Start BFS traversal from node 0
const startBFS = () => {
  if (cnt === 0) {
    alert("No nodes to traverse");
    return;
  }

  if (!isTree()) {
    alert("The graph is not a valid tree for BFS traversal.");
    return;
  }

  document.getElementsByClassName("path")[0].innerHTML = "";
  bfs(0); // Start BFS from the first node
};

// Check if the graph is a valid tree
const isTree = () => {
  let visited = Array(cnt).fill(false);
  let parent = Array(cnt).fill(null);

  const dfs = (node) => {
    visited[node] = true;
    for (let neighbor of graph[node]) {
      if (!visited[neighbor]) {
        parent[neighbor] = node;
        if (!dfs(neighbor)) return false;
      } else if (neighbor !== parent[node]) {
        return false; // Detected a cycle
      }
    }
    return true;
  };

  // Check if the graph is connected and acyclic
  return dfs(0) && visited.every(v => v);
};

// BFS algorithm
const bfs = async (startNode) => {
  let visited = Array(cnt).fill(false);
  let queue = [startNode];
  visited[startNode] = true;

  const pathContainer = document.getElementsByClassName("path")[0];
  const path = document.createElement("p");
  path.innerText = `BFS Traversal: ${startNode}`;
  pathContainer.appendChild(path);

  while (queue.length > 0) {
    const node = queue.shift();
    document.getElementById(node).style.backgroundColor = "grey";

    for (let neighbor of graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
        document.getElementById(neighbor).style.backgroundColor = "aqua";
        path.innerText += ` -> ${neighbor}`;
        await wait(500);
      }
    }
  }
};

// Utility function to create a delay
const wait = (t) => new Promise(resolve => setTimeout(resolve, t));

// Reset the drawing area
const resetDrawingArea = () => {
  blocks.innerHTML = "";
  const p = document.createElement("p");
  p.classList.add("click-instruction");
  p.innerText = "Click to create node";

  blocks.appendChild(p);
  document.getElementById("add-edge-enable").disabled = false;
  document.querySelector(".reset-btn").disabled = true;
  document.getElementsByClassName("path")[0].innerHTML = "";

  cnt = 0;
  graph = [];
  nodes = [];
  addEdge = false;
};
