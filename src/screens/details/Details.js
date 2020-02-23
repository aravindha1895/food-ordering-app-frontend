import React, { Component } from 'react';
import Header from '../../common/header/Header';
import '../details/Details.css';
import Typography from '@material-ui/core/Typography';
import '../../font-awesome-4.7.0/font-awesome-4.7.0/css/font-awesome.css'
import { Divider, Card, CardContent, CardHeader } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const styles = theme => ({
    title: {
        fontWeight: 'bolder',
        fontSize: '20px'
    }
});

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurantDetails: {},
            addressDetails: {},
            categories: [],
            itemNames: []
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
            }
        });
        xhr.open("GET", "http://localhost:8080/api/restaurant/2461973c-a238-11e8-9077-720006ceb890");
        xhr.send(data);
    }
    render() {
        let location = this.state.addressDetails.locality;
        let catNames = [];
        let i = [];
        this.state.categories.map((cats, index) => (
            catNames.push(cats.category_name)
        ));
        const { classes } = this.props;
        //location = location.toUpperCase();
        return (
            <div>
                <Header></Header>
                <div className="restaurant-info">
                    <img id="rest-img" src={this.state.restaurantDetails.photo_URL} alt={this.state.restaurantDetails.restaurant_name} />
                    <div className="rest-details">
                        <Typography variant="h4" style={{ marginLeft: '100px', marginTop: '25px' }}>
                            {this.state.restaurantDetails.restaurant_name}
                        </Typography>
                        <br />
                        <Typography variant="h7" style={{ marginLeft: '100px' }}>
                            {location}
                        </Typography>
                        <br />
                        <Typography variant="h7" style={{ marginLeft: '100px' }}>
                            <span>{catNames.join(",")}</span>
                        </Typography>
                        <br />
                        <div className="parent-container">
                            <div>
                                <Typography variant="h7" style={{ marginLeft: '100px', fontWeight: 'bold' }}>
                                    <i className="fa fa-star" aria-hidden="true"></i>
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
                                <i className="fa fa-inr" aria-hidden="true"></i>
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
                <div className="menu-cart-section">
                    <div className="menu-item">
                        {this.state.categories.map((cats, index) => (
                            <span key={"categroy" + index}>{cats.category_name.toUpperCase()}
                                <Divider />
                                {cats.item_list.map(items => (
                                    <div className="item-row">
                                        {
                                            items.item_type === 'VEG' ? <i className="fa fa-circle" aria-hidden="true" style={{ color: 'green', marginRight: '15px' }}></i> :
                                                <i className="fa fa-circle" aria-hidden="true" style={{ color: 'red', marginRight: '15px' }}></i>
                                        }
                                        {
                                            i = items.item_name.split(" "),
                                            i.map((c) => (
                                                <span key={"item-" + items.item_name}>{c.charAt(0).toUpperCase() + c.slice(1) + " "}</span>
                                            ))
                                        }
                                        {
                                            <span className="item-right">
                                                <i className="fa fa-inr" aria-hidden="true"></i>
                                                <span>{" " + items.price}</span>
                                                <AddIcon style={{marginLeft: '100px'}}></AddIcon>
                                            </span>

                                        }
                                    </div>
                                ))}
                                <br />
                            </span>

                        ))}
                    </div>
                    <div className="cart">
                        <Card>
                            <CardHeader title={"My Cart"} classes={{title: classes.title}}
                                avatar = {
                                    <Badge badgeContent={0} color="primary" showZero>
                                    <ShoppingCartIcon></ShoppingCartIcon>
                                    </Badge>
                                }
                            ></CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Details);