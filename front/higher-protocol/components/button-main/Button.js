import {Button} from 'react-bootstrap';
import Link from "next/link";

const ButtonPrime = (props) => {
	return <Link href={props.path}>
			<Button variant="primary" className="action_button" onClick={props.onClick}>
				<span className="px-4">{props.children}</span>
		</Button>
	</Link>
}

export default ButtonPrime;