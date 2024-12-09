import { Link } from 'react-router-dom';
import Timer from '../assets/Timer.jsx';
import Rating from '../assets/Rating.jsx';


const MealsCard = () => {
    return ( 
        <>
            <div className="flex flex-col justify-between rounded-md bg-Secondary text-black w-80 h-40 p-3">
                <div className='flex flex-row'>
                    <div>
                        <div className='text-3xl'>Home made Burger</div>
                        <div>A very delicious burger</div>
                    </div>
                    <img
                        className='w-20 h-20 object-cover object-center rounded-md'
                        src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1751.jpg" alt="" />
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row gap-2'><Timer />10 min</div>
                    
                    <div className='flex flex-row gap-2'><Rating />4.5</div>
                </div>
            </div>
        </>
     );
}
 
export default MealsCard;