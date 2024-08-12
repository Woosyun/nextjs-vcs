import Graph from '@/components/Graph';
import { cookies } from 'next/headers';

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <h1>{cookies().get('directory')?.value}</h1>
      <Graph />
    </div>
  )
}