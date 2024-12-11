import { Link } from 'react-router-dom';
import Timer from '../assets/Timer.jsx';
import Rating from '../assets/Rating.jsx';

const MealsCard = ({ meal }) => {

    return ( 
        meal ?
        <>
            <Link to={`/details/${meal.mealId}`} state={{ meal: meal }}>
                <div className="flex flex-col justify-between rounded-md bg-Secondary text-black w-80 h-40 p-3">
                    <div className='flex flex-row justify-between h-full mb-3'>
                        <div className='flex flex-col justify-between content-between h-full pr-3'>
                            <div className='text-3xl overflow-hidden'>{meal.mealName}</div>
                            <div className='w-52 h-6 truncate'>{meal.mealDescription}</div>
                        </div>
                        <img
                            className='w-20 h-20 object-cover object-center rounded-md'
                            src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1751.jpg" alt="" />
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row gap-2'><Timer />{meal.mealPrepTime} min</div>
                        
                        <div className='flex flex-row gap-2'><Rating />{meal.mealRating}</div>
                    </div>
                </div>
            </Link>
        </>
        : <div className="flex flex-col justify-between rounded-md bg-Secondary text-black w-80 h-40 p-3"></div>
     ) 
}
 
export default MealsCard;
