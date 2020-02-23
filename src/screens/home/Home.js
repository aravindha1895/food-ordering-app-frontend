import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";

import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from '@material-ui/core/CardMedia';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
// import { green } from '@material-ui/core/colors';
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

class Home extends Component {
  currentIndex = 0;
  constructor() {
    super();
    this.state = {
      restaurantDetails: [],
      accessToken: sessionStorage.getItem("access-token")
    };
  }
  componentWillMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let context = this;
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        const restDetails = JSON.parse(this.responseText).restaurants;
        context.setState({ restaurantDetails: restDetails });
        console.log(context.state.restaurantDetails);
      }
    });
    xhr.open("GET", this.props.baseUrl + "/restaurant");
    xhr.send(data);
  }
  onSearchTextChangedHandler = (e) => {
      console.log('Function invoked');
  }
  onRestaurantClicked = (restaurantId) => {
        console.log(restaurantId);
  }
  render() {
    // let index=0;
    return (
      <div>
        <Header baseUrl={this.props.baseUrl} onSearchTextChanged={this.onSearchTextChangedHandler} parentPage="home" />
        <div className="listFlex">
          {this.state.restaurantDetails.map((restaurant, index) => (
            <div className="flexTile" key={restaurant.id} style={{ cursor: 'pointer'}}>
              <Card onClick={() => this.onRestaurantClicked(restaurant.id)}>
                <CardMedia style={{ width: "400px", height: "200px" }} title={restaurant.restaurant_name} image={restaurant.photo_URL}>
                  <img src={restaurant.photo_URL} alt={restaurant.restaurant_name} className="restaurantImage" />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5">{restaurant.restaurant_name}</Typography>
                  <br />
                  <div className="restaurantCategories">
                    {restaurant.categories.split().map((category, i) => (
                      <Typography variant="inline">
                        <small key={index + "category" + i}>{category},</small>
                      </Typography>
                    ))}
                  </div>
                  <br />
                  <div className="restaurantDetail">
                    <div className="restaurantRatingSection">
                      <i class="fa fa-star-o" aria-hidden="true"></i>
                      &nbsp;&nbsp;{restaurant.customer_rating}&nbsp;&nbsp; ({restaurant.number_customers_rated})
                    </div>
                    <div style={{ float: "right" }}>{restaurant.average_price} for two</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
