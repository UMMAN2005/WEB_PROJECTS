import emojipedia from "./data/emojipedia";
import Card from "./components/card";

function createCard(entity) {
  return (
    <Card
      key={entity.id}
      emoji={entity.emoji}
      header={entity.name}
      description={entity.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojipedia.map(createCard)}</dl>
    </div>
  );
}

export default App;
