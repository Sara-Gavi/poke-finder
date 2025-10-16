import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import CharacterList from "./CharacterList";
import BackToHome from "./BackToHome";
import KiFilterForm from "./KiFilterForm";

function FinderPage() {
  // State variables
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [expandedCharacter, setExpandedCharacter] = useState(null);

  // States for the experience range inputs
  const [kiFromInput, setKiFromInput] = useState("");
  const [kiToInput, setKiToInput] = useState("");
  const [kiFrom, setKiFrom] = useState(null);
  const [kiTo, setKiTo] = useState(null);

  // Fetch Pokémon data from PokéAPI (first 151)
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        // For each Pokémon, fetch details and description
        const detailPromises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          // Second fetch: get English description
          const speciesRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${details.id}`
          );
          const speciesData = await speciesRes.json();

          const englishText =
            speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            )?.flavor_text || "No description available.";

          // Return Pokémon data in one object
          return {
            id: details.id,
            name: details.name,
            experience: details.base_experience,
            type: details.types.map((t) => t.type.name).join(", "),
            image: details.sprites.front_default,
            description: englishText.replace(/\n|\f/g, " "),
          };
        });

        // Wait for all fetches to complete
        Promise.all(detailPromises).then((pokemonData) => {
          setCharacters(pokemonData);
        });
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
      });
  }, []);

  // Handle input for name filter
  const handleInput = (event) => setNameFilter(event.currentTarget.value);

  // Expand or collapse character cards
  const handleExpand = (id) =>
    setExpandedCharacter((prevId) => (prevId === id ? null : id));

  // Filter Pokémon by name and experience range
  const filteredCharacters = characters.filter((character) => {
    // Name filter
    const characterName = character.name.toLowerCase();
    const searchInput = nameFilter.toLowerCase();
    const nameMatches = characterName.includes(searchInput);

    // Experience filter
    const kiAsNumber = character.experience;
    let kiMatches = true;

    if (kiFrom !== null) {
      kiMatches = kiMatches && kiAsNumber >= kiFrom;
    }

    if (kiTo !== null) {
      kiMatches = kiMatches && kiAsNumber <= kiTo;
    }

    // Return only Pokémon matching
    return nameMatches && kiMatches;
  });

  // Handle changes in experience input fields
  const handleKiFromChange = (event) =>
    setKiFromInput(event.currentTarget.value);
  const handleKiToChange = (event) => setKiToInput(event.currentTarget.value);

  // When user clicks "Search", update the numeric values
  const handleKiSearch = (event) => {
    event.preventDefault();

    if (kiFromInput !== "") {
      setKiFrom(parseInt(kiFromInput));
    } else {
      setKiFrom(null);
    }

    if (kiToInput !== "") {
      setKiTo(parseInt(kiToInput));
    } else {
      setKiTo(null);
    }
  };

  // Render
  return (
    <div className="finder">
      <h1 className="finder__title">Choose your Pokémon!</h1>

      <SearchForm value={nameFilter} onInput={handleInput} />

      <KiFilterForm
        kiFromInput={kiFromInput}
        kiToInput={kiToInput}
        onKiFromChange={handleKiFromChange}
        onKiToChange={handleKiToChange}
        onKiSearch={handleKiSearch}
      />

      {(nameFilter !== "" || kiFrom !== null || kiTo !== null) && (
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
