import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextViewer({ content }) {
  const parsedContent = JSON.parse(content);
  const editor = useEditor({
    extensions: [StarterKit],
    content: parsedContent,
    editable: false,
  });

  return <EditorContent editor={editor} />;
}
