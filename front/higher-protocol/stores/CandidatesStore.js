import {action, flow, makeAutoObservable} from "mobx";
import {range} from "../utilities/utilities";

class CandidatesStore {
	candidates = []
	perPage = 10
	currentPage = 1
	firstOnPage = 1
	lastOnPage = 1
	totalPages = 1
	pageButtons = []

	constructor() {
		makeAutoObservable(this, {
			loadCandidatesList: action
		})
	}

	loadCandidatesList(candidates) {
		this.lastOnPage = Math.min(this.perPage, candidates.length);
		this.totalPages = Math.ceil(candidates.length / this.perPage);
		this.pageButtons = range(1, Math.min(3, this.totalPages));
		candidates.forEach(candidate => {
			if (typeof candidate.personal_details === 'string') {
				candidate.personal_details = JSON.parse(candidate.personal_details)
			}
			candidate.fullName = `${candidate.personal_details.first_name} ${candidate.personal_details.last_name}`
			candidate.image = `https://i.pravatar.cc/150?u=${candidate.id}`
			candidate.matchingScoreColor = candidate.match_score > 79 ? 'green' :
				candidate.match_score > 59 ? 'light-orange' : candidate.match_score > 39 ? 'orange' : 'red'
		})
		console.log(candidates)
		this.candidates = candidates
		this.candidates.sort((a,b)=> b.match_score - a.match_score)
	}

	selectPage(page) {
		console.log('select page', page)
		if (typeof page === 'string') {
			const pageFilter = {
				previous: this.currentPage === 1 ? this.currentPage : this.currentPage - 1,
				next: this.currentPage === this.totalPages ? this.totalPages : this.currentPage + 1
			}
			page = pageFilter[page]
		}

		this.currentPage = page
		this.firstOnPage = 1 + this.perPage * (page - 1)
		this.lastOnPage = Math.min(this.firstOnPage + this.perPage - 1, this.candidates.length);

		if (page>1 && page <this.totalPages) this.pageButtons = range(page-1, page+1)
	}
}


const candidatesStore = new CandidatesStore()

export default candidatesStore