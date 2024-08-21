import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CommitGenerator = () => {
  return (
    <div>
      <Input placeholder="Enter commit message"/>
      <Button className="w-full">Commit</Button>
    </div>
  )
}

export default CommitGenerator