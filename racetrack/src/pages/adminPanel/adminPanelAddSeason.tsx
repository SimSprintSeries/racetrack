import React, {useEffect, useState} from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {APIObject} from "../../store/appSlice";
import {IEvents, IOptions, IRaces} from "../../components/interfaces";
import Select from "react-select";
import LoadingSpinner from "../../components/loadingSpinner";
import {selectStyles} from "../../components/stylesClasses";

//Początkowe dane pierwszego obiektu wydarzenia
let initialEvents: IEvents[] = [{
    key: 0,
    eventName: '',
    eventDate: new Date(),
    eventRaces: [{
        key: 0,
        raceName: '',
        track: 0,
        points: 0
    }]
}]


//Main component
const adminPanelAddSeason = () => {

    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [selectedGame, setSelectedGame] = useState<APIObject>()
    const [events, setEvents] = useState(initialEvents)
    const [eventId, setEventId] = useState<number>(0)
    const [tracks, setTracks] = useState<IOptions[]>()


    useEffect(() => {
        axios.get(API_SERVER + '/track', {
            params: {
                sort: 'name'
            }
        })
            .then(response => response.data.content)
            .then(result => setTracks(result.map((item: APIObject) => {
                return {value: item.id, label: item.name}
            })))
    }, [])

//wczytywanie gier z API dla selecta
    const loadOptionsGames = (
        inputValue: string,
        callback: (options: APIObject[]) => void
    ): void => {
        axios.get(API_SERVER + '/game', {
            params: {
                pageSize: 30,
                sort: 'name'
            }
        })
            .then(response => {
                callback(response.data.content.map(((item: APIObject) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })))
            })
    }

    //handler zmiany wartości w state dla pól Async Select
    function handleFieldChange(e: any, fn: any): void {
        fn(e)
    }

    //handler zmiany wartości w state dla pól innych niż Async
    function handleInputFieldChange(e: any, fn: any): void {
        fn(e.target.value)
    }

    //dodanie wydarzenia do state
    function addEvent(): void {
        setEventId(eventId + 1)
        setEvents(
            prevState => [...prevState, {
                key: eventId + 1,
                eventName: '',
                eventDate: new Date(),
                eventRaces: [{
                    key: 0,
                    raceName: '',
                    track: 0,
                    points: 0
                }]
            }]
        )
    }

    //dodanie wyścigu wewnątrz wydarzenia
    function addRace(e: any, x: number): void {
        setEvents(
            prevState => prevState.map((item: IEvents) => {
                if (item.key === x) {
                    return {
                        ...item,
                        eventRaces: [...item.eventRaces, {
                            key: item.eventRaces.length,
                            raceName: '',
                            track: 0,
                            points: 0
                        }]
                    }
                } else {
                    return item
                }
            })
        )

    }

    //usunięcie wydarzenia
    function removeEvent(e: any, x: number): void {
        setEvents(
            prevState => prevState.filter((item: IEvents) => item.key !== x)
        )
    }

    //usunięcie wyścigu wewnątrz wydarzenia
    function removeRaces(e: any, x: number, y: number): void {
        setEvents(
            prevState => prevState.map((item: IEvents) => {
                if (item.key === x) {
                    return {
                        ...item, eventRaces: item.eventRaces.filter((item: IRaces) => item.key !== y)
                    }
                } else {
                    return item
                }
            })
        )
    }

    //zmiana toru dla wyścigu
    function handleTrackChange(e: any, x: number, y: number): void {
        setEvents(
            prevState => prevState.map((item: IEvents) => {
                if (item.key === x) {
                    return {
                        ...item, eventRaces: item.eventRaces.map((itemRace: any) => {
                            if (itemRace.key === y) {
                                return {...itemRace, track: e}
                            } else {
                                return itemRace
                            }
                        })
                    }
                } else {
                    return item
                }
            })
        )
    }


    return (
        <div className='flex flex-col gap-y-2 grow text-color p-4'>
            <div
                className='w-full backdrop-blur-sm grow bg-gradient-to-br from-pink-950/15 via-blue-400/5 to-green/10 p-4 rounded-lg'>
                <h1 className='text-xl'>Informacje podstawowe</h1>
                <div className='w-full flex flex-col gap-y-4 p-4'>
                    <span>Platforma:</span>
                    <AsyncSelect classNames={{...selectStyles, container: (state: any) => 'w-full'}} unstyled
                                 placeholder={'wybierz...'} defaultOptions cacheOptions loadOptions={loadOptionsGames}
                                 value={selectedGame} onChange={(e) => handleFieldChange(e, setSelectedGame)}/>
                </div>
                <div className='w-full flex flex-col gap-y-4 p-4'>
                    <span>Nazwa:</span>
                    <input type="text"
                           className='bg-transparent bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 p-4 rounded-lg outline-none'
                           placeholder='Nazwa sezonu'/>
                </div>

                <div className='w-full flex flex-col gap-y-4 p-4'>
                    <span>Baner:</span>
                    <input type="file"
                           className='dark:[color-scheme:dark] file:hidden bg-transparent bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 p-4 rounded-lg outline-none'/>
                </div>

                <div className='w-full flex flex-col gap-y-4 p-4'>
                    <span>Logo:</span>
                    <input type="file"
                           className='dark:[color-scheme:dark] file:hidden bg-transparent bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 p-4 rounded-lg outline-none'/>
                </div>

            </div>


            <div>

                {events.map((item: IEvents, index) => <EventCreateTile key={item.key} id={item.key} index={index} name={item.eventName}
                                                                date={item.eventDate} races={item.eventRaces}
                                                                tracks={tracks} fn={addRace} removeFn={removeEvent}
                                                                removeRace={removeRaces} trackFn={handleTrackChange}/>)}
            </div>


            <button
                className='p-4 bg-nav rounded-lg font-thin mt-2 mx-2 tracking-wider bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 flex justify-center items-center'
                onClick={addEvent}>Dodaj wydarzenie
            </button>

            <button type='submit'
                    className='p-4 bg-nav rounded-lg font-thin mt-2 mx-2 tracking-wider bg-gradient-to-br from-pink-950/15 via-blue-400/5 to-green/10 flex justify-center items-center gap-x-2'>
                Zapisz
                <svg className='fill-color max-h-[1rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                        d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                </svg>
            </button>

        </div>
    )
}

