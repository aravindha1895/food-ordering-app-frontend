import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import './new-address.css';

export default class NewAddress extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			states: [],
			stateValue: "",
			show: false,
			value:'',
			char :'',
			flatNo: '',
			locality: '',
			city:'',
			pinCode: '',
			pinErrorMessage: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.getStates = this.getStates.bind(this);
		this.handleSaveBtn = this.handleSaveBtn.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this)
	}

	handleSaveBtn() {
		if (this.state.pinCode) {
			if (this.state.pinCode.length !== 6) {
				this.setState({
					pinErrorMessage: "Pincode must only contain numbers and must be 6 digits long."
				})
			}
		}
		this.setState({
			show: true
		})
		const { baseUrl } = this.props;
		const newAddress = {
			city: this.state.city,
			flat_building_name: this.state.flatNo,
			locality: this.state.locality,
			pincode: this.state.pinCode,
			state_uuid: this.state.stateValue
		}
		let canSubmit = true;
		Object.keys(newAddress).forEach(key => {
			if (!newAddress[key]) {
				canSubmit = false
			}
		})

		if (!canSubmit) return;


		fetch(`${baseUrl}/address`, {
			method: 'POST',
			headers: {
				'authorization': sessionStorage.getItem("access-token"), 
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newAddress)
		})
	}

	componentDidMount() {
		this.getStates(this.props.baseUrl);
	}

	handleChange(event) {
		this.setState({
			stateValue: event.target.value
		})
	}
	handleValueChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	getStates(baseUrl) {
		fetch(`${baseUrl}/states`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => {
			this.setState({
				states: res.states
			})
		})
	} 



	render() {
		const {stateValue, city, locality,flatNo, show, drpdwn, pinCode, states, value, pinErrorMessage} = this.state;
		return (
			<form className="root-main" onnoValidate autoComplete="off">

			<FormControl>
        <InputLabel htmlFor="flatNumber">Flat/Building flatNumber</InputLabel>
        <Input
          id="flatNumber"
          value={flatNo}
          onChange={this.handleValueChange}
					aria-describedby="error"
					name="flatNo"
        />
        {(show && !flatNo) && <FormHelperText id="error">required</FormHelperText>}
      </FormControl>
			<FormControl>
        <InputLabel htmlFor="locality">Locality</InputLabel>
        <Input
          id="locality"
          value={locality}
          onChange={this.handleValueChange}
					aria-describedby="error"
					name="locality"
        />
        {(show && !locality) && <FormHelperText id="error" className="field">required</FormHelperText>}
      </FormControl>
			<FormControl>
        <InputLabel htmlFor="city">City</InputLabel>
        <Input
          id="city"
          value={city}
          onChange={this.handleValueChange}
					aria-describedby="error"
					name="city"
        />
        {(show && !city) && <FormHelperText id="error">required</FormHelperText>}
      </FormControl>

			<FormControl>
        <InputLabel id="label">State</InputLabel>
					<Select
						labelId="label"
						id="select"
						value={stateValue}
						onChange={this.handleChange}>  
					{states.length > 0 && states.map((state, index) => 
			<MenuItem value={state.id} name={state.state_name} key={index}>{state.state_name}</MenuItem>)}
					</Select>
					{(show && !stateValue) && <FormHelperText id="error">required</FormHelperText>}
      </FormControl>
			<FormControl>
        <InputLabel htmlFor="pinCode">Pin code</InputLabel>
        <Input
          id="pinCode"
          value={pinCode}
          onChange={this.handleValueChange}
					aria-describedby="pinCode"
					name="pinCode"
        />
        {((show && !pinCode) || pinErrorMessage)  && <FormHelperText id="error">{pinErrorMessage ? pinErrorMessage : 'required'}</FormHelperText>}
      </FormControl>
				<Button variant="contained" color="secondary" className="action-btn" onClick={this.handleSaveBtn}>
					Save Address
				</Button>
			</form>
		);
	}
}