const Logs = ({ logs, heading }) => {
    if (!logs) {
        return <></>
    }
    
    return logs.length ?
    <div className="timer-container">
        <h1 className="align-center">{heading}</h1>
        <table className="center">
            <thead>
                <tr>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {
                    logs.map((e, i) => {
                        return <tr key={i}>
                            <td>{e.startTimestamp}</td>
                            <td>{e.endTimestamp}</td>
                            <td>{e.differenceInSeconds}</td>
                        </tr>
                    })
                }

            </tbody>
        </table>
    </div>
    : <></>
}

export default Logs;