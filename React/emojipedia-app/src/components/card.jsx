function Card({emoji, header, description}) {
  return (
    <div className="term">
      <dt>
        <span className="emoji" role="img" aria-label="Tense Biceps">
          {emoji}
        </span>
        <span>{header}</span>
      </dt>
      <dd>
        {description}
      </dd>
    </div>
  );
}

export default Card;
