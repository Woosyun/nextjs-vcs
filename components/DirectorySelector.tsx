'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DirectorySelector({
  dir,
  setDir
}: {
  dir: string,
  setDir: (newDir: string) => void,
  }) {
  const [tempDir, setTempDir] = useState('')
  
  const handleOpen = async () => {
    try {
      console.log('new dir: ', tempDir);
      const res = await fetch('/api/dir/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
        body: JSON.stringify({directory: tempDir}),
      });

      if (!res.ok) {
        const errorText = await res.text(); // Get the response text (likely HTML)
        throw new Error(`(DirectorySelector)Failed to set directory: ${errorText}`);
      }
      
      const { message } = await res.json();
      console.log('(DirectorySelector) message: ', message);
      setDir(tempDir);
    } catch (error: any) {
      console.log('(DirectorySelector) error: ', error.message);
    }
  }

  const handleClose = () => {
    console.log('close');
  }
  
  return (
    <Dialog open={!dir}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Directory Selector</DialogTitle>
          <DialogDescription>select directory to control versions of contents</DialogDescription>
        </DialogHeader>
        <DirectoryPicker dir={tempDir} setDir={setTempDir} />
        <DialogFooter>
          <Button onClick={handleOpen}>Open</Button>
          <Button onClick={handleClose} variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const DirectoryPicker = ({ dir, setDir }: {
  dir: any,
  setDir: (newDir: string) => void
}) => {
  return (
    <Input
      type="text"
      onChange={(e: any) => setDir(e.target.value)}
    />
  )
};