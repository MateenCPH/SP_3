import { Link } from 'react-router-dom';
import Timer from '../assets/Timer.jsx';
import Rating from '../assets/Rating.jsx';


const MealsCard = ({ meal }) => {

    return ( 
        <>
            <Link to={`/meals/${meal.id}`}>
                <div className="flex flex-col justify-between rounded-md bg-Secondary text-black w-80 h-40 p-3">
                    <div className='flex flex-row justify-between'>
                        <div>
                            <div className='text-3xl overflow-ellipsis'>{meal.mealName}</div>
                            <div className='overflow-ellipsis'>A very delicious burger</div>
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
     );
}
 
export default MealsCard;