import {Events} from "../components/Events.jsx";
import {Socials} from "../components/Socials.jsx";

const Home = () => {
    return (
        <div className='flex flex-col grow'>
            <Events/>
            <Socials/>
        </div>
    )
}

export default Home;