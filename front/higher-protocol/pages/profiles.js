import {getSession} from "next-auth/react";
import {returnToSignin} from "../utilities/utilities";

const Profiles = () => (
	<div>
		profiles page
	</div>
)

export default Profiles;

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()

	return {
		props: {
			session
		},
	}
}
