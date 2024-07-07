import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import axios from "axios";
import {APIObject, IUserData} from "../../store/appSlice";
import LoadingSpinner from "../../components/loadingSpinner";
import TextareaAutosize from "react-textarea-autosize";
import AsyncSelect from "react-select/async";
import {IOptions} from "../../components/interfaces";

//main component
export const SendReport = () => {

    const {seasonId} = useParams();
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(false)
    const userData: IUserData = useSelector((state: RootState) => state.storeData.userData)

    const [selectedEvent, setSelectedEvent] = useState<IOptions>({value: 0, label: ''})
    const [selectedDriver, setSelectedDriver] = useState<IOptions>({value: 0, label: ''})
    const [selectedRace, setSelectedRace] = useState<IOptions>({value: 0, label: ''})

    const [lap, setLap] = useState<string>('')
    const [reportDesc, setReportDesc] = useState<string>('')
    const [reportLinks, setReportLinks] = useState<string>('')

    let history = useNavigate();

    //stylowanie Async Selecta
    const selectStyles = {
        container: (state: any) => 'w-full p-2',
        control: (state: any) => 'bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 p-4 ' + `${state.menuIsOpen ? 'rounded-t-lg' : 'rounded-lg' }`,
        dropdownIndicator: (state: any) => `w-12 px-4 flex items-center justify-center ${state.selectProps.menuIsOpen ? 'rotate-180' : ''}`,
        placeholder: () => 'opacity-50',
        menu: (state: any) => 'bg-bg bg-gradient-to-br from-pink-950/15 via-blue-400/5 to-green/10 p-4 rounded-b-lg -translate-y-2 max-w-[22.75rem]',
        option: (state: any) => 'my-4 truncate'
    }
    //stylowanie inputów innych niż async select
    const inputStyleClass = 'appearance-none rounded-lg bg-transparent bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 p-4 m-2 resize-none'

    //Funkcja załadowania wydarzeń dla AsyncSelect
    const loadOptionsEvents = (
        inputValue: string,
        callback: (options: IOptions[]) => void
    ): void => {
        axios.get(API_SERVER + '/event', {
            params: {
                currentPage: 0,
                pageSize: 20,
                sort: 'startDate',
                leagueId: seasonId
            }
        })
            .then(response => {
                callback(response.data.content.map(((item: APIObject) => {
                    return {
                        value: item.id,
                        label: item.displayText
                    }
                })))
            })
    }
    //Funkcja załadowania wyścigów dla AsyncSelect
    const loadOptionsRaces = (
        inputValue: string,
        callback: (options: IOptions[]) => void
    ): void => {
        axios.get(API_SERVER + '/race/event/' + selectedEvent.value)
            .then(response => {
                callback(response.data.content.map(((item: APIObject) => {
                    return {
                        value: item.id,
                        label: item.displayText
                    }
                })))
            })
    }

    //Funkcja załadowania kierowców dla AsyncSelect
    const loadOptionsDrivers = (
        inputValue: string,
        callback: (options: IOptions[]) => void
    ): void => {
        axios.get(API_SERVER + '/driver/race/' + selectedRace.value, {
            params: {
                currentPage: 0,
                pageSize: 40,
                sort: 'nickname',
                sortDirection: 'ASC'
            }
        })
            .then(response => {
                callback(response.data.content.map(((item: APIObject) => {
                    return {
                        value: item.id,
                        label: item.nickname
                    }
                })))
            })
    }

    //handler zmiany wartości w state dla pól AsyncSelect
    function handleFieldChange(e: any, fn: any): void {
        fn(e)
    }
    //handler zmiany wartości w state dla pól innych niż Async...
    function handleTextFieldChange(e: any, fn: any): void {
        fn(e.target.value)
    }

    // funkcja wysłania zgłoszenia
    function sendReportToDatabase(e: React.MouseEvent): void {
        e.preventDefault()
        if(selectedEvent.value != 0 && selectedDriver.value != 0 && lap != '' && reportDesc != '' && reportLinks != '') {

            setIsLoading(true)

            axios.post(API_SERVER + '/report/race/' + selectedRace.value, {
                incidentLink: reportLinks,
                incidentDescription: reportDesc,
                reportingDriverId: String(userData.driverId),
                reportedDriverId: selectedDriver.value,
                checked: false
            })
                .then(() => setIsLoading(false))
                .then(() => history(-1))
                .catch(err => console.log(err))
        }
        else {
            // komunikat, że pola niewypełnione
        }
    }

    return (
        <>
            {!isLoading ? <div className='flex flex-col text-color flex-wrap grow '>

                <h1 className='text-2xl px-6 py-4 border-color/40 border-b-[1px]'>Zgłoszenie incydentu</h1>

                <form className='w-full flex flex-col grow bg-gradient-to-tr from-pink-950/15 via-blue-400/5 to-pink-950/15 p-4'>
                    <h1>Runda i wyścig</h1>
                    <AsyncSelect classNames={selectStyles} unstyled placeholder={'wybierz...'} defaultOptions cacheOptions loadOptions={loadOptionsEvents} value={selectedEvent} onChange={(e) => handleFieldChange(e, setSelectedEvent)}/>

                    {selectedEvent.value != 0 ? <AsyncSelect classNames={selectStyles} unstyled placeholder={'wybierz...'} defaultOptions cacheOptions loadOptions={loadOptionsRaces}
                                  value={selectedRace} onChange={(e) => handleFieldChange(e, setSelectedRace)}/>: <input type="text" className={inputStyleClass + ' opacity-50 bg-bg/75'} disabled/>}

                    <h1>Kierowca zgłoszony</h1>
                    {selectedRace.value != 0 ? <AsyncSelect classNames={selectStyles} unstyled placeholder={'wybierz...'} defaultOptions cacheOptions loadOptions={loadOptionsDrivers}
                                                             value={selectedDriver} onChange={(e) => handleFieldChange(e, setSelectedDriver)}/>:
                        <input type="text" className={inputStyleClass + ' opacity-50 bg-bg/75'} disabled/>}


                    <h1>Numer okrążenia</h1>
                    <input onChange={(e) => handleTextFieldChange(e, setLap)} value={lap} type="text" required className={inputStyleClass}/>

                    <h1>Dowód</h1>
                    <TextareaAutosize onChange={(e) => handleTextFieldChange(e, setReportLinks)} value={reportLinks} required className={inputStyleClass} />

                    <h1>Opis incydentu</h1>
                    <TextareaAutosize onChange={(e) => handleTextFieldChange(e, setReportDesc)} value={reportDesc} required className={inputStyleClass + ' grow '} />

                    <button type='submit' onClick={sendReportToDatabase} className='p-4 bg-nav rounded-lg font-thin mt-2 mx-2 tracking-wider bg-gradient-to-l from-pink-950/15 via-blue-400/5 to-green/10 flex justify-center items-center gap-x-2'>
                        Prześlij
                        <svg className='fill-color max-h-[1rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/>
                        </svg>
                    </button>
                    
                </form>
            </div> : <LoadingSpinner/>}
        </>
    )
}