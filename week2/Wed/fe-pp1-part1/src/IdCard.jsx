import "./IdCard.css";

const IdCard = (props) => {
    return (
        <div className="IdCard">
            <img className="img-id-card" src={props.picture} alt="This is an img" />
            <p><strong>First name</strong>: {props.firstName}</p>
            <p><strong>Last name</strong>: {props.lastName}</p>
            <p><strong>Gender</strong>: {props.gender}</p>
            <p><strong>Height</strong>: {props.height/100}m</p>
            <p><strong>Birth</strong>: {props.birth.toDateString()}</p>
        </div>
    )
}

export default IdCard;
