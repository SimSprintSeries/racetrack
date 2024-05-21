import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const AdminPanelMain = () => {

    const adminCheck = useSelector((state: RootState) => state.storeData.userData.isAdmin)

    return (
        <div className='flex text-color p-4 flex-wrap'>
            { adminCheck ? <div className='grid grid-cols-2 gap-4 w-full'>
                <AdminModuleTile pathTarget='trackPanel' name='Tory' icon=''/>
                <AdminModuleTile pathTarget='seasonPanel' name='Sezony' icon=''/>
                <AdminModuleTile pathTarget='' name='Kierowcy' icon=''/>
                <AdminModuleTile pathTarget='' name='Gry' icon=''/>
            </div> : <div className='grow flex justify-center items-center text-2xl font-thin'>Brak uprawnień</div>}
        </div>
    )
}

export const AdminModuleTile = (props: {pathTarget: string, name: string, icon: any}) => {
    return (
        <Link to={'/admin/' + props.pathTarget} className='flex w-full aspect-square p-2 bg-bg/55 rounded-lg justify-end items-end truncate relative'>
            <span className='absolute right-0 top-0 w-full h-full flex justify-center items-center'><span className='w-2/3 opacity-25'>{props.icon}</span></span>
            <span className='m-4 text-md font-thin text-wrap text-right'>{props.name}</span>
        </Link>
    )
}

export default AdminPanelMain;