//component wydarzenia z listy wydarzeń
const EventCreateTile = (props: { id: number, name: string, date: object, index: number , races: IRaces[], tracks: any, fn: any, removeFn: any, removeRace: any, trackFn: any }) => {
    return (
        <div
            className='text-color bg-gradient-to-br from-pink-950/15 via-blue-400/5 to-green/10 p-4 pt-2 rounded-lg my-4 first:mt-2 animate-slideLeft'>
            <div className='m-2 flex justify-end items-center'>
                <button onClick={(e) => props.removeFn(e, props.id)}>
                    <svg className='w-4 fill-color/75' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path
                            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </button>
            </div>
            <div className='flex items-center gap-x-4'>
                <span className='text-xl'>{props.index + 1 + '.'}</span>
                <input type="text"
                        className='bg-transparent my-2 rounded-lg outline-none w-full placeholder-color/25 text-xl'
                        placeholder='Nazwa wydarzenia'/>
            </div>
            <h1 className='text-sm opacity-50 my-1'>Data i godzina:</h1>
            <input type="datetime-local"
                   className='dark:[color-scheme:dark] bg-transparent bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 p-4 rounded-lg outline-none w-full'/>
            <div className='flex justify-between mt-2 items-end'>
                <h1 className='text-sm opacity-50 my-2'>Wyścigi:</h1>
                <button
                    className='p-2 px-4 rounded-lg font-thin mt-2 text-sm tracking-wider bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 text-xl'
                    onClick={(e) => props.fn(e, props.id)}>
                    <svg className='w-3 fill-color' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                    </svg>
                </button>
            </div>
            <div>{props.races.map((item: IRaces) => <RaceCreateTile key={item.key} id={item.key} name={item.raceName}
                                                                    track={item.track} tracksOptions={props.tracks}
                                                                    points={item.points} removeFn={props.removeRace}
                                                                    trackFn={props.trackFn} eventId={props.id}/>)}</div>
        </div>
    )
}

//component wyścigu wewnątrz wydarzenia
const RaceCreateTile = (props: { id: number, name: string, track: number, points: number, tracksOptions: any, removeFn: any, trackFn: any, eventId: number }) => {

    return (
        <>
            {props.tracksOptions !== undefined ? <div
                className='text-color bg-gradient-to-br from-pink-950/15 via-blue-400/5 to-green/10 p-4 rounded-lg my-4 first:mt-2 animate-slideLeft'>
                <div className='flex justify-end items-center'>
                    <button onClick={(e) => props.removeFn(e, props.eventId, props.id)}>
                        <svg className='w-4 fill-color/75' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </button>
                </div>
                <input type="text"
                       className='bg-transparent my-2 rounded-lg outline-none w-full placeholder-color/25 text-xl'
                       placeholder='Nazwa wyścigu'/>
                <h1 className='text-sm opacity-50 my-1'>Tor:</h1>
                <Select classNames={{...selectStyles, container: () => 'w-full pr-2'}} defaultValue={props.tracksOptions[0]}
                        placeholder='wybierz...' options={props.tracksOptions}
                        onChange={(e) => props.trackFn(e, props.eventId, props.id)} value={props.track} unstyled/>
                <h1 className='text-sm opacity-50 my-1'>Punktacja:</h1>
                <Select classNames={{...selectStyles, container: () => 'w-full pr-2'}} defaultValue={props.tracksOptions[0]}
                        placeholder='in progress...' options={props.tracksOptions}
                        onChange={(e) => props.trackFn(e, props.eventId, props.id)} value={props.track} unstyled/>
            </div> : <LoadingSpinner/>}
        </>
    )
}


export default adminPanelAddSeason;

