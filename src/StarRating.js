import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};
export default function StarRating({
  maxRating = 5,
  color = "yellow",
  size = 48,
  messages = [],
  defaultRating = 2,
  rating,
  setRating,
}) {
  console.log(rating);
  // const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  function handleRate(h) {
    console.log(h);
    setRating(h);
  }
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            Onrate={() => handleRate(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            key={i}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            tempRating={tempRating}
            color={color}
            size={size}
          />
        ))}
      </div>
      {messages.length === maxRating && (
        <p>
          {tempRating
            ? messages[tempRating - 1]
            : rating
            ? messages[rating - 1]
            : rating}
        </p>
      )}
    </div>
  );
}
function Star({
  Onrate,
  full,
  onHoverIn,
  onHoverOut,
  tempRating,
  color,
  size,
}) {
  const starstyle = {
    height: `${size / 1.5}px`,
    width: `${size / 1.5}px`,
    cursor: "pointer",
  };
  const c = {
    border: "1px solid black",
  };
  return (
    <div
      style={starstyle}
      onClick={Onrate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke="yellow"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#fff"
          stroke="yellow"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>
  );
}
