import CharacterItem from "./CharacterItem";

function CharacterList({ characters, expandedId, onExpand }) {
  return (
    <ul className="finder__list">
      {characters.map((character) => (
        <CharacterItem
          key={character.id}
          character={character}
          isExpanded={expandedId === character.id}
          onClick={() => onExpand(character.id)}
        />
      ))}
    </ul>
  );
}

export default CharacterList;
