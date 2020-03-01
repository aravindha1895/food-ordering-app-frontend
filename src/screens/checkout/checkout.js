import React, { Component } from 'react'
import Header from "../../common/header/Header";
import Main from './PaymentSteps/Main/main';

export class checkout extends Component {
	render() {
		console.log(this.props.baseUrl)
		return (
			<div>
				<Header baseurl={this.props.baseUrl} parentpage={"Home"} />
				<Main  baseUrl={this.props.baseUrl}/>
			</div>
		)
	}
}

export default checkout
