import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import { useEffect, useImperativeHandle, forwardRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

import "./Editor.css";
const extensions = [StarterKit];

const content = "Write something here";

function TiptapEditor(props, ref) {
  const { editorRef } = props;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: content }),
    ],
  });

  useImperativeHandle(
    ref,
    function () {
      return {
        getEditorData: function () {
          return editor ? editor.getJSON() : null;
        },
        getContentLength: () => {
          return editor ? editor.getText().length : 0;
        },
        clearEditor: function () {
          if (editor) {
            editor.commands.clearContent();
          }
        },
      };
    },
    [editor]
  );

  useEffect(() => {
    if (editorRef) {
      editorRef.current = {
        getEditorData: function () {
          return editor ? editor.getJSON() : null;
        },
        getContentLength: () => {
          return editor ? editor.getText().length : 0;
        },
        clearEditor: function () {
          if (editor) {
            editor.commands.clearContent();
          }
        },
      };
    }
  }, [editor, editorRef]);

  return (
    <>
      <Toolbar editor={editor} />

      <EditorContent editor={editor} className="editor-container" />
    </>
  );
}

function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="toolbar">
      <span
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </span>
      <span onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </span>
      <span onClick={() => editor.chain().focus().toggleUnderline().run()}>
        Underline
      </span>
      <span onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        Code Block
      </span>
    </div>
  );
}

export default forwardRef(TiptapEditor);
