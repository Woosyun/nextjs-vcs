import { DrawCircle, DrawLine, Graph, Hash } from "./types";

export function renderGraph(graph: Graph, drawCircle: DrawCircle, drawLine: DrawLine) {
  console.log('(renderGraph)graph:', graph);
}

export const drawCirclePrimitive = (svg: SVGSVGElement, handleClick: any): DrawCircle => {
  return (x: number, y: number, hash: Hash) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", "20");
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