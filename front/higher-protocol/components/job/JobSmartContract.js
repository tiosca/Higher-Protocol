import React, { Component } from 'react';
import TextAreaPrime from '../text-area-main/TextArea';
import EditPrime from '../edit-main/Edit'
import ButtonPrime from '../button-main/Button';
import {Button} from "react-bootstrap";

class JobSmartContract extends Component {

	constructor(props) {
		super(props);
		this.state = {started: false, generated: false, hash: ''}
	}

	async generate_contract() {
		const body = {
			"condition": "One condition; Second condition",
			"value": 15,
			"min_points":80,
			"task": "Finish the project",
			"description": "Hello from the other side"
		}

		const contract = await fetch("https://hr-app-eth.herokuapp.com/jobs/21/contract",
		{	method: 'POST',
			body: JSON.stringify(body),
			headers: new Headers({
				"Content-Type": "application/json",
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjM5MDI3NzUxLCJleHAiOjE2MzkwMzEzNTEsImp0aSI6IjU3Y2I2Yzg0LTg2NzYtNGZkNS1iMDAxLWRkYjg1YzUzMzQwMCJ9.mlMh8wbFKT4VS5_xyfdE7Pnqj5GsU_Te4bAOrfApLM0',
			})
		})
		.then(res => res.json())

		this.setState({'hash_value': contract['hash_value'], generated: true})
		// this.setState({})
	}

	async get_contract_details() {
		const candidateProfile = await fetch("https://hr-app-eth.herokuapp.com/jobs/21/contract",
		{headers: new Headers({
				"Content-Type": "application/json",
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjM5MDI3NzUxLCJleHAiOjE2MzkwMzEzNTEsImp0aSI6IjU3Y2I2Yzg0LTg2NzYtNGZkNS1iMDAxLWRkYjg1YzUzMzQwMCJ9.mlMh8wbFKT4VS5_xyfdE7Pnqj5GsU_Te4bAOrfApLM0',
			})
		})
		.then(res => res.json())

		this.setState({generated: true})
	}

	render() {
		return <div className="container bigger-space-contract">
			<div className="row margin-tb-sm">
				<span className="big_label mb-2">Smart Contract</span>
				{!this.state.generated && <span className="mb-2">Automatically release payments and incentivize Seniors to complete interview tasks by releasing rewards once the tasks are done.</span>}

				{!this.state.started && <div className="button-add">
					<Button variant="primary" onClick={() => this.setState({started: true})}>New Contract</Button>
				</div>}

				{this.state.started && !this.state.generated &&
					<div>
						{/* Conditions of contract */}
						<div className="row mt-2">
							<span className="big_label mb-2">Contract Conditions</span>
						</div>
						<div className="row mt-2">
							<EditPrime placeholder="Contract condition" type="text" title="Task title" hideLabel={true}/>
						</div>
						<div className="row mt-3">
							<EditPrime placeholder="New Condition +" type="text" title="Task title" hideLabel={true}/>
						</div>

						<div className="row mt-3">
							<EditPrime placeholder="New Condition +" type="text" title="Task title" hideLabel={true}/>
						</div>

						{/* Contract reward section */}
						<div className="row mt-3">
							<span className="big_label mb-2">Contract Reward</span>
						</div>
						<div className="row mt-2">
							<EditPrime placeholder="Value" type="text" title="Task title" hideLabel={true}/>
						</div>
						<div className="row mt-2">
							<span className="big_label mb-2">Minim test result(points)</span>
						</div>
						<div className="row mt-2">
							<EditPrime placeholder="80" type="text" title="Task title" hideLabel={true}/>
						</div>

						{/* Contract task section */}
						<div className="row mt-3">
							<span className="big_label mb-2">Contract task</span>
						</div>
						<div className="row mt-2">
							<EditPrime placeholder="Definition of the task" type="text" title="Task title"/>
						</div>
						<div className="row mt-3">
							<TextAreaPrime placeholder="Task details brief explanaition"/>
						</div>
						<div className="button-add mt-4">
							<Button variant="primary" onClick={() => this.generate_contract()}>Generate Entry</Button>
						</div>
					</div>}

				{this.state.generated &&
					<div>
						<div>
							<span className="contract_success m-t-1">Contract successfully created!</span>
						</div>
						<div className="m-t-3">
							<span className="caption_bold m-r-1 ">Hash:  </span>
							<span className="caption">{this.state.hash_value}</span>
						</div>
						<div>
							<span className="caption_bold m-r-1">Created at:  </span>
							<span className="caption">May 12, 2019</span>
						</div>

						<div>
							<span className="caption_bold m-r-1">Reward:  </span>
							<span className="contract_reward">100 HP’s</span>
						</div>

						<div className="m-t-3">
							<span className="caption_bold">Contract Conditions:</span>
							<div className="class_row"><span className="contract_condition caption">The test result is equal or higher than 90 points.</span></div>
							<div className="class_row"><span className="contract_condition caption">The test has been completed in less than 14 days.</span></div>
							<div className="class_row"><span className="contract_condition caption">The candidate is employed and has signed the employment contract.</span></div>
						</div>
					</div>
				}
			</div>
		</div>
	}

}

export default JobSmartContract; 