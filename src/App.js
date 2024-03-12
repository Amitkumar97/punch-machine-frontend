import './App.css';
import { useEffect, useState } from 'react';
import GLOBAL_CONSTANT from './constants/global';
import API_NAMES from './constants/apiNames';
import Logs from './components/Logs';

function App() {
    const [lastStatus, setLastStatus] = useState("In");
    const [logDisable, setLogDisable] = useState(false);
    const [data, setData] = useState();

    const logPunch = () => {
        setLogDisable(true);
        fetch(GLOBAL_CONSTANT.API_END_POINT + API_NAMES.SAVE_PUNCH)
        .then((res) => res.json())
        .then((data) => {
            if (data.status) {
                const activeType = data.currentStatus === "in" ? "In" : "Out";
                setLastStatus(activeType);
                setData(data);
            }
        }).finally(() => {
            setLogDisable(false)
        })
    }

    const getLastStatus = () => {
        setLogDisable(true);
        fetch(GLOBAL_CONSTANT.API_END_POINT + API_NAMES.GET_LAST_STATUS)
        .then((res) => res.json())
        .then((data) => {
            if (data.status) {
                const activeType = data.currentStatus === "in" ? "In" : "Out";
                setLastStatus(activeType);
                setData(data);
            }
        }).finally(() => {
            setLogDisable(false)
        })
    }

    useEffect(() => {
        getLastStatus()
    }, [])

    return (
        <div className="App">
            <div className='button-container'>
                <button className='center' disabled={logDisable} onClick={logPunch}>Punch {lastStatus}</button>
            </div>
            <div className='align-center'>
                  {data && data.logs && data.logs.dayInfo ? <><strong>Day Starts At :</strong> {data.logs.dayInfo.start} <br /> </> : null }
                  {data && data.logs && data.logs.dayInfo && data.logs.dayInfo.end ? <><strong>Last Punch out :</strong> {data.logs.dayInfo.end} </> : null }
            </div>
            <Logs heading="Punch Logs" logs={data && data.logs && data.logs.works ? data.logs.works : null } />
            <Logs heading="Break Logs" logs={data && data.logs && data.logs.breaks ? data.logs.breaks : null } />
        </div>
    );
}

export default App;
