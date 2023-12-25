import useWebSocket from 'react-use-websocket';
import { useEffect, useRef } from 'react'
import throttle from 'lodash.throttle'
import { Cursor } from './components/Cursor';

const renderCursors = users => {
    return Object.keys(users).map(uuid => {
        const user = users[uuid]

        return (
            <Cursor key={uuid} point={[user.state.x, user.state.y]} />
        )
    })
}

export function Home({ username }) {

    const WS_URL = 'ws://localhost:8000'
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        queryParams: { username }
    })

    const THROTTLE = 50 // indicates how often to send mouse position to server
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

    useEffect(() => {
        sendJsonMessage({
            x: 0,
            y: 0
        })
        window.addEventListener('mousemove', e => {
            // when useRef wraps a function, the function is stored in .current
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY
            })
        })
    }, [])

    if (lastJsonMessage) {
        return <>
            {renderCursors(lastJsonMessage)}
        </>
    }

    return <h1>Hello, {username}</h1> 
}