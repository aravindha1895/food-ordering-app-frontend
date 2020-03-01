import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import './payment-mode.css';

export default class PaymentMode extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			paymentMethods: [],
			selectedPaymentMode: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props.handleSteps(false)
		this.getModeOfPayments();
	}

	getModeOfPayments() {
		fetch(`${this.props.baseUrl}/payment`)
		.then(res => res.json())
		.then(res => {
			this.setState({
				paymentMethods: res.paymentMethods
			})
		})
	}

	handleChange(event) {
		this.setState({
			selectedPaymentMode: event.target.value
		})
		this.props.setPaymentMethod(event.target.value)
		this.props.handleSteps(true)
	}

	render() {
		const { paymentMethods } = this.state;
		return (
			<form>
				<FormControl component="fieldset" >
					<FormLabel component="legend">Select Mode of Payment</FormLabel>
					<RadioGroup aria-label="paymentMode" name="paymentMode" onChange={this.handleChange}>
						{paymentMethods.length > 0 && paymentMethods.map((paymentMethod, index) => {
							return (
								<FormControlLabel key={index} value={paymentMethod.id} control={<Radio />} label={paymentMethod.payment_name} />
							)
						})}
					</RadioGroup>
				</FormControl>
			</form>
		);
	}
}
