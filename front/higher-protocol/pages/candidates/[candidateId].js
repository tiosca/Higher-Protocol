import candidateProfileStore from "../../stores/CandidateProfileStore";
import Experience from "../../components/Experience/Experience";
import Skill from "../../components/Skill/Skill";
import {getSession} from "next-auth/react";
import {returnToSignin} from "../../utilities/utilities";
import ReactTooltip from "react-tooltip";
import {useEffect, useState} from "react";

const CandidateProfile = ({candidateProfile}) => {
	if (!candidateProfile.message) {
		candidateProfileStore.setProfile(candidateProfile.details)
	}

	const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip

	useEffect(() => {
		setIsMounted(true);
	}, []);


	return (
		<div className="candidate_profile">
			<div className="details-small">
				<div className="user-info">
					<div className="user-picture">
						<img src={candidateProfileStore.profile.image}/>
						<div className={`match-score ${candidateProfileStore.profile.matchingScoreColor}`}>
							{candidateProfileStore.profile.match_score}
						</div>
					</div>

					<div className="details">
						<p id="full-name">{candidateProfileStore.profile.personal_details.fullName}</p>
						<p id="position">{candidateProfileStore.profile.position}</p>
					</div>
				</div>

				<div className="contact-logos">
					<div className="contact-button-container">
						<button className="message"/>
					</div>
					<div className="contact-button-container">
						<button className="call"/>
					</div>
					<div className="contact-button-container">
						<button className="calendar"/>
					</div>
				</div>
				<div className="contact-details">
					<h4>Contact details</h4>
					<div className="email">
						<div className="email-logo"/>
						<div className="duo">
							<p className="field">Email</p>
							<p>{candidateProfileStore.profile.contact_details.email}</p>
						</div>
					</div>
					<div className="phone">
						<div className="phone-logo"/>
						<div className="duo">
							<p className="field">Phone</p>
							<p>{candidateProfileStore.profile.contact_details.phone}</p>
						</div>
					</div>
					<div className="address">
						<div className="address-logo"/>
						<div className="duo">
							<p className="field">Address</p>
							<p>{candidateProfileStore.profile.contact_details.address}</p>
						</div>
					</div>
				</div>

			</div>
			<div className="details-large">
				<div className="header">
					Candidate Profile
				</div>
				<div className="personal-details">
					Personal Details
				</div>

				<table className="details-table">
					<tbody>
					<tr>
						<td>
							<p>First Name</p>
							<p>{candidateProfileStore.profile.personal_details.first_name}</p>
						</td>
						<td>
							<p>Last Name</p>
							<p>{candidateProfileStore.profile.personal_details.last_name}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Gender</p>
							<p>{candidateProfileStore.profile.personal_details.gender}</p>
						</td>
						<td>
							<p>Date of birth</p>
							<p>{candidateProfileStore.profile.personal_details.birth_date}</p>
						</td>
					</tr>
					</tbody>
				</table>

				<div className="about-me">
					<h4>About me</h4>
					<p>{candidateProfileStore.profile.about}</p>
				</div>

				<div className="read-more">
					Read More
					<button className="read-logo"/>
				</div>

				<div className="experiences-tab">
					<div className="index">
						<h4>Experiences</h4>
					</div>
					{candidateProfileStore.profile.experiences.map(((experience, index) => (
						<Experience experience={experience} key={index}/>
					)))}
				</div>

				<div className="degree-tab">
					<h4>Degree</h4>
					{candidateProfileStore.profile.degree.map((degree, index) => (
						<Experience experience={degree} key={index}/>
					))}
				</div>

				<div className="licenses-certifications-tab">
					<h4>Licences & Certifications</h4>
					{candidateProfileStore.profile.licences.map((licence, index) => (
						<Experience experience={licence} key={index}/>
					))}
				</div>

				<div className="hard-skills-tab">
					<h4>Hard Skills</h4>
					<table>
						<tbody>
						{candidateProfileStore.profile.hard_skills.map((skill, index) => (
							<Skill skill={skill} key={index}/>
						))}
						</tbody>
					</table>
				</div>

				<div className="soft-skills-tab">
					<h4>Soft Skills</h4>
					<table>
						<tbody>
						{candidateProfileStore.profile.soft_skills.map((skill, index) => (
							<Skill skill={skill} key={index}/>
						))}
						</tbody>
					</table>
				</div>
			</div>
			{isMounted && (
				<ReactTooltip id='global' place="right" type="dark" aria-haspopup='true' role='example' className="experience_tooltip">
					<i className="hash-logo"/>
					<div className="tooltip-content">
						<p className="title">Facultatea de Inginerie Electrică şi Ştiinţa Calculatoarelor</p>
						<p className="subtitle">Higher Protocol Certification</p>
						<p className="detail">
							Certified by:
							<span className="authority">Universitatea „Ştefan cel Mare” din Suceava</span>
						</p>
						<p className="detail">
							Certified on:
							<span className="detail-value">May 12, 2019</span>
						</p>
						<p className="detail">
							Hash:
							<span className="detail-value">91f220ac8300ac1af2e3a93d1555c6de4f71c8ec9925f3cb187fe181ec...</span>
							<i className="copy-hash"/>
						</p>
					</div>
				</ReactTooltip>
			)}
		</div>
	)
}

export default CandidateProfile;

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()

	const candidateProfile = await fetch(`https://hr-app-eth.herokuapp.com/candidates/${context.params.candidateId}`,
		{
			headers: new Headers({'Authorization': session.user.token})
		})
		.then(res => res.json())

	return {
		props: {
			session,
			candidateProfile
		},
	}
}
