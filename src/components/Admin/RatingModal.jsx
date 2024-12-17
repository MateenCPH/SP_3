import React, { useState } from 'react';
import RatingIcon from "../../assets/icons/Rating";
import CloseIcon from '../../assets/icons/CloseIcon';

const RatingModal = ({ mealRating }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(null);

    const handleNewRating = () =>{
        mealRating = rating;
    }

    
    return ( 
        <div >
            <span className="flex flex-row"  onClick={() => setIsModalOpen(true)}>
                <RatingIcon/> <p className="ml-2">{mealRating} / 5</p>
            </span>
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
                    <div className="fixed inset-0 flex justify-center items-center z-50">

                    <form action={handleNewRating} className='bg-Primary p-6 rounded-md' >
                        <div className='flex flex-row items-center justify-between mb-4'>
                            <h2 className='text-xl mb-2'>Give Your Rating</h2>
                            <span className='text-center rounded-sm bg-red-500 text-Primary cursor-pointer' onClick={() => setIsModalOpen(false)}><CloseIcon /></span>
                        </div>

                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row items-center gap-1'>

                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;
                                    return (
                                        
                                        <label key={i}>
                                            <input type="radio" name="rating" value={ratingValue} onClick={() => (setRating(ratingValue)) } className='hidden' />
                                            <RatingIcon 
                                                color={ratingValue <= rating ? "#F09136" : "#e2e2e2"} 
                                                fill={ratingValue <= rating ? "#F09136" : "#e2e2e2"}
                                                />

                                        </label>                      
                                    )
                                })}
                            </div>
                            <button type="submit" className="bg-green-500 text-white p-2 rounded flex justify-end ml-6">Submit</button>
                        </div>
                        </form>
                    </div>





                    {/* div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsModalOpen(false)}></div>
                    <div className="fixed inset-0 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-md">
                            <h2 className="text-2xl">Rate Meal</h2>
                            <form>
                                <label htmlFor="rating">Rating</label>
                                <input type="number" placeholder='1 / 5' name="rating" id="rating"  onChange={(e) => setRating(e.target.value)} />
                                <button type="submit" className="bg-green-500 text-white p-2 rounded-md">Submit</button>
                            </form>
                        </div>
                    </div> */}
                </>
            )}
        </div>
     );
}
 
export default RatingModal;