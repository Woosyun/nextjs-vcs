'use client'
import { useEffect, useRef, useState } from "react";

import { drawLinePrimitive, drawCirclePrimitive, renderGraph } from "@/lib/render";
import { Graph, Hash, Commit, GraphPrimitive, DrawCircle, DrawLine } from "@/lib/types";
import DirectorySelector from "./DirectorySelector";
import CommitViewer from "./CommitViewer";
import CommitGenerator from "./CommitGenerator";

const getGraph = async (localOrRemote: 0|1): Promise<Graph> => {
  const res = await fetch('/api/get-graph', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ localOrRemote })
  });

  const {graph: graphPrimitive}: {graph: GraphPrimitive} = await res.json();
  const graph: Graph = {
    nodes: new Map(graphPrimitive.nodes),
    edges: new Map(graphPrimitive.edges)
  }
  console.log('(GraphViewer) nodes:', graph.nodes);
  return graph;
}

export default function GraphViewer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const triggerRef = useRef<any>(null);
  const [popover, setPopover] = useState({ x: 0, y: 0, isOpen: false });
  const [popoverCount, setPopverCount] = useState(0);
  const [dir, setDir] = useState('');

  useEffect(() => {
    const getDir = async () => {
      const res = await fetch('/api/dir/get');
      const { directory } = await res.json();
      if (!!directory) {
        setDir(directory);
      }
    }

    getDir();
  }, []);
  
  useEffect(() => {
    if (svgRef.current && !!dir) {
      const svg = svgRef.current;

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const handleCircleClick = (x: number, y: number, hash: Hash) => {
        setPopover({ x: x, y: y, isOpen: true });
        setPopverCount(prevKey => prevKey + 1);
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
      const render = async () => {
        const graph = await getGraph(0);
        renderGraph(graph, drawCircle, drawLine);
      }
      
      render();
    } else {
      console.log('svgRef.current is falsy');
    }
  }, [dir]);

  return (
    <div id="Graph" className="ml-auto w-full h-full bg-white relative">
      <DirectorySelector setDir={setDir} dir={dir} />

      <div className="flex flex-row w-full h-full p-2 gap-2">
        <div className="w-4/5 h-full">
          <svg ref={svgRef} width="100%" height="100%" className="bg-slate-300"></svg>
        </div>
        <div className="flex flex-col-reverse w-1/5 h-full">
          <CommitGenerator />
        </div>
      </div>

      <CommitViewer popover={popover} setPopover={setPopover} popoverCount={popoverCount} triggerRef={triggerRef} />
    </div>
  );
}

