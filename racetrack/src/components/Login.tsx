import {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {RootState} from "../store/store";
import Cookies from 'js-cookie';
// @ts-ignore
import LoadingSpinner from "./loadingSpinner.jsx";

function Login() {
  const [searchParams] = useSearchParams();
  const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
  const [isLoginDone, setIsLoginDone] = useState<boolean>(false)
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false)

  useEffect(() => {
    axios.get(API_SERVER + `/login/oauth2/code/discord?code=${searchParams.get("code")}&state=${searchParams.get("state")}`, {
      withCredentials: true
    })
        .then(response => {
          const token = response.data.token
          let providedToken
            if(providedToken === undefined) {
                Cookies.set('token', token, {expires: 7, secure: true})
                providedToken = Cookies.get('token')
            }
            providedToken === undefined ? setIsLoginSuccess(false) : setIsLoginSuccess(true)
            setIsLoginDone(true)
            providedToken !== undefined ? window.location.href = "/" : null
        })
        .catch((ex) => {
            setIsLoginDone(true)
            console.log(ex)
        });
  }, []);

  const loginInfo = () => {
      if(isLoginDone) {
          console.log(isLoginSuccess + ' ' + isLoginDone)
          return isLoginSuccess ? 'Zalogowano' : 'Wystąpił błąd podczas logowania'
      } else {
          return <LoadingSpinner/>
      }
  }

  return (
      <h1 className='text-xl text-center text-color'>{loginInfo()}</h1>
  )
}

export { Login }