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

    return (
        <div className='flex flex-col text-color p-4 flex-wrap'>
            {!isLoading ? <div className='flex flex-col gap-4 border-l-[1px] border-color/35'>
                <ReportDesc {...reportData} />
                {reportData.decisionDescription ? !editingMode ?
                    <ReportDecision switchFn={() => switchEditingMode()} penaltySec={reportData.penaltySeconds}
                                    penaltyPt={reportData.penaltyPoints}
                                    decisionDesc={reportData.decisionDescription}/> :
                    <ReportDecisionEdit switchFn={() => switchEditingMode()} penaltySec={reportData.penaltySeconds}
                                        penaltyId={reportData.id} penaltyPt={reportData.penaltyPoints}
                                        decisionDesc={reportData.decisionDescription}/> : null}
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

const ReportDecisionEdit = (props: {penaltySec: number | string, penaltyPt: number, decisionDesc: string, penaltyId: number, switchFn: any}) => {

    const adminCheck = useSelector((state: RootState) => state.storeData.userData.isAdmin)
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [editSeconds, setEditSeconds] = useState(props.penaltySec)
    const [editPoints, setEditPoints] = useState(props.penaltyPt)
    const [editDesc, setEditDesc] = useState(props.decisionDesc)

    function handleInputChangeSeconds(e: React.ChangeEvent<HTMLInputElement>): void {
        setEditSeconds(() => e.target.valueAsNumber ? e.target.valueAsNumber : 0)
    }

    function handleInputChangePoints(e: React.ChangeEvent<HTMLInputElement>): void {
        setEditPoints(() => (!e.target.valueAsNumber || e.target.valueAsNumber > 20) ? 0 : e.target.valueAsNumber)
    }

    function handleInputChangeDesc(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        setEditDesc(() => e.target.value ? e.target.value : '')
    }

    function postEditDecision() {

    }


    return (
        <div className='p-4 bg-bg/55 rounded-r-lg'>
            <form action="">
                <div className='mb-3'><span className='text-xl font-thin'>Edycja Decyzji</span></div>
                <div className='flex flex-col m-2'>
                    <span className='text-sm text-color/55'>Kara sekundowa</span>
                    <span><input onChange={handleInputChangeSeconds} type='number' className='bg-transparent font-light border-b-[1px] outline-0' value={editSeconds}/></span>
                </div>
                <div className='flex flex-col m-2'>
                    <span className='text-sm text-color/55'>Kara punktowa</span>
                    <span><input onChange={handleInputChangePoints} type='number' className='bg-transparent font-light border-b-[1px] outline-0' value={editPoints}/></span>
                </div>
                <div className='flex flex-col m-2'><span className='text-sm text-color/55'>Uzasadnienie</span><span className='font-light opacity-90'><TextareaAutosize
                    onChange={handleInputChangeDesc}
                    className='w-full bg-transparent font-light border-b-[1px] outline-0'
                    value={editDesc}/></span></div>
                <div className='flex justify-end p-2 gap-x-16'><button onClick={props.switchFn} className='underline'>Anuluj</button><button className='underline'>Zapisz</button></div>
            </form>
        </div>
    )
}

export default ReportView;