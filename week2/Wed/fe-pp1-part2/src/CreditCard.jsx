import "./CreditCard.css";
import visaLogo from "./assets/images/visa.png";
import masterCardLogo from "./assets/images/master-card.svg";

const CreditCard = (props) => {
  const lastFourDigits = props.number.slice(-4);
  const expirationMonth = String(props.expirationMonth).padStart(2, "0");
  const expirationYear = String(props.expirationYear).slice(-2);

  return (
    <div
      className="credit-card"
      style={{
        backgroundColor: props.bgColor,
        color: props.color,
      }}
    >
      <img
        className={`credit-card-logo ${
          props.type === "Visa" ? "visa-logo" : "mastercard-logo"
        }`}
        src={props.type === "Visa" ? visaLogo : masterCardLogo}
        alt={`${props.type} logo`}
      />
      <p className="credit-card-number">
        •••• •••• •••• {lastFourDigits}
      </p>
      <div className="credit-card-details">
        <p>Expires {expirationMonth}/{expirationYear}</p>
        <p>{props.bank}</p>
      </div>
      <p className="credit-card-owner">{props.owner}</p>
    </div>
  );
};

export default CreditCard;
