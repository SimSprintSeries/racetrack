import { useSignIn } from 'react-auth-kit';
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";

function Login(props) {
    const signIn = useSignIn();
  const [searchParams] = useSearchParams();
  const API_SERVER = useSelector(state => state.storeData.apiServer)

  useEffect(() => {
    axios.get(API_SERVER + `/login/oauth2/code/discord?code=${searchParams.get("code")}&state=${searchParams.get("state")}`, {
      withCredentials: true
    })
        .then(response => console.log(response))
        .catch((ex) => console.log(ex));

  }, []);

  return <h1 className='text-xl text-center text-color'>Logowanie...</h1>;
}

export { Login }