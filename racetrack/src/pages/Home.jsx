import {Events} from "../components/Events.jsx";
import {Socials} from "../components/Socials.jsx";

const Home = () => {
    return (
        <div className='grow flex flex-col'>
            <Events/>
            <Socials/>
        </div>
    )
}

export default Home;