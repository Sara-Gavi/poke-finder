function KiFilterForm({
  kiFromInput,
  kiToInput,
  onKiFromChange,
  onKiToChange,
  onKiSearch,
}) {
  return (
    <>
      <p className="finder__subtitle">Or filter by Experience</p>
      <form className="finder__ki-filter" onSubmit={onKiSearch}>
        <label htmlFor="kiFrom" className="finder__label">
          From:
          <input
            type="number"
            id="kiFrom"
            value={kiFromInput}
            onChange={onKiFromChange}
            className="finder__input"
          />
        </label>
        <label htmlFor="kiTo" className="finder__label">
          To:
          <input
            type="number"
            id="kiTo"
            value={kiToInput}
            onChange={onKiToChange}
            className="finder__input"
          />
        </label>
        <button type="submit" className="finder__button">
          Search
        </button>
      </form>
    </>
  );
}

export default KiFilterForm;
