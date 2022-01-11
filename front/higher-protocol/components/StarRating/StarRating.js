import {range} from "../../utilities/utilities";

const StarRating = ({rating}) => (
	<div className="star-rating">
		{range(0,rating-1).map(i=> <div className="star active" key={i}/>)}
		{range(rating,4).map(i=> <div className="star" key={i}/>)}

		{/*<span>{rating}</span>*/}

	</div>
)

export default StarRating;