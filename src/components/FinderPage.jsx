import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import CharacterList from "./CharacterList";
import BackToHome from "./BackToHome";

function FinderPage() {
  // State variables
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [expandedCharacter, setExpandedCharacter] = useState(null);

  // Fetch Pokémon data from PokéAPI (first 151)
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        // Map through all Pokémon and fetch details
        const detailPromises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          // Second fetch to get species info (for description)
          const speciesRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${details.id}`
          );
          const speciesData = await speciesRes.json();

          // Find English description text
          const englishText =
            speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            )?.flavor_text || "No description available.";

          return {
            id: details.id,
            name: details.name,
            experience: details.base_experience,
            type: details.types.map((t) => t.type.name).join(", "),
            image: details.sprites.front_default,
            description: englishText.replace(/\n|\f/g, " "),
          };
        });

        // Wait for all async Pokémon data to resolve
        Promise.all(detailPromises).then((pokemonData) => {
          setCharacters(pokemonData);
        });
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
      });
  }, []);

  // Handle user input for name filter
  const handleInput = (event) => setNameFilter(event.currentTarget.value);

  // Expand or collapse the character card
  const handleExpand = (id) =>
    setExpandedCharacter((prevId) => (prevId === id ? null : id));

  // Filter Pokémon by name
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  // Render UI
  return (
    <div className="finder">
      <h1 className="finder__title">Choose your Pokémon!</h1>

      <SearchForm value={nameFilter} onInput={handleInput} />

      {nameFilter !== "" && (
        <>
          <p className="finder__results">
            {filteredCharacters.length} results found
          </p>
          <CharacterList
            characters={filteredCharacters}
            expandedId={expandedCharacter}
            onExpand={handleExpand}
          />
        </>
      )}

      <BackToHome />
    </div>
  );
}

export default FinderPage;
