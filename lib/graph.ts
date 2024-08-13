export const drawCircle = ({ x, y, handleClick }: { x: number, y: number, handleClick: any }) => {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x.toString());
  circle.setAttribute("cy", y.toString());
  circle.setAttribute("r", "20");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", "white");

  circle.addEventListener("click", () => handleClick(x, y));

  return circle;
};

export const drawLine = ({ fromX, fromY, toX, toY }: { fromX: number, fromY: number, toX: number, toY: number }) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", fromX.toString());
  line.setAttribute("y1", fromY.toString());
  line.setAttribute("x2", toX.toString());
  line.setAttribute("y2", toY.toString());
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "3");

  return line;
};

// branch 정보를 받아서 바꾸는게 아니라 그냥 로컬에서 읽어온다고 생각해보자
export function createLocalGraph() {
  const branches: string[] = getBranches(0);
  
}
// assign location to graph