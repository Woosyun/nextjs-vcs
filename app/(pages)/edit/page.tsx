'use client'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'

const EditorComp = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function Home() {
  const [markdown, setMarkdown] = useState<string>('# hello world');
  
  return (
    <>
    <div className='p-2 mx-20'>
      <Suspense fallback={null}>
        <EditorComp markdown={markdown} setMarkdown={setMarkdown}/>
      </Suspense>
    </div>
    </>
  )
}