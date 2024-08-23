import { useState } from "react";
import "./FieldEdit.css";
export default function FieldEdit({
  fieldValue,
  output,
  fieldType,
  textarea = false,
}) {
  const [text, editText] = useState(fieldValue);

  function handleChange(e) {
    editText(e.target.value);
    output(e.target.value, fieldType);
  }

  return (
    <>
      <form className="profile-field-edit-container">
        {textarea && (
          <textarea
            className="profile-field-edit-textarea"
            value={text}
            onChange={handleChange}
          />
        )}
        {!textarea && (
          <input
            className="profile-field-edit-input"
            value={text}
            onChange={handleChange}
          />
        )}
      </form>
    </>
  );
}
