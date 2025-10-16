function CharacterItem({ character, isExpanded, onClick }) {
  return (
    <li className="finder__item" onClick={onClick}>
      <div className="finder__summary">
        <p>{character.name}</p>
        <p>EXP: {character.experience}</p>
      </div>

      {isExpanded && (
        <div className="finder__details">
          <div className="finder__image-wrapper">
            <img
              src={character.image}
              alt={character.name}
              className="finder__image"
            />
          </div>
          <p className="finder__description">
            <strong>Type:</strong> {character.type}
          </p>
          <p className="finder__description">{character.description}</p>
        </div>
      )}
    </li>
  );
}

export default CharacterItem;
