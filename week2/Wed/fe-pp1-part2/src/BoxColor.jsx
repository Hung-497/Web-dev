import "./BoxColor.css";

function toHex(color) {
  const hex = color.toString(16);

  // If the hex value is only one character, add a leading zero
  return hex.length === 1 ? '0' + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

const BoxColor = (props) => {
    const color = rgbToHex(props.r, props.g, props.b);
    const brightness = (props.r * 299 + props.g * 587 + props.b * 114) / 1000;
    const textColor = brightness > 150 ? "#000000" : "#ffffff";

  return (
    <div
      className="box-color"
      style={{ backgroundColor: color, color: textColor }}
    >
      <p>rgb({props.r},{props.g},{props.b})</p>
      <p>{color}</p>
    </div>
  );
};

export default BoxColor;
