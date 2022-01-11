import React, { Component } from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap'
import {getSession} from "next-auth/react";
import {returnToSignin} from "../../utilities/utilities";
import JobAssessment from "../../components/job/JobAssessment";
import JobSmartContract from "../../components/job/JobSmartContract";
import JobDescriptionContainer from "../../components/job/JobDescriptionContainer";


class JobCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {activeTab: 0};
	}

	render() {
		return (
			<Card className="card-job">
				<Tabs
					id="controlled-tab-example"
					className="mb-3 tab-header">
					<Tab eventKey="home" title="Description">
						<JobDescriptionContainer />
					</Tab>
					<Tab eventKey="profile" title="Smart contract">
						<JobSmartContract />
					</Tab>
					<Tab eventKey="contact" title="Assessment">
						<JobAssessment />
					</Tab>
				</Tabs>
				<Card.Body />
			</Card>
		)
	}
}

export default JobCreate;

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()

	return {
		props: {
			session
		},
	}
}
