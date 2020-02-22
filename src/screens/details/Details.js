import React, { Component } from 'react';
import Header from '../../common/header/Header';
import '../details/Details.css';
import Typography from '@material-ui/core/Typography';
import '../../font-awesome-4.7.0/font-awesome-4.7.0/css/font-awesome.css'
class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurantDetails: {},
            addressDetails: {},
            categories: [],
            categoryNames: []
        }
    }
    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    restaurantDetails: JSON.parse(this.responseText)
                });
                that.setState({
                    addressDetails: that.state.restaurantDetails.address
                });
                let location = that.state.addressDetails.locality;
                location = location.toUpperCase();
                that.state.addressDetails.locality = location;
                let addDetails = that.state.addressDetails;
                that.setState({ addressDetails: addDetails });
                console.log(that.state.addressDetails.locality);
                that.setState({
                    categories: that.state.restaurantDetails.categories
                });
                let catnames = [];
                that.state.categories.map((cats, index) => (
                    catnames.push(cats.category_name)
                ));
                catnames = catnames.sort();
                that.setState({ categoryNames: catnames });
            }
        });
        xhr.open("GET", "http://localhost:8080/api/restaurant/2461973c-a238-11e8-9077-720006ceb890");
        xhr.send(data);
    }
    render() {
        let location = this.state.addressDetails.locality;

        //location = location.toUpperCase();
        return (
            <div>
                <Header></Header>
                <div className="restaurant-info">
                    <img id="rest-img" src={this.state.restaurantDetails.photo_URL} alt={this.state.restaurantDetails.restaurant_name} />
                    <div class="rest-details">
                        <Typography variant="h4" style={{ marginLeft: '100px', marginTop: '25px' }}>
                            {this.state.restaurantDetails.restaurant_name}
                        </Typography>
                        <br />
                        <Typography variant="h7" style={{ marginLeft: '100px' }}>
                            {location}
                        </Typography>
                        <br />
                        <Typography variant="h7" style={{ marginLeft: '100px' }}>
                            {this.state.categoryNames.join(',')}
                        </Typography>
                        <br />
                        <div className="parent-container">
                            <div>
                                <Typography variant="h7" style={{ marginLeft: '100px', fontWeight: 'bold' }}>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    {" " + this.state.restaurantDetails.customer_rating}
                                </Typography>
                                <Typography style={{ marginLeft: '100px' }} color="textSecondary">
                                    {"AVERAGE RATING BY"}
                                </Typography>
                                <Typography style={{ marginLeft: '100px' }} color="textSecondary">
                                    <span style={{ fontWeight: 'bold' }}>{this.state.restaurantDetails.number_customers_rated}</span>
                                    {" CUSTOMERS"}
                                </Typography>
                            </div>
                            <div>
                                <i class="fa fa-inr" aria-hidden="true"></i>
                                {" " + this.state.restaurantDetails.average_price}
                                <Typography color="textSecondary">
                                    <span>{"AVERAGE COST FOR"}</span>
                                    <br />
                                    <span>{"TWO PEOPLE"}</span>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu-item"></div>
            </div>
        );
    }
}

export default Details;