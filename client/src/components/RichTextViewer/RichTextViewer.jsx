import { EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import "./RichTextViewer.css";
import { useEffect } from "react";

export default function RichTextViewer({ content }) {
  const parsedContent = JSON.parse(content);

  useEffect(() => {
    editor.commands.setContent(parsedContent);
  }, [content]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: parsedContent,
    editable: false,
  });

  return <EditorContent className="rich-text-container" editor={editor} />;
}
