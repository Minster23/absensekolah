import React,{useEffect} from 'react'
import addNotification from 'react-push-notification';

const notification = ({title, sbtl, msg}) => {
    useEffect(()=>{
        addNotification({
            title: title,
            subtitle: sbtl,
            message: msg,
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
        });
    },[])
}

export default notification