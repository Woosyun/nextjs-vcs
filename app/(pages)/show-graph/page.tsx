import ViewGraph from '@/components/ViewGraph';
import { cookies } from 'next/headers';

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <h1>directory: {cookies().get('directory')?.value}</h1>
      <ViewGraph />
    </div>
  )
}