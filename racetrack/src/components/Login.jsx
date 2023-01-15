import { useSignIn } from 'react-auth-kit';

function Login(props) {

    const signIn = useSignIn()

    function getCodeState() {
        const params = []
        const url = window.location.search
        const indexOfCode = url.indexOf('code=')
        const indexOfState = url.indexOf('&state=')
        params.push(url.slice(indexOfCode + 5, indexOfState))
        params.push(url.slice(indexOfState + 7, url.length))
        return params
    }

    async function getAuthToken() {
        const params = getCodeState()
        try {
            const response = fetch(`http://146.59.34.32:8080/api/login/oauth2/code/discord?code=${params[1]}&state=${params[2]}`)
            signIn({
                token: response.token,
                expiresIn: 6000,
                tokenType: 'Bearer',
                authState: { name: 'username' }
            })
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => { getAuthToken() }, [])

    return <h1>Logowanie...</h1>
}

export { Login }