function Tour({ id, image, date, title, info, location, duration, cost, difficulty, rating, onRemove }) {
  return (
    <article className="tour-card">
      <div className="tour-img-container">
        <img src={image} className="tour-img" alt={title} />
        <p className="tour-date">{date}</p>
        <p className="tour-difficulty">{difficulty}</p>
      </div>
      <div className="tour-info">
        <div className="tour-title">
          <h4>{title}</h4>
          <p className="tour-rating">⭐ {rating}</p>
        </div>
        <p>{info}</p>
        <div className="tour-footer">
          <p>
            <span>
              <i className="fas fa-map" />
            </span>
            {location}
          </p>
          <p>from {cost}</p>
          <p>{duration} days</p>
        </div>
      </div>
      <button className="btn" onClick={() => onRemove(id)}>Remove Tour!</button>

    </article>
  );
}

export default Tour;
