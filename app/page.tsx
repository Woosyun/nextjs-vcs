import GraphViewer from '@/components/GraphViewer';
import { cookies } from 'next/headers';

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <GraphViewer />
    </div>
  )
}