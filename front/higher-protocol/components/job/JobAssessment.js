import React, { Component } from 'react';

class JobAssessment extends Component {

	constructor(props) {
		super(props);
		this.state = {started: false, generated: false}
	}

	render() {
		return(
			<div className="container bigger-space">
				<span>Assessments</span>
			</div>
		)
	}
}

export default JobAssessment;
