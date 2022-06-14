import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import style from './ReadMail.module.css';

const ReadSentMail = (props) => {
    const params = useParams();
    const history = useHistory();

    const mails = useSelector(state => console.log(state));
    console.log(mails);
    const id = params.id;

    const deleteHandler = (event) => {
        event.preventDefault();
        
        fetch(`https://mail-box-client-eb11c-default-rtdb.firebaseio.com/sent/${id}.json`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            if(res.ok){
                console.log('Mail successfully deleted!');
                history.push('/sent');
            }else{
                res.json().then(data => {
                    console.log(data);
                })
            }
        })
    }

    const previousCallHandler = (event) => {
        event.preventDefault();
        history.push('/sent');
    }
    return(
        <React.Fragment>
            <div>
                <ul>
                    <li onClick={previousCallHandler}>Back</li>
                    <li>Print</li>
                    <li>Star</li>
                    <li onClick={deleteHandler} >Delete</li>
                </ul>
            </div>
            <div className={style.mail}>
                <h1>{id}</h1>
                <h2>From</h2>
                <h4>to</h4>
                <p>body</p>
            </div>
        </React.Fragment>
    );
};

export default ReadSentMail;