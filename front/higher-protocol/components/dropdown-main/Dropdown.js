import {Form} from 'react-bootstrap';

const DropdownPrime = (props) => (
	<div className="edit-input">
		<Form.Select required defaultValue="default">
			<option disabled value="default" hidden className="gray-text">{props.placeholder}</option>
			{props.values && props.values.map((value, index) =>
				<option value={value} key={index}>{value}</option>
			)}
		</Form.Select>
	</div>
)


export default DropdownPrime;