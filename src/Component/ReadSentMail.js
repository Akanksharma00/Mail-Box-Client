import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import back from '../Asset/back.png';
import bin from '../Asset/bin.png';

import '../Style/ReadMail.css';

const ReadSentMail = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    const email = localStorage.getItem('email');
    const string = email.split('@');
    const username = string[0];

    const mails = useSelector(state => state.mail.sentMails);
    const id = params.id;

    let from = '';
    let subject = '';
    let content = '';

    for(let i=0;i<mails.length;i++){
        if(mails[i].id === id){
            from = mails[i].from;
            subject = mails[i].subject;
            content = mails[i].content;
        }
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        
        fetch(`https://mail-box-client-eb11c-default-rtdb.firebaseio.com/mails/${username}/${id}.json`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            if(res.ok){
                alert('Mail successfully deleted!');
                navigate('/sent');
            }else{
                res.json().then(data => {
                    console.log(data);
                })
            }
        })
    }

    const previousCallHandler = (event) => {
        event.preventDefault();
        navigate('/sent');
    }
    return(
        <React.Fragment>
            <div className='iconsListDiv'>
                <ul className='iconsList'>
                    <li onClick={previousCallHandler} className='iconsListItem'>
                        <img src={back} className='icons'/> 
                    </li>
                    {/* <li>Print</li>
                    <li>Star</li> */}
                    <li onClick={deleteHandler} className='iconsListItem'>
                        <img src={bin} className='icons'/> 
                    </li>
                </ul>
            </div>
            <div className='mail'>
                <h2>{from}</h2>
                <h4>{subject}</h4>
                <p>{content}</p>
            </div>
        </React.Fragment>
    );
};

export default ReadSentMail;