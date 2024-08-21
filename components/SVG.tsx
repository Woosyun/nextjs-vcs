import { Hash, Node } from "@/lib/types"
import { useEffect } from "react";

const gap = 80;
const R = 20;

export const Circle = ({
  node,
  currentHead,
  handleCircleClick
}: {
  node: Node,
  currentHead: Hash,
  handleCircleClick: any
  }) => {
  return (
    <circle
      cx={node.x * gap}
      cy={node.y * gap}
      r={R}
      stroke={node.hash === currentHead ? 'red' : 'black'}
      strokeWidth="3"
      fill="white"
      onClick={() => handleCircleClick(node.x * gap, node.y * gap, node.hash)}
    />
  )
}

export const Line = ({
  from,
  to
}: {
  from: { x: number, y: number },
  to: { x: number, y: number }
}) => {
  return (
    <line
      x1={from.x * gap}
      y1={from.y * gap + R}
      x2={to.x * gap}
      y2={to.y * gap - R}
      stroke="black"
      strokeWidth="3"
    />
  );
}