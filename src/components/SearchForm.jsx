function SearchForm({ value, onInput }) {
  return (
    <form className="finder__form">
      <p className="finder__subtitle">Find them by name</p>
      <label htmlFor="name" className="finder__label">
        <input
          type="text"
          id="name"
          placeholder="Charmander"
          value={value}
          onInput={onInput}
          className="finder__input"
        />
      </label>
    </form>
  );
}

export default SearchForm;
