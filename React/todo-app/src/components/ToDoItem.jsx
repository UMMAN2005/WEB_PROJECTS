function ToDoItem({ id, text, onChecked }) {
  return (
    <div
      onClick={() => {
        onChecked(id);
      }}
    >
      <li>{text}</li>
    </div>
  );
}

export default ToDoItem;
