import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const AdminPanelMain = () => {

    const adminCheck = useSelector((state: RootState) => state.storeData.userData.isAdmin)

    return (
        <div className='flex text-color p-4 flex-wrap'>
            { adminCheck ? <div className='grid grid-cols-2 gap-4 w-full'>
                <AdminModuleTile pathTarget='trackPanel' name='Tory' icon={<svg className='stroke-color fill-none stroke-[4rem] w-8'
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 492 561">
                    <path className="cls-1"
                          d="M1152,504s216-9,216,216c0,216-144,216-144,216s-72,0-72-72-72-72-72-72-72,0-72,72c0,90-72,90-72,0V576s0-72,72-72Z"
                          transform="translate(-906 -405)"/>
                    <path d="M156,27h0a18,18,0,0,1,18,18V72a0,0,0,0,1,0,0H138a0,0,0,0,1,0,0V45A18,18,0,0,1,156,27Z"/>
                    <path
                        d="M148.25,0h51.94A9.81,9.81,0,0,1,210,9.81V34.76A10.24,10.24,0,0,1,199.76,45H138a0,0,0,0,1,0,0V10.25A10.25,10.25,0,0,1,148.25,0Z"/>
                </svg>}/>
                <AdminModuleTile pathTarget='seasonPanel' name='Sezony' icon={<svg  className='fill-color w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg>}/>
                <AdminModuleTile pathTarget='' name='Kierowcy' icon={<svg className='h-8 fill-color' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z"/></svg>}/>
                <AdminModuleTile pathTarget='' name='Gry' icon={<svg className='w-8 fill-color' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>}/>
            </div> : <div className='grow flex justify-center items-center text-2xl font-thin'>Brak uprawnień</div>}
        </div>
    )
}

export const AdminModuleTile = (props: {pathTarget: string, name: string, icon: any}) => {
    return (
        <Link to={'/admin/' + props.pathTarget} className='flex w-full p-4 min-h-24 rounded-lg backdrop-blur-sm justify-end items-end truncate bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10'>
            <span className='w-full h-full flex justify-center items-center '><span className='opacity-75'>{props.icon}</span></span>
            <span className='min-w-[50%] text-md font-thin text-wrap text-right'>{props.name}</span>
        </Link>
    )
}

export default AdminPanelMain;