import {Link} from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <div className='text-color p-8 grow flex flex-col justify-center'>
            <h1 className='text-4xl text-color/75'>404</h1>
            <h2 className='p-2'>Wygląda na to, że zapomniałeś o hamowaniu <br/> w T1 i wypadłeś z toru :/</h2>
            <div className='flex mt-8 justify-end' ><Link className='p-4 text-sm underline' to='/'>Użyj powrotu na tor</Link></div>
        </div>
    )
}