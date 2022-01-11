import {getSession} from "next-auth/react";
import {returnToSignin} from "../utilities/utilities";
import Image from 'next/image'

const Assessments = () => (
	<div>
		<Image src="/img_assessment.jpg" layout="responsive" width={1535} height={940}/>
	</div>
)

export default Assessments;

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()

	return {
		props: {
			session
		},
	}
}
