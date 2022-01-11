import { observer } from "mobx-react";
import Link from "next/link";
import dateFormat from "dateformat";
import {Button} from "react-bootstrap";
import {getSession, signOut} from "next-auth/react";
import {returnToSignin} from "../../utilities/utilities";
import jobStore from "../../stores/JobStore";

const Jobs = ({jobs}) => {
	console.log('jobs page', jobs)
	if (Array.isArray(jobs)){
		jobStore.setJobs(jobs)
	}
	return (
		<div className="candidates">
			<table className="table table-light base-table">
				<thead>
				<tr>
					<th>Job Name</th>
					<th>Posting Date</th>
					<th>Expire Date</th>
					<th>Location</th>
					<th>Remote</th>
					<th />
				</tr>
				</thead>

				<tbody>
				{jobStore.jobs.map(job => (
					<tr key={job.id}>
						<td className="full-name">
							<Link href={`/jobs/${job.id}`}>
								<a>
									<div className="user-picture">
										<img src="/ic_python.png" alt="" />
									</div>
									<span>{job.job_name}</span>
								</a>
							</Link>
						</td>
						<td>{dateFormat(job.post_date, 'd mmm, yyyy')}</td>
						<td>{dateFormat(job.expire_date, 'd mmm, yyyy')}</td>
						<td>{job.location.split(',')[0]}</td>
						<td>{job.category === 1 ? 'Yes' : 'No'}</td>
						<td className="options">
							<Button variant="secondary">
								<div />
							</Button>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default observer(Jobs);

export async function getServerSideProps(context) {
	const session = await getSession(context)

	console.log('jobs page ssr', session)

	if (!session) return returnToSignin()
	if (!session.user.token) {
		signOut()
	}
	console.log(session.user)
	console.log(session.user.token)
	const jobs = await fetch("https://hr-app-eth.herokuapp.com/jobs",
		{
			headers: new Headers({
				'Authorization': session.user.token,
			})
		})
		.then(res => res.json())
	console.log(jobs);
	return {
		props: {
			session,
			jobs
		},
	}
}
