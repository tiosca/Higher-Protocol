import {action, flow, makeAutoObservable, observable} from "mobx";

class JobStore {
	jobs = []

	constructor() {
		makeAutoObservable(this, {
			jobs: observable,
			fetchJobs: flow,
			setJobs: action
		})
	}

	setJobs(jobs){
		this.jobs = jobs
	}
}

const jobStore = new JobStore();

export default jobStore;