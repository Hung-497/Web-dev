import "./Random.css";

const Random = (props) => {
    const min = Math.ceil(props.min);
    const max = Math.floor(props.max);
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return (
        <div className="random-value">
            <p>Random value between {min} and {max} =&gt; {result} </p>
        </div>
    )
}

export default Random;
