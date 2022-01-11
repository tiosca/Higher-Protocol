// libs
import {Button, Form} from "react-bootstrap";
import Link from "next/link";
import dateFormat from "dateformat";
import {observer} from "mobx-react";
import {getSession, signOut} from "next-auth/react";
import {useEffect} from "react";

// custom
import candidatesStore from "../../stores/CandidatesStore";
import {returnToSignin} from "../../utilities/utilities";


const Candidates = ({candidates}) => {
	useEffect(()=>{
		if (Array.isArray(candidates)){
			candidatesStore.loadCandidatesList(candidates)
		}
	},[candidates])

	return (
		<div className="candidates-page">
			<div className="filters">
				<Button variant="secondary" className="left-logo"/>
				<Form.Select defaultValue={"default"}>
					<option disabled value="default">Position</option>
					<option value="developer">Developer</option>
					<option value="tester">Tester</option>
					<option value="project-manager">Project Manager</option>
				</Form.Select>

				<Form.Select defaultValue={"default"}>
					<option disabled value="default">Experience</option>
					<option value="junior">Junior</option>
					<option value="mid">Mid</option>
					<option value="senior">Senior</option>
				</Form.Select>

				<Form.Select defaultValue={"default"}>
					<option disabled value="default" hidden>Location</option>
					<option value="developer">Bucuresti</option>
					<option value="tester">Constanta</option>
					<option value="project-manager">Iasi</option>
					<option value="project-manager">Cluj</option>
				</Form.Select>

				<Form.Select defaultValue={"default"}>
					<option disabled value="default" hidden>Remote</option>
					<option value="yes">Yes</option>
					<option value="no">No</option>
				</Form.Select>

				<Form.Select defaultValue={"default"}>
					<option disabled value="default" hidden>Matching Score</option>
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</Form.Select>

				<Button variant="secondary" className="trash-logo"/>
			</div>

			<div className="candidates">
				<table className="table table-light candidates-table">
					<thead>
					<tr>
						<th>Full Name</th>
						<th>Position</th>
						<th>Starting Date</th>
						<th>Location</th>
						<th>Remote</th>
						<th>Matching Score</th>
						<th/>
					</tr>
					</thead>

					<tbody>
					{candidatesStore.candidates.slice(candidatesStore.firstOnPage - 1, candidatesStore.lastOnPage).map(candidate => (
						<tr key={candidate.id}>
							<td className="full-name">
								<Link href={`/candidates/${candidate.id}`}>
									<a>
										<div className="user-picture">
											<img
												src={candidate.image}
												alt=""/>
										</div>
										<span>{candidate.fullName}</span>
									</a>
								</Link>
							</td>
							<td>{candidate.position}</td>
							<td>{dateFormat(candidate.start_date, 'd mmm, yyyy')}</td>
							<td>{candidate.location.split(',')[0]}</td>
							<td>{candidate.remote ? 'Yes' : 'No'}</td>
							<td className={`matching-score ${candidate.matchingScoreColor}`}>{candidate.match_score}</td>
							<td className="options">
								<Button variant="secondary">
									<div/>
								</Button>
							</td>
						</tr>
					))}
					</tbody>

				</table>
			</div>

			<div className="pagination">
				<p
					className="noselect">Showing {candidatesStore.firstOnPage} to {candidatesStore.lastOnPage} of {candidatesStore.candidates.length} entries</p>

				<Button className="previous" variant="secondary"
				        onClick={() => candidatesStore.selectPage('previous')}
				        disabled={candidatesStore.currentPage === 1}
				/>

				{candidatesStore.pageButtons.map((pageNumber) => (
					<Button variant="secondary"
					        className={pageNumber === candidatesStore.currentPage ? 'selected' : ''}
					        disabled={pageNumber === candidatesStore.currentPage}
					        key={pageNumber}
					        onClick={() => candidatesStore.selectPage(pageNumber)}>
						{pageNumber}
					</Button>
				))}

				<Button className="next" variant="secondary"
				        onClick={() => candidatesStore.selectPage('next')}
				        disabled={candidatesStore.currentPage === candidatesStore.totalPages}
				/>
			</div>

		</div>
	)
}

export default observer(Candidates);

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()
	if (!session.user.token) {
		console.log('jobs ssr page. no token')
		signOut()
	}
	const candidates = await fetch("https://hr-app-eth.herokuapp.com/candidates",
		{
			headers: new Headers({'Authorization': session.user.token})
		})
		.then(res => res.json())

	return {
		props: {
			session,
			candidates
		},
	}
}
