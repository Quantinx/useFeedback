import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import { useEffect, useImperativeHandle, forwardRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

import "./Editor.css";
import ToolbarButton from "./ToolbarButton/ToolbarButton";
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
      <ToolbarButton
        icon={"bold"}
        size={20}
        active={editor.isActive("bold")}
        handleClick={() => editor.chain().focus().toggleBold().run()}
      />

      <ToolbarButton
        icon={"italic"}
        size={20}
        active={editor.isActive("italic")}
        handleClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <ToolbarButton
        icon={"underline"}
        size={20}
        active={editor.isActive("underline")}
        handleClick={() => editor.chain().focus().toggleUnderline().run()}
      />

      <ToolbarButton
        icon={"codeblock"}
        size={20}
        active={editor.isActive("codeBlock")}
        handleClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
    </div>
  );
}

export default forwardRef(TiptapEditor);
