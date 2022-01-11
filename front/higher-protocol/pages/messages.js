import {getSession} from "next-auth/react";
import {returnToSignin} from "../utilities/utilities";

const Messages = () => (
	<div>
		messages page
	</div>
)

export default Messages;

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()

	return {
		props: {
			session
		},
	}
}
