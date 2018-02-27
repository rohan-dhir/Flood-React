const COLORS = [0,1,2,3,4];

const randomIndexFromCollection = (collection) => {
  var index = 0;
  for (var i = 1, max = collection.length; i < max; i++) {
    if (Math.random() < 1/(i+1)) {
      index = i;
    }
  }
  return index;
}

class Node {
  constructor(id, color) {
    this.id = id;
    this.color = color;
  }
}

class Edge {
  constructor(sourceId, destId, weight) {
    this.sourceId = sourceId;
    this.destId = destId;
    this.weight = weight;
  }
}

class Graph {
  constructor(size=3) {
    this.size = size;
    this.nodes = {};
    this.edgesByNode = {};
    for (let i = 0; i < size*size; i++) {
      this.nodes[i] = new Node(i, randomIndexFromCollection(COLORS));
    }
    this.setEdgeWeights();
  }

  setEdgeWeight(id) {
      let node = this.nodes[id];
      let nodeId = node.id;
      let edges = [];

      let topIndex = nodeId - this.size;
      let rightIndex = nodeId + 1;
      let bottomIndex = nodeId + this.size;
      let leftIndex = nodeId - 1;

      if (topIndex >= 0) {
        let w = this.sameColor(nodeId, topIndex) ? 0 : 1;
        edges.push(new Edge(nodeId, topIndex, w));
      }

      if (rightIndex % this.size > 0) {
        let w = this.sameColor(nodeId, rightIndex) ? 0 : 1;
        edges.push(new Edge(nodeId, rightIndex, w));
      }

      if (bottomIndex < this.size * this.size) {
        let w = this.sameColor(nodeId, bottomIndex) ? 0 : 1;
        edges.push(new Edge(nodeId, bottomIndex, w));
      }

      if (nodeId % this.size !== 0) {
        let w = this.sameColor(nodeId, leftIndex) ? 0 : 1;
        edges.push(new Edge(nodeId, leftIndex, w));
      }

      this.edgesByNode[nodeId] = edges;
  }

  setEdgeWeights() {
    Object.keys(this.nodes).forEach((id) => {
      this.setEdgeWeight(id);
    });
  }

  updateColor(id, color) {
    this.nodes[id].color = color;
  }

  colorFill(color) {
    let seenIds = [];
    let processing = [0];
    let updateEdgeWeights = [];
    while (processing.length > 0) {
      let currentNodeId = processing.pop();
      this.updateColor(currentNodeId, color);
      seenIds.push(currentNodeId);
      this.edgesByNode[currentNodeId].forEach((edge) => {
        if (seenIds.indexOf(edge.destId) > -1) {
          return; // bail if we've seen it
        }
        if (edge.weight === 0) {
          processing.push(edge.destId);
        }
        if (edge.weight === 1 && this.nodes[currentNodeId].color === color) {
          updateEdgeWeights.push(currentNodeId);
        }
      });
    }
    updateEdgeWeights.forEach((nodeId) => this.setEdgeWeight(nodeId));
  }

  sameColor(nodeAId, nodeBId) {
    return this.nodes[nodeAId].color === this.nodes[nodeBId].color;
  }
}

export { Graph };
