import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import axios from "axios";
import {APIObject, IUserData} from "../../store/appSlice";
import LoadingSpinner from "../../components/loadingSpinner";
import TextareaAutosize from "react-textarea-autosize";

export const SendReport = () => {

    const {seasonId} = useParams();
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(true)
    const userData: IUserData = useSelector((state: RootState) => state.storeData.userData)

    const inputStyleClass = 'appearance-none p-2 rounded bg-nav border-[1px] border-color/25 m-2'

    const [raceOptions, setRaceOptions] = useState<[]>()
    const [selectedEvent, setSelectedEvent] = useState<string>('')
    const [driverOptions, setDriversOptions] = useState<[]>()
    const [selectedDriver, setSelectedDriver] = useState<string>('')
    const [raceList, setRaceList] = useState<[]>()
    const [selectedRace, setSelectedRace] = useState<string>('')

    const [lap, setLap] = useState<string>('')
    const [reportDesc, setReportDesc] = useState<string>('')
    const [reportLinks, setReportLinks] = useState<string>('')

    useEffect(() => {

        const apiFnEvents = async () => {
            await axios.get(API_SERVER + '/event', {

                params: {
                    currentPage: 0,
                    pageSize: 20,
                    sort: 'startDate',
                    leagueId: seasonId
                }
            })
                .then(response => response.data.content.map((item: APIObject ) => <option className='text-bg text-color' key={item.id} value={item.id}>{item.displayText}</option>))
                .then(result => setRaceOptions(result))
        }

        apiFnEvents()
            .then(() => setIsLoading(false))
            .catch(console.error)
    },[seasonId])


    useEffect(() => {

        axios.get(API_SERVER + '/driver/event/' + selectedEvent, {
            params: {
                currentPage: 0,
                pageSize: 40,
                sort: 'nickname',
                sortDirection: 'ASC'
            }
        })
            .then(response => response.data.content.map((item: APIObject) => <option className='text-bg text-color' key={item.id} value={item.id}>{item.nickname}</option>))
            .then(result => setDriversOptions(result))
            .catch(err => console.log(err))

    }, [selectedEvent])

    useEffect(() => {

        axios.get(API_SERVER + '/race/event/' + selectedEvent)
            .then(response => setRaceList(response.data.content.map((item: APIObject) => <option className='text-bg text-color' key={item.id} value={item.id}>{item.displayText}</option>)))
    },[selectedEvent])


    //handler zmiany wartości w state dla pól
    function handleFieldChange(e: any, fn: any): void {
        fn(e.target.value)
    }

    // funkcja wysłania zgłoszenia
    function sendReportToDatabase(e: React.MouseEvent): void {
        e.preventDefault()
        if(selectedEvent != '' && selectedDriver != '' && lap != '' && reportDesc != '' && reportLinks != '') {

            axios.post(API_SERVER + '/report', {
                incidentLink: reportLinks,
                incidentDescription: reportDesc,
                reportingDriver: {id: String(userData.driverId)},
                reportedDriver: {id: selectedDriver},
                race: {id: selectedEvent},
                checked: false
            })
                .then(response => console.log(response))
                .catch(err => console.log(err))
        }
        else {
            // komunikat, że pola niewypełnione
        }
    }

    return (
        <>
            {!isLoading ? <div className='flex flex-col text-color p-4 flex-wrap grow'>

                <h1 className='pb-2 mb-4 text-2xl'>Zgłoszenie incydentu</h1>

                <form className='w-full flex flex-col grow'>
                    <h1>Runda i wyścig</h1>
                    <select onChange={(e) => handleFieldChange(e, setSelectedEvent)} value={selectedEvent} required className={inputStyleClass}>
                        <option className='text-color' selected></option>
                        {raceOptions}
                    </select>
                    <select onChange={(e) => handleFieldChange(e, setSelectedRace)} value={selectedRace} required className={inputStyleClass}>
                        <option className='text-color' selected></option>
                        {raceList}
                    </select>

                    <h1>Kierowca zgłoszony</h1>
                    <select onChange={(e) => handleFieldChange(e, setSelectedDriver)} value={selectedDriver} required className={inputStyleClass}>
                        <option className='text-color' selected></option>
                        {driverOptions}
                    </select>

                    <h1>Numer okrążenia</h1>
                    <input onChange={(e) => handleFieldChange(e, setLap)} value={lap} type="text" required className={inputStyleClass}/>

                    <h1>Dowód</h1>
                    <TextareaAutosize onChange={(e) => handleFieldChange(e, setReportLinks)} value={reportLinks} required className={inputStyleClass} />

                    <h1>Opis incydentu</h1>
                    <TextareaAutosize onChange={(e) => handleFieldChange(e, setReportDesc)} value={reportDesc} required className={inputStyleClass + ' grow'} />

                    <button type='submit' onClick={sendReportToDatabase}>Prześlij</button>
                    
                </form>
            </div> : <LoadingSpinner/>}
        </>
    )
}