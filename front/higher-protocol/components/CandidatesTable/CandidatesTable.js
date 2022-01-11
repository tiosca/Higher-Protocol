import Link from "next/link";
import {Button} from "react-bootstrap";
import candidatesStore from "../../stores/CandidatesStore";

const CandidatesTable = (candidatesList) => {
	const bulina = [
		{
			status: "video",
			title: "Applications Received",
		},
		{
			status: "screening",
			title: "Screening",
		},
		{
			status: "interview",
			title: "Final Interview",
		},
		{
			status: "interview",
			title: "Final Interview",
		}
	]

	const candidates = [
		{
			"id": 1,
			"personal_details": {
				"first_name": "Gigi",
				"last_name": "Lee-Jo",
				"gender": "Female",
				"birth_date": "April 23, 1986 (30 yrs old)"
			},
			"user_id": 2,
			"position": "C, C#",
			"starting_date": null,
			"location": "Bucharest",
			"is_remote": true,
			"match_score": 89,
			"fullName": "Gigi Lee-Jo",
			"image": "https://i.pravatar.cc/150?u=1",
			"matchingScoreColor": "green"
		},
		{
			"id": 2,
			"personal_details": {
				"first_name": "Maria",
				"last_name": "Mbape",
				"gender": "Female",
				"birth_date": "April 23, 1986 (30 yrs old)"
			},
			"user_id": 3,
			"position": "React.Js Developer",
			"starting_date": null,
			"location": "Suceava",
			"is_remote": true,
			"match_score": 78,
			"fullName": "Maria Mbape",
			"image": "https://i.pravatar.cc/150?u=2",
			"matchingScoreColor": "light-orange"
		},
		{
			"id": 3,
			"personal_details": {
				"first_name": "Marian",
				"last_name": "Cristi",
				"gender": "Male",
				"birth_date": "April 13, 2000"
			},
			"user_id": 4,
			"position": "Node.Js Developer",
			"starting_date": null,
			"location": "Constanta",
			"is_remote": true,
			"match_score": 32,
			"fullName": "Marian Cristi",
			"image": "https://i.pravatar.cc/150?u=3",
			"matchingScoreColor": "red"
		},
		{
			"id": 4,
			"personal_details": {
				"first_name": "Jane",
				"last_name": "Foster",
				"gender": "Femaile",
				"birth_date": "September 1, 1998"
			},
			"user_id": 1,
			"position": "Node.Js Developer",
			"starting_date": null,
			"location": "Constanta",
			"is_remote": true,
			"match_score": 55,
			"fullName": "Jane Foster",
			"image": "https://i.pravatar.cc/150?u=4",
			"matchingScoreColor": "orange"
		}
	]

	return (
		<table className="table table-light candidates-table">
			<thead>
			<tr>
				<th>Full Name</th>
				<th>Position</th>
				<th>Matching Score</th>
				<th>Status</th>
				<th/>
			</tr>
			</thead>

			<tbody>
			{candidates.map((candidate, index) => (
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
					<td className={`matching-score ${candidate.matchingScoreColor}`}>{candidate.match_score}</td>
					<td className="status">
						<div className={`status-logo ${bulina[index].status}`} />
						<p>{bulina[index].title}</p>
					</td>
					<td className="options">
						<Button variant="secondary">
							<div/>
						</Button>
					</td>
				</tr>
			))}
			</tbody>
		</table>
	)
}

export default CandidatesTable;
