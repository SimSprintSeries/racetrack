const Socials = () => {
    return (
        <div className='grid grid-cols-[1fr_1.1fr_1fr] mt-4 max-h-[10vh]'>
            <SocialMedia/>
            <Sponsors/>
            <Patronite  />
        </div>
    )
}

const SocialMedia = () => {
    return (
        <div className='flex flex-col items-center px-8'>
            <p className='text-color text-[24px] font-thin'>Nasze sociale:</p>
            <div className='flex space-x-10 justify-center items-center mt-16'>
                <a  href=""><img src="" alt="Facebook"/></a>
                <a  href=""><img src="" alt="Discord"/></a>
                <a  href=""><img src="" alt="YouTube"/></a>
                <a  href=""><img src="" alt="TikTok"/></a>
                <a  href=""><img src="" alt="Twitch"/></a>
            </div>
        </div>
    )
}

const Sponsors = () => {
    return (
        <div className='flex flex-col items-center'>
            <p className='text-color text-[24px] font-thin'>Współpracujemy z:</p>
            <div className='flex space-x-10 justify-center items-center mt-4'>
                <a className='max-w-[20%]' href=""><img src="https://1000logos.net/wp-content/uploads/2021/05/LetyShops-logo.png" alt="Letyshops"/></a>
                <a className='max-w-[20%]' href=""><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Logo_g2a_white.svg/1200px-Logo_g2a_white.svg.png" alt="G2A"/></a>
                <a className='max-w-[20%]' href=""><img src="https://racetracks.pl/wp-content/uploads/2022/08/cropped-logo-new-bez-tla.png" alt="Racetracks.pl"/></a>
            </div>
        </div>
    )
}

const Patronite = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <a href=""><img width='350px' src="https://d3mi06r82nxl9g.cloudfront.net/files/logotypes/png/patronite-PNG-02-white.png" alt="Patronite"/></a>
        </div>
    )
}


export { Socials }