import Card from "../components/Card/Card";
import candidateStore from "../stores/CandidatesStore";
import CandidatesTable from "../components/CandidatesTable/CandidatesTable";
import {getSession} from "next-auth/react";
import {returnToSignin} from "../utilities/utilities";
import Image from "next/image";

export default function Home() {
	const cards = [
		{
			backgroundColor: "#48A9F8",
			title: "Applications Received",
			value: 75,
			logo: "applications-logo"
		},
		{
			backgroundColor: "#4E36E2",
			title: "Interviews Schedule",
			value: 75,
			logo: "schedule-logo"
		},
		{
			backgroundColor: "#1BD084",
			title: "Profiles Viewed",
			value: 75,
			logo: "profiles-logo"
		},
		{
			backgroundColor: "#8BC740",
			title: "Unread messages",
			value: 75,
			logo: "messages-logo"
		}
	]

	return (
		<div className="dashboard-page">
			<div className="cards">
				{cards.map((cardProps, index) => (
					<Card card={cardProps} key={index}/>
				))}
			</div>
			<div className="graph">
				<Image src="/fake_jobStatistic.png" layout="responsive" width={1170} height={485}/>
			</div>
			<div className="agenda">
				<div className="queue">
					<CandidatesTable candidatesList={candidateStore.candidates.slice(0, 5)}/>
				</div>
				<div className="calendar">
					<Image src="/fake_calendar.png" layout="responsive" width={340} height={590}/>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()

	return {
		props: {
			session
		},
	}
}

