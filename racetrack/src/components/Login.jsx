import { useSignIn } from 'react-auth-kit';
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Login(props) {
    const signIn = useSignIn();
  const [searchParams] = useSearchParams();

  async function getAuthToken() {
    fetch(
      `http:/146.59.34.32:8080/api/login/oauth2/code/discord?code=${searchParams.get("code")}&state=${searchParams.get("state")}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((ex) => console.log(ex));
  }

  useEffect(() => {
    getAuthToken();
  }, []);

  return <h1>Logowanie...</h1>;
}

export { Login }