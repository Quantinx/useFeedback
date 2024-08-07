import { EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextViewer({ content }) {
  const parsedContent = JSON.parse(content);
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: parsedContent,
    editable: false,
  });

  return <EditorContent editor={editor} />;
}
