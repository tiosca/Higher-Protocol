import StarRating from "../StarRating/StarRating";

const Skill = ({skill}) => {
	const title = Object.keys(skill)[0];
	const value = skill[title];

	return (
		<tr >
			<td className="skill">
				<div className="checkmark"/>
				<div className="skill-name">
					{title}
				</div>
			</td>
			<td>
				<StarRating rating={value}/>
			</td>
		</tr>
	)
}

export default Skill;