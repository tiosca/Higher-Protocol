import {getSession} from "next-auth/react";
import {returnToSignin} from "../utilities/utilities";

const Statistics = () => (
	<div>
		statistics page
	</div>
)

export default Statistics;

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()

	return {
		props: {
			session
		},
	}
}
