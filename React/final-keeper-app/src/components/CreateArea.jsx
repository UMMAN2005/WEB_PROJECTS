import React, { useState } from "react";

function CreateArea({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd({ title, content });
          setTitle("");
          setContent("");
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
