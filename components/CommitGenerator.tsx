import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const CommitGenerator = () => {
  const [message, setMessage] = useState('');
  
  const handleClick = async () => {
    const res = await fetch('/api/vcs/commit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      throw new Error('Failed to commit');
    }
    
    const { message: resMessage } = await res.json();
    console.log('resMessage:', resMessage);
  }

  return (
    <div>
      <Input placeholder="Enter commit message" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <Button className="w-full" onClick={handleClick}>Commit</Button>
    </div>
  )
}

export default CommitGenerator