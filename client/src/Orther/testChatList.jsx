/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"

export default function TestList() {

    const [ListId, setListId] = useState([])

    useEffect(() => {
        axios.get('/api/list/customer-on-chat').then(response => {
            setListId(response.data)
            console.log(response.data);
        })
    }, [ListId])

    // const IdArray = new Set(ListId)
    // const oldArray = [...IdArray]
    // const newIdArray = [...IdArray].reverse();
    // const uniIdArr = [...newIdArray]
    const IdArray = [...ListId]
    const setArr = new Set(IdArray)
    const oldArray = [...setArr]

    const reverseArr = [...IdArray].reverse()
    const setNewArr = new Set(reverseArr)
    const newArr = [...setNewArr]


    return (
        <>
            <div className="test-api">
                <div className="array-1">
                    <h3>Array</h3>
                    {IdArray.length && IdArray.map(id => (
                        <div key={id}>
                            {id}
                        </div>
                    ))}
                    <h3>Array set</h3>
                    {oldArray.length > 0 && oldArray.map(id => (
                        <div key={id}>
                            {id}
                        </div>
                    ))}
                </div>
                <div className="array-2">
                    <h3>Reverse Array</h3>
                    {reverseArr.length > 0 && reverseArr.map(id => (
                        <div key={id}>
                            {id}
                        </div>
                    ))}
                    <h3>New arr</h3>
                    {newArr.length > 0 && newArr.map(id => (
                        <div key={id}>
                            {id}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}