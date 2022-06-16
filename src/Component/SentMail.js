import React,{useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../store/mailReducer";

import '../Style/Inbox.css';

const SentMail = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(state=> state.mail.isLoading);
    const mails = useSelector(state => state.mail.sentMails);

    const email = localStorage.getItem('email');
    const string = email.split('@');
    const username = string[0];

    useEffect( ()=>{
        async function fetchMail(){
        dispatch(mailActions.setLoading(true));
        try{const response = await fetch(`https://mail-box-client-eb11c-default-rtdb.firebaseio.com/mails/${username}.json`)
        
        if(!response.ok){
            throw new Error('Something went wrong...retrying!');
        }
        
        const data = await response.json();

        const loadedMail = [];

        for(const key in data){
            loadedMail.push({
                id:key,
                to:data[key].to,
                from:data[key].from,
                subject:data[key].subject,
                content: data[key].content,
                timestamp: data[key].timestamp,
                isOpened: false
            })
        }
        dispatch(mailActions.setSentMail(loadedMail));
        }catch(error){
            console.log(error);
        }

        dispatch(mailActions.setLoading(false));
    }
    fetchMail();
    },[]);

    return (
        <div>
            {mails.length===0 && <p>No mail found</p>}
            <ul>
                {mails.map((i) => {
                return(<li>
                    <table className='tableBody'>
                        <tr className='row'>
                            <td className='fromCol'>{i.to}</td>
                            <td className='subCol' onClick={()=>{navigate(`/sentmail/${i.id}`)}}>
                                {i.subject}
                            </td>
                            <td className='timeCol'>{i.timestamp}</td>
                        </tr>
                    </table> 
                </li>)
            })}
            </ul> 
        </div>
    );
};

export default SentMail;