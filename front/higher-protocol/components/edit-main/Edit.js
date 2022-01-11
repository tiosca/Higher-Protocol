const EditPrime = (props) => (
	<div className="edit-input">
		{!props.hideLabel && (
			<span>
        <label htmlFor="login" className="helper-text">{props.title}</label>
        <input type={props.type} className="form-control shadow-none" id="login"
               placeholder={props.placeholder} value={props.value}/>
      </span>
		)}
		{props.hideLabel &&
			<input type={props.type} className="form-control shadow-none" id="login" placeholder={props.placeholder} value={props.value}/>}
	</div>)


export default EditPrime;