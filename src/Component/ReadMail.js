import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import reply from '../Asset/reply.png';
import bin from '../Asset/bin.png';
import previous from '../Asset/previous.png';
import star from '../Asset/star.png';
import yellowStar from '../Asset/yellowStar.png';

import '../Style/ReadMail.css';
import { mailActions } from "../store/mailReducer";

const ReadMail = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const mails = useSelector(state => state.mail.receivedMails);
    const starredMails = useSelector(state => state.mail.starredMails);
    console.log('Starred Mails: ' ,starredMails);
    
    const id = params.id;
    let to = '';
    let from = '';
    let subject = '';
    let content = '';
    let timestamp = '';
    let hasOpened = '';
    let isStarred = '';

    for(let i=0;i<mails.length;i++){
        if(mails[i].id === id){
            to = mails[i].to;
            from = mails[i].from;
            subject = mails[i].subject;
            content = mails[i].content;
            timestamp = mails[i].timestamp;
            hasOpened = mails[i].hasOpened;
            isStarred = mails[i].isStarred;
        }
    }

    const string = from.split('@');
    const sender = string[0];

    const deleteHandler = (event) => {
        event.preventDefault();
        
        fetch(`https://mail-box-client-eb11c-default-rtdb.firebaseio.com/mails/${sender}/${id}.json`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            if(res.ok){
                alert('Mail successfully deleted!');
                navigate('/inbox');
            }else{
                res.json().then(data => {
                    console.log(data);
                })
            }
        })
    }

    const previousCallHandler = (event) => {
        event.preventDefault();
        navigate('/inbox');
    }

    const replyHandler = (replyTo) => {
        navigate('/compose');
    }

    // const starHandler = async () => {
    //     const usernameString = from.split('@');
    //     const username =  usernameString[0];

    //     const response = await fetch(`https://mail-box-client-eb11c-default-rtdb.firebaseio.com/mails/${username}/${id}.json`,{
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             to: to,
    //             from: from,
    //             subject: subject,
    //             content: content,
    //             timestamp: timestamp,
    //             hasOpened: hasOpened,
    //             isStarred: !isStarred,     
    //         }),
    //         headers:{
    //             'Content-Type' : 'application/json'
    //         }
    //     })

    //     if(response.ok){
    //         console.log('Updated!');
    //         response.json().then((data)=>{
    //             if(isStarred){
    //                 dispatch(mailActions.setStarredMails({
    //                     to,
    //                     from,
    //                     subject,
    //                     content,
    //                     timestamp,
    //                     hasOpened,
    //                     isStarred
    //                 }))
    //             }
    //         })
            
    //     }else{
    //         console.log('Encountered error!');
    //     }
        
    // }

    return(
        <React.Fragment>
            <div className='iconsListDiv'>
                <ul className='iconsList'>
                    <li onClick={previousCallHandler} className='iconsListItem'>
                        <img src={previous} className='icons'/> 
                    </li>
                    <li onClick={()=>replyHandler(from)} className='iconsListItem'>
                    <img src={reply} className='icons'/>
                    </li>
                    {/* <li>Print</li> */}
                    {/* <li onClick={starHandler} className='iconsListItem'>
                        {!isStarred && <img src={star} className='icons'/>}
                        {isStarred && <img src={yellowStar} className='icons'/>} 
                    </li> */}
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

export default ReadMail;