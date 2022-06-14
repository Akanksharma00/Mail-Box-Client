import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../store/mailReducer";

import style from './Inbox.module.css';

const SentMail = (props) => {
    const dispatch = useDispatch();

    const isLoading = useSelector(state=> state.mail.isLoading);
    const mails = useSelector(state => state.mail.mails);

    useSelector(state=> console.log(state))

    useEffect( ()=>{
        async function fetchMail(){
        dispatch(mailActions.setLoading(true));
        try{const response = await fetch('https://mail-box-client-eb11c-default-rtdb.firebaseio.com/sent.json')
        
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
        dispatch(mailActions.setMail(loadedMail));
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
                    <table className={style.tableBody}>
                        <tr className={style.row}>
                            <td className={style.fromCol}>{i.from}</td>
                            <td className={style.subCol}>
                                <a href={`/sentmail/${i.id}`}>{i.subject}</a></td>
                            <td className={style.timeCol}>{i.timestamp}</td>
                        </tr>
                    </table> 
                </li>)
            })}
            </ul> 
        </div>
    );
};

export default SentMail;