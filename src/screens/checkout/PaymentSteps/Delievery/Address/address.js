import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, grey } from '@material-ui/core/colors';

import './address.css';
import Typography from '@material-ui/core/Typography';


export class Address extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addresses: [],
			defaultAddress: true
		}
		this.handleDefaultAddress = this.handleDefaultAddress.bind(this);
	}

	componentDidMount() {
		fetch(`${this.props.baseUrl}/address/customer`, {
			method: 'GET',
			headers: {
				'authorization': sessionStorage.getItem("access-token"), 
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			this.setState({
				addresses: res.addresses
			})
		});
	}

	handleDefaultAddress(addressId) {
		this.setState({
			defaultAddressId: addressId
		})
		this.props.setDeliveryAddress(addressId)
		this.props.handleSteps(true);
	}

	render() {
		const { addresses } = this.state;
 		return (
			<div className={`root`}>
      <GridList className={`gridList`} cols={2.5}>
        {addresses && addresses.length > 0 && addresses.map(address => {
					const defaultAddress = address.id === this.state.defaultAddressId;
					return (
					<GridListTile key={address.id} className={defaultAddress ? "grid-main default" : "grid-main"}
					 onClick={this.handleDefaultAddress.bind(this, address.id)}>
						<div className="address-main">
							<Typography style={{marginBottom: '5px'}}>{address.flat_building_name}</Typography>
							<Typography style={{marginBottom: '5px'}}>{address.locality}</Typography>
							<Typography style={{marginBottom: '5px'}}>{address.city}</Typography>
							<Typography style={{marginBottom: '5px'}}>{address.state.state_name}</Typography>
							<Typography style={{marginBottom: '5px'}}>{address.pincode}</Typography>
						</div>
						<IconButton className="icon">						
							<CheckCircleIcon style={defaultAddress ? { color: green[500] } : {color: grey[500]}}/>
						</IconButton>
          </GridListTile>
        )})}
				{!addresses && <Typography style={{width: '100%', color: "#ccc"}}>There are no saved addresses! 
				You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.</Typography>}
      </GridList>
    </div>
		)
	}
}

export default Address
