"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin, 
  quotePlugin
} from "@mdxeditor/editor";
import { FC } from "react";
// import '@mdxeditor/editor/style.css';
// import '@/components/Editor.css';

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  setMarkdown: (value: string)=>void;
}

/** 
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, editorRef, setMarkdown }) => {
  return (
    <MDXEditor
      onChange={setMarkdown}
      ref={editorRef}
      markdown={markdown}
      plugins={[headingsPlugin(), listsPlugin(), linkPlugin(), quotePlugin(), markdownShortcutPlugin()]}
    />
  );
};

export default Editor;