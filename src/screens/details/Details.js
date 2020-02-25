import React, { Component } from 'react';
import Header from '../../common/header/Header';
import '../details/Details.css';
import Typography from '@material-ui/core/Typography';
import '../../font-awesome-4.7.0/font-awesome-4.7.0/css/font-awesome.css'
import { Divider, Card, CardContent, CardHeader, Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';

const styles = theme => ({
    title: {
        fontWeight: 'bolder',
        fontSize: '20px'
    },
    icons: {
        margin: '100px'
    }
});

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurantDetails: {},
            addressDetails: {},
            categories: [],
            itemObjArr: [],
            countArr: []
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
                that.setState({
                    categories: that.state.restaurantDetails.categories
                });
            }
        });
        xhr.open("GET", "http://localhost:8080/api/restaurant/2461973c-a238-11e8-9077-720006ceb890");
        xhr.send(data);
    }

    clickPlusHandler = (catindex, itemindex) => {
        let itemList = this.state.itemObjArr;
        let itemObj = this.state.categories[catindex].item_list[itemindex];
        let counts = this.state.countArr;

        let flag = false;
        let foundIndex;
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].item_name === itemObj.item_name) {
                console.log('found');
                foundIndex = i;
                flag = true;
                break;
            } else {
                flag = false;
            }
        }

        if (flag) {
            counts[foundIndex] = counts[foundIndex] + 1;
            this.setState({ countArr: counts });
        } else {
            itemList.push(itemObj);
            this.setState({ itemObjArr: itemList });
            counts.push(1);
            this.setState({ countArr: counts });
        }
        console.log(this.state.itemObjArr);
        console.log(this.state.countArr);
    }

    clickPlusHandlerFromCart = (itemindex) => {
        let currCountArr = this.state.countArr;
        currCountArr[itemindex] = currCountArr[itemindex] + 1;
        this.setState({ countArr: currCountArr });
    }

    clickMinusHandlerFromCart = (itemindex) => {
        let currCountArr = this.state.countArr;
        let curritemObjArr = this.state.itemObjArr;
        currCountArr[itemindex] = currCountArr[itemindex] - 1;
        if (currCountArr[itemindex] === 0) {
            currCountArr.splice(itemindex, 1);
            curritemObjArr.splice(itemindex, 1);
        }
        this.setState({ countArr: currCountArr });
    }

    render() {
        let location = this.state.addressDetails.locality;
        let catNames = [];
        let i = [];
        this.state.categories.map((cats, index) => (
            catNames.push(cats.category_name)
        ));

        let totalcount = 0;
        this.state.countArr.map(currcount => (
            totalcount = totalcount + currcount
        ));

        let totalCartValue = 0;
        this.state.itemObjArr.map((curritem, index) => (
            totalCartValue = totalCartValue + (curritem.price * this.state.countArr[index])
        ));
        console.log(totalCartValue);

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
                        {this.state.categories.map((cats, catindex) => (
                            <span key={"categroy" + catindex}>{cats.category_name.toUpperCase()}
                                <Divider />
                                {cats.item_list.map((items, itemindex) => (
                                    <div className="item-row" key={"item-row" + items.item_name + "-" + catindex + "-" + itemindex}>
                                        {
                                            items.item_type === 'VEG' ? <i key={"vegicon-" + items.item_name + "-" + catindex + "-" + itemindex} className="fa fa-circle" aria-hidden="true" style={{ color: 'green', marginRight: '15px' }}></i> :
                                                <i key={"nonvegicon-" + items.item_name + "-" + catindex + "-" + itemindex} className="fa fa-circle" aria-hidden="true" style={{ color: 'red', marginRight: '15px' }}></i>
                                        }
                                        {
                                            i = items.item_name.split(" "),
                                            i.map((c, wordindex) => (
                                                <span key={"item-" + items.item_name + "-" + catindex + "-" + itemindex + "-" + wordindex}>{c.charAt(0).toUpperCase() + c.slice(1) + " "}</span>
                                            ))
                                        }
                                        {
                                            <span className="item-right">
                                                <i className="fa fa-inr" aria-hidden="true"></i>
                                                <span>{" " + items.price.toFixed(2)}</span>
                                                <AddIcon style={{ marginLeft: '100px', cursor: 'pointer' }} onClick={() => this.clickPlusHandler(catindex, itemindex)}></AddIcon>
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
                            <CardHeader title={"My Cart"} classes={{ title: classes.title }}
                                avatar={
                                    <Badge badgeContent={totalcount} color="primary" showZero>
                                        <ShoppingCartIcon></ShoppingCartIcon>
                                    </Badge>
                                }
                            ></CardHeader>
                            {this.state.itemObjArr.map((itemobj, itemobjindex) => (
                                <CardContent key={"cartcontent-" + itemobjindex} className="card-content">
                                    <span style={{ width: '35%' }}>
                                        {
                                            itemobj.item_type === 'VEG' ? <i className="fa fa-stop-circle-o" aria-hidden="true" style={{ color: 'green', marginRight: '15px' }}></i> :
                                                <i className="fa fa-stop-circle-o" aria-hidden="true" style={{ color: 'red', marginRight: '15px' }}></i>
                                        }
                                        {
                                            i = itemobj.item_name.split(" "),
                                            i.map((c, wordindex) => (
                                                <span key={"cartitem-" + wordindex} style={{ color: 'grey' }}>{c.charAt(0).toUpperCase() + c.slice(1) + " "}</span>
                                            ))
                                        }
                                    </span>
                                    <span>
                                        <RemoveIcon fontSize='small' style={{ cursor: 'pointer' }} onClick={() => this.clickMinusHandlerFromCart(itemobjindex)} />
                                        <span style={{ fontSize: 'larger' }}>{this.state.countArr[itemobjindex]}</span>
                                        <AddIcon fontSize='small' style={{ cursor: 'pointer' }} onClick={() => this.clickPlusHandlerFromCart(itemobjindex)}></AddIcon>
                                    </span>
                                    <span style={{ color: 'grey' }}><i className="fa fa-inr" aria-hidden="true"></i>{" " + (this.state.countArr[itemobjindex] * itemobj.price)}</span>
                                </CardContent>
                            ))}
                            <CardContent>
                                <div className="total-amount">
                                    <span>TOTAL AMOUNT</span>
                                    <span>{totalCartValue.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardContent>
                                <Button variant="contained" color="primary" fullWidth='true' size='medium'>
                                    CHECKOUT
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Details);