const Card = ({card}) => {
	return (
		<div className="card-content" style={{backgroundColor: card.backgroundColor}}>
			<div className={`logo ${card.logo}`}/>
			<div className="trio">
				<p className="title">{card.title}</p>
				<p className="value">{card.value}</p>
			</div>
		</div>
	)
}

export default Card;
