"use client";

import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin, 
  quotePlugin,
  tablePlugin,
  toolbarPlugin
} from "@mdxeditor/editor";
import { FC } from "react";
import '@mdxeditor/editor/style.css';
// import 'github-markdown-css/github-markdown-dark.css';
import 'github-markdown-css/github-markdown-light.css';

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
      contentEditableClassName="markdown-body"
      onChange={setMarkdown}
      ref={editorRef}
      markdown={markdown}
      plugins={[
        frontmatterPlugin(),
        listsPlugin(),
        linkPlugin(),
        tablePlugin(),
        quotePlugin(),
        headingsPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <ListsToggle />
            </>
          ),
        }),
        markdownShortcutPlugin()
      ]}
    />
  );
};

export default Editor;