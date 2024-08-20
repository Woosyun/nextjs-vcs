'use client'
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { drawLinePrimitive, drawCirclePrimitive, renderGraph } from "@/lib/render";
import { Graph, Hash, Commit, GraphPrimitive, DrawCircle, DrawLine } from "@/lib/types";
import vcs from "@/lib/vcs/vcs";

const getGraph = async (localOrRemote: 0|1): Promise<Graph> => {
  const res = await fetch('/api/get-graph', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ localOrRemote })
  });

  const {graph: graphPrimitive} = await res.json();
  const graph: Graph = {
    commits: new Map(graphPrimitive.commits),
    edges: new Map(graphPrimitive.edges)
  }
  console.log('(GraphViewer) commits:', graph.commits);
  return graph;
}

const initVCS = async () => {
  const res = await fetch('/api/vcs/init', {
    method: 'GET'
  });
};

export default function GraphViewer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const triggerRef = useRef<any>(null);
  const [popover, setPopover] = useState({ x: 0, y: 0, isOpen: false });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (svgRef.current) {
      const svg = svgRef.current;

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const handleCircleClick = (x: number, y: number, hash: Hash) => {
        setPopover({ x: x, y: y, isOpen: true });
        setKey(prevKey => prevKey + 1);
        if (triggerRef.current) {
          triggerRef.current.click();
          console.log('triggerRef.current is null'); 
        } else {
          console.log('triggerRef.current is not null');
        }
        console.log("target hash is ", hash);
      };
      const drawCircle: DrawCircle = drawCirclePrimitive(svgRef.current!, handleCircleClick);
      const drawLine: DrawLine = drawLinePrimitive(svgRef.current!);
      const draw = async () => {
        initVCS().then(() => getGraph(0)).then((graph: Graph) => renderGraph(graph, drawCircle, drawLine))
      }

      draw();
    } else {
      console.log('svgRef.current is falsy');
    }
  }, []);

  return (
    <div id="Graph" className="ml-auto w-4/5 h-full bg-white relative">
      <h1>{`triggerRef.current is ${triggerRef.current ? "not null" : 'null'}`}</h1>
      <p>{`x: ${popover.x} y: ${popover.y} isOpen: ${popover.isOpen}`}</p>
      <svg ref={svgRef} width="100%" height="100%" className="bg-slate-300"></svg>

      <Popover open={popover.isOpen} onOpenChange={(open) => setPopover(prev => ({ ...prev, isOpen: open }))}>
        <PopoverTrigger asChild>
          <button key={key} ref={triggerRef} style={{ position: 'absolute', left: `${popover.x}px`, top: `${popover.y + 60}px`, transform: 'translate(-50%, -50%)'}}>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <h1>hello world</h1>
        </PopoverContent>
      </Popover>
    </div>
  );
}