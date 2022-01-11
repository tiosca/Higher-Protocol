const Experience = ({experience}) => {
	return (
		<div className="experience">
			<div className="logo">
				{/*<div className={`company-logo ${experience.logo}`}/>*/}
				{experience.logo === "usv" && (
					<div className={`company-logo ${experience.logo}`} data-tip data-for="global" data-event="click"/>
				)}
				{experience.logo !== "usv" && (
					<div className={`company-logo ${experience.logo}`}/>
				)}
				<div className={`checkmark ${experience.checked}`}/>
			</div>
			<div className="display">
				<div className="duo">
					<p className="name">{experience.name}</p>
					{experience.company && <p className="org">{experience.company} | {experience.duration}</p>}
					{experience.org && <p className="org">{experience.org}</p>}
				</div>

				{experience.description &&
					<div className="description">
						<ul>
							{experience.description.map((description, index) => (
								<li key={index}>{description}</li>
							))}
						</ul>
					</div>}
			</div>
		</div>
	)
}

export default Experience;