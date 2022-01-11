import {action, makeAutoObservable} from "mobx";
import {conditionallyParseJSON, htmlListToArray} from "../utilities/utilities";

class CandidateProfileStore {
	profile = {}

	constructor() {
		makeAutoObservable(this, {
			setProfile: action
		})
	}

	setProfile(profile) {
		console.log('profile store', profile)
		profile.personal_details = conditionallyParseJSON(profile.personal_details)
		profile.personal_details.fullName = `${profile.personal_details.first_name} ${profile.personal_details.last_name}`
		profile.image = `https://i.pravatar.cc/150?u=${profile.id}`
		profile.contact_details = conditionallyParseJSON(profile.contact_details)
		profile.experiences = conditionallyParseJSON(profile.experiences)
		profile.hard_skills = conditionallyParseJSON(profile.hard_skills)
		profile.licences = conditionallyParseJSON(profile.licences)
		profile.soft_skills = conditionallyParseJSON(profile.soft_skills)
		profile.degree = conditionallyParseJSON(profile.degree)
		profile.experiences.forEach(experience=>{
			experience.description = htmlListToArray(experience.description)
			experience.logo = 'assist'
			experience.checked = 'checked'
		})
		profile.degree.forEach(degree=>{
			degree.logo = 'usv'
			degree.checked = 'checked'
		})
		profile.licences.forEach(licence=>{
			licence.logo = 'koenig'
			licence.checked = 'checked'
		})
		profile.licences[0].checked = 'waiting'
		profile.matchingScoreColor = profile.match_score > 79 ? 'green' :
			profile.match_score > 59 ? 'light-orange' : profile.match_score > 39 ? 'orange' : 'red'

		this.profile = profile
	}

}

const candidateProfileStore = new CandidateProfileStore()


export default candidateProfileStore