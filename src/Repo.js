import React, { useState } from 'react'
import "./Repo.css";
const Repo = (props) => {
    const [data, setData] = useState(null)

    const getData = (val) => {
        setData(val.target.value)
    }

    const onClick = () => {
        props.sendData(data)
    }

    return (
        <div className="Repo">
            <input className="input-box" type="text" placeholder="Repo Name..." onChange={getData} />
            <button className="button" onClick={onClick} >Send Data</button>
        </div>
    );
}

export default Repo;