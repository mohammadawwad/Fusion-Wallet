import {BsShieldFillCheck} from 'react-icons/bs';
import {BiSearchAlt} from 'react-icons/bi';
import {RiHeart2Fill} from 'react-icons/ri';

//reusable service cars
const ServicesCard = ({color, title, icon, subtitle}) => (
    <div className="flex flex-row justify-start max-w-xl items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        {/*generates icon*/}
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>

        {/*Title and text*/}
        <div className="ml-5 flex flex-xol flex-1">
            <h1 className="mt-2 text-white text-lg">{title}</h1>
            <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
        </div>
        
    </div>
)

const Services = () => {
    return(
        <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
                        Services That We 
                        <br/>
                        Continue To Improve
                    </h1>
                </div>
            </div>

            {/*services card*/}
            <div className="flex-1 flex flex-col justify-start items-center">
                <ServicesCard
                    color="bg-[#2952E3]"
                    title="Security Gauranteed"
                    icon={<BsShieldFillCheck fontSize={21} className="text-white"/>}
                    subtitle="Security is our priority, and we always maintain our quality of the product"
                />
                <ServicesCard
                    color="bg-[#8945F8]"
                    title="Best Exchange Rates"
                    icon={<BiSearchAlt fontSize={21} className="text-white"/>}
                    subtitle="Offering the cheapest exchange rates in the Crypto and NFT worlds"
                />
                <ServicesCard
                    color="bg-[#F84550]"
                    title="Fastest Transactions"
                    icon={<RiHeart2Fill fontSize={21} className="text-white"/>}
                    subtitle="Insuring you money and gifts get through withing a blink of an eye"
                />
            </div>
        </div>
    )
}

export default Services;