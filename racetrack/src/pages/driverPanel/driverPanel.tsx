import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {IUserData} from "../../store/appSlice";

const DriverPanel = () => {

    const userData: IUserData = useSelector((state: RootState) => state.storeData.userData)

    return (
        <div className='text-color'>
            {userData.displayName}
        </div>
    )
}

export default DriverPanel;