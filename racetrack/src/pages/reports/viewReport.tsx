import React, {useEffect, useState} from "react";
import {APIObject} from "../../store/appSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner";
import TextareaAutosize from "react-textarea-autosize";

const ReportView = () => {

    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [reportData, setReportData] = useState<APIObject>({})
    const {reportId} = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [editingMode, setEditingMode] = useState(false)
    const stewardCheck = useSelector((state: RootState) => state.storeData.userData.isSteward)

    useEffect(() => {

        axios.get(API_SERVER + '/report/' + reportId)
            .then(response => setReportData(response.data))
            .then(() => setIsLoading(false))
            .catch(ex => {
                console.log(ex)
                window.location.href = "/error"
            })

    }, [reportId])

    const switchEditingMode = () => {
        setEditingMode(!editingMode);
    }

    const showDecision = () => {
        if(editingMode) {
            return <ReportDecisionEdit switchFn={() => switchEditingMode()} penaltySec={reportData.penaltySeconds}
                                       penaltyId={reportData.id} penaltyPt={reportData.penaltyPoints}
                                       isLoading={setIsLoading}
                                       decisionDesc={reportData.decisionDescription}/>
        } else if (reportData.checked && !editingMode) {
            return <ReportDecision switchFn={() => switchEditingMode()} penaltySec={reportData.penaltySeconds}
                                   penaltyPt={reportData.penaltyPoints}
                                   decisionDesc={reportData.decisionDescription}/>
        } else if (!reportData.checked && !editingMode) {
            return null
        }
    }

    return (
        <div className='flex flex-col text-color p-4 flex-wrap'>
            {!isLoading ? <div className='flex flex-col gap-4 border-l-[1px] border-color/35'>
                <ReportDesc {...reportData} />
                {stewardCheck && !reportData.checked && !editingMode ? <button onClick={() => switchEditingMode()} className='p-4 bg-bg/55 rounded-r-lg font-thin text-justify underline'>Dodaj decyzję</button> : null}
                {showDecision()}

            </div> : <LoadingSpinner/>}
        </div>
    )
}

const ReportDesc = (props: APIObject) => {

    const adminCheck = useSelector((state: RootState) => state.storeData.userData.isAdmin)

    return (
        <>
            <div className='p-4 bg-bg/55 rounded-r-lg font-thin text-justify'>
                <span>{`Zgłoszenie nr ${props.id} - ${props.race.displayText} - ${props.race.split.name}`}</span>
            </div>
            <div className='p-4 bg-bg/55 rounded-r-lg'>
            <div className='mb-2'><span className='text-xl font-thin'>Szczegóły zgłoszenia</span></div>
            <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Zgłaszający</span><span>{props.reportingDriver.nickname}</span></div>
            <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Zgłoszony</span><span>{props.reportedDriver.nickname}</span></div>
            <div className='flex flex-col m-2'><span className='text-sm text-color/55 '>Data zgłoszenia</span><span className='text-justify'>{props.reportDate ? new Date(props.reportDate).toLocaleDateString('pl-PL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) : 'Brak daty'}</span></div>
                <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Dowód</span><span className='font-light opacity-90'>{props.incidentLink}</span></div>
                {adminCheck ? <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Opis incydentu</span><span
                    className='font-light opacity-90'>{props.incidentDescription}</span></div> : null}
            </div>
        </>

    )
}

const ReportDecision = (props: {penaltySec: number, penaltyPt: number, decisionDesc: string, switchFn: any}) => {

    const adminCheck = useSelector((state: RootState) => state.storeData.userData.isAdmin)

    return (
        <div className='p-4 bg-bg/55 rounded-r-lg'>
            <div className='mb-3'><span className='text-xl font-thin'>Decyzja</span></div>
            <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Kara sekundowa</span><span>{props.penaltySec}</span></div>
            <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Kara punktowa</span><span>{props.penaltyPt}</span></div>
            <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Uzasadnienie</span><span className='font-light opacity-90'>{props.decisionDesc}</span></div>
            {adminCheck ? <div className='flex justify-end p-2'><button onClick={props.switchFn} className='underline'>Edytuj werdykt</button></div> : null}
        </div>
    )
}

const ReportDecisionEdit = (props: {penaltySec: number, penaltyPt: number, decisionDesc: string, penaltyId: number, switchFn: any, isLoading: any}) => {

    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)

    const [editSeconds, setEditSeconds] = useState(props.penaltySec ? props.penaltySec : 0)
    const [editPoints, setEditPoints] = useState(props.penaltyPt ? props.penaltyPt : 0)
    const [editDesc, setEditDesc] = useState(props.decisionDesc ? props.decisionDesc : '')


    function handleInputChangeSeconds(e: React.ChangeEvent<HTMLInputElement>): void {
        setEditSeconds(() => e.target.valueAsNumber)
    }

    function handleInputChangePoints(e: React.ChangeEvent<HTMLInputElement>): void {
        setEditPoints(() => e.target.valueAsNumber)
    }

    function handleInputChangeDesc(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        setEditDesc(() => e.target.value)
    }

    function postEditDecision(e: React.MouseEvent) {
        e.preventDefault()


        if(editDesc != '' && editSeconds != null && editPoints != null) {

            props.isLoading(true)

            axios.patch(API_SERVER + '/report/' + props.penaltyId, {
                checked: true,
                penaltySeconds: editSeconds,
                penaltyPoints: editPoints,
                decisionDescription: editDesc
            })
                .then(() => props.isLoading(false))
                .catch(ex => {
                    console.log(ex)
                    window.location.href = "/error"
                })

        }

    }


    return (
        <div className='p-4 bg-bg/55 rounded-r-lg'>
            <form >
                <div className='mb-3'><span className='text-xl font-thin'>Edycja Decyzji</span></div>
                <div className='flex flex-col m-2'>
                    <span className='text-sm text-color/55'>Kara sekundowa</span>
                    <span><input onChange={handleInputChangeSeconds} type='number' required className='bg-transparent font-light border-b-[1px] outline-0' value={editSeconds}/></span>
                </div>
                <div className='flex flex-col m-2'>
                    <span className='text-sm text-color/55'>Kara punktowa</span>
                    <span><input onChange={handleInputChangePoints} type='number' required className='bg-transparent font-light border-b-[1px] outline-0' value={editPoints}/></span>
                </div>
                <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Uzasadnienie</span><span className='font-light opacity-90'><TextareaAutosize
                    required
                    onChange={handleInputChangeDesc}
                    className='w-full bg-transparent font-light border-b-[1px] outline-0'
                    value={editDesc}/></span></div>
                <div className='flex justify-end p-2 gap-x-16'><button onClick={props.switchFn} className='underline'>Anuluj</button><button onClick={postEditDecision} type='submit' className='underline'>Zapisz</button></div>
            </form>
        </div>
    )
}

export default ReportView;