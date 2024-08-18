'use client'
import { useContext, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { drawLine, drawCircle } from "@/lib/graph/svg";
import { useVCS } from "./VCSProvider";

function Graph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const triggerRef = useRef<any>(null);
  const [popover, setPopover] = useState({ x: 0, y: 0, isOpen: false });
  const [key, setKey] = useState(0);

  const vcs = useVCS();
  
  useEffect(() => {
    if (svgRef.current) {
      const svg = svgRef.current;

      const handleCircleClick = (x: number, y: number) => {
        setPopover({ x: x, y: y, isOpen: true });
        setKey(prevKey => prevKey + 1);
        if (triggerRef.current) {
          triggerRef.current.click();
          console.log('triggerRef.current is null'); 
        } else {
          console.log('triggerRef.current is not null');
        }
      };

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const midX = svgRef.current.getBoundingClientRect().width / 2;

      svg.appendChild(drawCircle({ x: midX, y: 50, handleClick: handleCircleClick }));
      svg.appendChild(drawLine({ fromX: midX, fromY: 70, toX: midX, toY: 180 }));
      svg.appendChild(drawCircle({ x: midX, y: 200, handleClick: handleCircleClick }));
      svg.appendChild(drawLine({ fromX: midX, fromY: 220, toX: midX, toY: 330 }));
      svg.appendChild(drawCircle({ x: midX, y: 350, handleClick: handleCircleClick }));
      svg.appendChild(drawLine({ fromX: midX, fromY: 370, toX: midX, toY: 480 }));
      svg.appendChild(drawCircle({ x: midX, y: 500, handleClick: handleCircleClick }));

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

export default Graph;