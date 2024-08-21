'use client'
import { useEffect, useRef, useState } from "react";

import { Graph, Hash, Commit, GraphPrimitive, DrawCircle, DrawLine, Node } from "@/lib/types";
import DirectorySelector from "./DirectorySelector";
import CommitViewer from "./CommitViewer";
import CommitGenerator from "./CommitGenerator";
import { Circle, Line } from '@/components/SVG';

const fetchGraph = async (localOrRemote: 0|1): Promise<Graph> => {
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
    edges: new Map(graphPrimitive.edges),
    currentNodeHash: graphPrimitive.currentNodeHash
  }
  console.log('(GraphViewer) graph:', graph);
  return graph;
}

export default function GraphViewer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const triggerRef = useRef<any>(null);
  const [popover, setPopover] = useState({ x: 0, y: 0, isOpen: false });
  const [popoverCount, setPopverCount] = useState(0);
  const [dir, setDir] = useState<string>('');
  const [graph, setGraph] = useState<Graph | null>(null);

  const handleCircleClick = (x: number, y: number, hash: Hash) => {
    setPopover({ x: x, y: y, isOpen: true });
    setPopverCount(prevKey => prevKey + 1);
    if (triggerRef.current) {
      triggerRef.current.click();
      console.log('triggerRef.current is null'); 
    } else {
      console.log('triggerRef.current is not null');
    }
    console.log(`target node is x: ${x}, y: ${y}, hash: ${hash}`);
  };
  
  useEffect(() => {
    const getDir = async () => {
      const res = await fetch('/api/dir/get');
      const { directory }: { directory: string } = await res.json();
      if (!!directory) {
        setDir(directory);
      }
    }

    getDir();
  }, []);

  useEffect(() => {
    console.log('directory:', dir);
    if (svgRef.current && !!dir) {
      const svg = svgRef.current;
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const getGraph = async () => {
        const tempGraph = await fetchGraph(0);
        setGraph(tempGraph);
      }
      
      getGraph();
    } else {
      console.log('svgRef.current is falsy');
    }
  }, [dir]);

  return (
    <div id="Graph" className="ml-auto w-full h-full bg-white relative">
      <DirectorySelector setDir={setDir} dir={dir} />

      <div className="flex flex-row w-full h-full p-2 gap-2">
        <div className="w-4/5 h-full">
          <svg ref={svgRef} width="100%" height="100%" className="bg-slate-300">
            {graph && Array.from(graph.nodes).map(([hash, node]) => {
              return (
                <Circle
                  key={hash}
                  node = {node}
                  currentHead={graph.currentNodeHash}
                  handleCircleClick={handleCircleClick}
                />
              )
            })}

            {graph && Array.from(graph.edges).flatMap(([u, edges]) => {
              if (u === 'root') return;
              const fromNode = graph.nodes.get(u)!;
              const from = { x: fromNode.x, y: fromNode.y };

              return edges.map((v) => {
                const toNode = graph.nodes.get(v)!;
                const to = { x: toNode.x, y: toNode.y };
                return (
                  <Line
                    key={`${u}-${v}`}
                    from={from}
                    to={to}
                  />
                )
              })
            })}
          </svg>
        </div>
        <div className="flex flex-col-reverse w-1/5 h-full">
          <CommitGenerator />
        </div>
      </div>

      <CommitViewer popover={popover} setPopover={setPopover} popoverCount={popoverCount} triggerRef={triggerRef} />
    </div>
  );
}

