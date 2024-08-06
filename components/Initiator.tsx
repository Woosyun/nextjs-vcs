'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import path from "path";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Initiator() {
  const [dir, setDir] = useState<string>("");

  const handleOpen = () => {
    console.log(dir);
  }
  const handleClose = () => {
    console.log('close');
  }
  
  return (
    <Card className='border-solid border-2 border-black mx-auto mt-6 w-[400px]'>
      <CardHeader>
        <CardTitle>select directory</CardTitle>
        {/* <CardDescription>versions of contents under selected directory will be controled</CardDescription> */}
      </CardHeader>
      
      <CardContent>
        <Label htmlFor="directory">directory path</Label>
        <DirectoryPicker dir={dir} setDir={setDir} />
      </CardContent>

      <CardFooter className="flex justify-between">
      <Button onClick={handleOpen}>Start</Button>
        <Button onClick={handleClose} variant="outline">Close</Button>
      </CardFooter>
    </Card>
  )
}

const DirectoryPicker = ({ dir, setDir }: {
  dir: any,
  setDir: (newDir: string) => void
}) => {
  const handleChange = (e: any) => {
    setDir(e.target.value);
  }
  
  return (
    <Input
      type="text"
      onChange={handleChange}
    />
  )
};