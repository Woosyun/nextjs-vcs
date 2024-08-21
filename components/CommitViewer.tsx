import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CommitViewer({
  popover,
  setPopover,
  key,
  triggerRef,
}: {
  popover: { x: number, y: number, isOpen: boolean },
  setPopover: (prev: any) => void,
  key: number,
  triggerRef: any,
}) {
  return (
    <Popover open={popover.isOpen} onOpenChange={(open) => setPopover((prev: any) => ({ ...prev, isOpen: open }))}>
      <PopoverTrigger asChild>
        <button key={key} ref={triggerRef} style={{ position: 'absolute', left: `${popover.x}px`, top: `${popover.y + 60}px`, transform: 'translate(-50%, -50%)'}}>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <h1>hello world</h1>
      </PopoverContent>
    </Popover>
  )
}