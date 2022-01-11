import {getSession} from "next-auth/react";
import {returnToSignin} from "../../utilities/utilities";
import {useState} from "react";
import Image from "next/image";

const JobId = () => {
	const [picture, setPicture] = useState("/img_candidates.jpg")

	return (<div>
		<Image src={picture} layout="responsive" width={1535} height={940}
		       onClick={() => setPicture("/img_assessment.jpg")}/>
	</div>)
}

export default JobId;

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (!session) return returnToSignin()

	return {
		props: {
			session
		},
	}
}
