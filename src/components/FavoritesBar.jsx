import '../styles/FavoritesBar.css'

function FavoritesBar({ favorites, onSelect }) {
  return (
    <div className="favorites-bar">
      {favorites.map((favorite) => (
        <button
          key={`${favorite.latitude}-${favorite.longitude}`}
          className="favorite-chip"
          onClick={() => onSelect(favorite)}
        >
          {favorite.name}
        </button>
      ))}
    </div>
  );
}

export default FavoritesBar;
