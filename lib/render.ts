import { DrawCircle, DrawLine, Graph, Hash, Node } from "./types";

const gap = 80;
const R = 20;

export function renderGraph(graph: Graph, drawCircle: DrawCircle, drawLine: DrawLine) {
  try {
    // console.log('(renderGraph)graph:', graph);
  
    const { nodes, edges }: Graph = graph;
    nodes.forEach((node: Node, hash: Hash) => {
      drawCircle(node.x * gap, node.y * gap, hash);
    });
    edges.forEach((vArray: Hash[], u: Hash) => {
      if (u !== 'root') {
        vArray.forEach((v: Hash) => {
          const fromNode: Node = nodes.get(u)!;
          const from = { x: fromNode.x * gap, y: fromNode.y * gap + R };
          const toNode: Node = nodes.get(v)!;
          const to = { x: toNode.x * gap, y: toNode.y * gap - R};
          console.log('(renderGraph) from:', from, ' to:', to);
          drawLine({ from, to });
        });
      }
    });
  } catch (error: any) {
    console.log('(renderGraph) error: ', error.message);
  }
}

export const drawCirclePrimitive = (svg: SVGSVGElement, handleClick: any): DrawCircle => {
  return (x: number, y: number, hash: Hash) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", R.toString());
    circle.setAttribute("stroke", "black");
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("fill", "white");

    circle.addEventListener("click", () => handleClick(x, y, hash));

    svg.appendChild(circle);
  }
}

export const drawLinePrimitive = (svg: SVGSVGElement): DrawLine => {
  return ({ from, to }: { from: {x: number, y: number}, to: {x: number, y: number} }): void => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x.toString());
    line.setAttribute("y1", from.y.toString());
    line.setAttribute("x2", to.x.toString());
    line.setAttribute("y2", to.y.toString());
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "3");

    // if (handleClick) {
    //   line.addEventListener("click", () => handleClick(fromX, fromY, toX, toY));
    // }

    svg.appendChild(line);
  }
}