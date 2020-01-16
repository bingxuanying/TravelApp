import React, { Component } from "react";
import "./CheckoutPage.sass";
import { CheckoutOverview } from "../TripOverview";
import { Button, IconButton, Tooltip, TextField } from "@material-ui/core";
import FooterContainer from "../Footer/FooterContainer";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

// ------------------------- State ------------------------- //
// Trip{
//  TripTitle, Date, Home,
//  Days[{
//    City{location,name ...}
//    Transport[{flightNumber,arriveTime/departTime,Date,price
//               flightCompany,duration,arriveAirport/departAirport}]
//    Hotel{name,img,location,address,rate,info,price}
//    Activity[{name,image,location,rate,price,costTime},{}]
//   ]
//  }
// --------------------------------------------------------- //
class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleEdit: false,
      title: fakeTrip.tripTitle
    };
  }
  render() {
    return (
      <div className="checkout-page">
        <div className="checkout-page-content">
          <div className="checkout-page-title">
            <div className="checkout-page-title-name">
              <div className="airbnb-font mb-0">Title</div>
              {this.state.titleEdit ? (
                <TextField
                  value={this.state.title}
                  onChange={event => {
                    const { value } = event.target;
                    this.setState({ title: value });
                  }}
                />
              ) : (
                <div className="airbnb-font mt-0">{this.state.title}</div>
              )}
            </div>
            <div className="checkout-page-title-date">
              {fakeTrip.startDate}&nbsp;-&nbsp;{fakeTrip.endDate}
            </div>
            <div className="checkout-page-title-option">
              {this.state.titleEdit ? (
                <Tooltip title="save" arrow>
                  <IconButton
                    onClick={() => {
                      this.setState({ titleEdit: false });
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip className="airbnb-bold" title="Edit Trip Name" arrow>
                  <IconButton
                    onClick={() => this.setState({ titleEdit: true })}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="checkout-page-overviews">
            {fakeTrip.days.map(function(day, index) {
              return (
                <CheckoutOverview
                  key={index}
                  day={day}
                  index={index}
                  totalDays={fakeTrip.totalDays}
                />
              );
            })}
          </div>
          <div className="checkout-page-checkout">
            <div className="checkout-page-checkout-est airbnb-bold">
              Total&nbsp;Est.&nbsp;${findTotalCost(fakeTrip)}
            </div>
            <div className="checkout-page-checkout-btn">
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </div>
          </div>
        </div>
        <div className="footer">
          <FooterContainer />
        </div>
      </div>
    );
  }
}

function findTotalCost(fakeTrip) {
  let money = 0;
  // Accumulate single days cost
  for (let i = 0; i < fakeTrip.days.length; i++) {
    const day = fakeTrip.days[i];
    // transport cost
    for (let j = 0; j < day.transports.length; j++) {
      const flight = day.transports[j];
      money += flight.price;
    }
    // hotel cost
    money += day.hotel.price;
    // activity cost
    for (let z = 0; z < day.activities.length; z++) {
      const activity = day.activities[z];
      money += activity.price;
    }
  }
  return money;
}
// function mapDaysToCity(fakeTrip) {
//   let cities = [];
//   for (let index = 0; index < fakeTrip.days.length; index++) {
//     const day = fakeTrip.days[index];
//   }
// }

const fakeTrip = {
  tripTitle: "One day in SF",
  startDate: "12/1",
  endDate: "12/2",
  home: "Davis",
  totalDays: 2,
  days: [
    {
      city: { location: { lat: 199, longt: 100 }, name: "San Fransciso" },
      transports: [
        {
          flightNumber: "UA8888",
          arriveTime: "14:00",
          departTime: "13:00",
          Date: "12/1",
          price: 188,
          flightCompany: "united airline",
          duration: "1h0m",
          arriveAirport: "SFO",
          departAirport: "SMF"
        }
      ],
      hotel: {
        name: "JW Marroit SF",
        img:
          "https://q-cf.bstatic.com/images/hotel/max1024x768/187/18727539.jpg",
        location: { lat: 1, longt: 2 },
        address: "San Francisco UnionSquare",
        rate: 5,
        info: "Luxary Hotel",
        price: 579
      },
      activities: [
        {
          name: "Fisher Mart",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/a/ae/Fishermans_Wharf_Sign%2C_SF%2C_CA%2C_jjron_25.03.2012.jpg",
          location: { lat: 1, long: 2 },
          address: "1st, San Franscico, CA ,95618",
          rate: 4.5,
          price: 100,
          costTime: "2h"
        },
        {
          name: "Union Square",
          img:
            "https://www.tripsavvy.com/thmb/fqIAjZaVUoY6GQ8sA3WBgVTksTg=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-109287627-5b66fb4f46e0fb0050fabc66.jpg",
          location: { lat: 1, long: 2 },
          address: "1st, San Franscico, CA ,95618",
          rate: 4.5,
          price: 1200,
          costTime: "2h"
        }
      ]
    },
    {
      city: { location: { lat: 199, longt: 100 }, name: "Los Angeles" },
      transports: [
        {
          flightNumber: "UA8888",
          arriveTime: "14:00",
          departTime: "13:00",
          Date: "12/1",
          price: 188,
          flightCompany: "united airline",
          duration: "1h0m",
          arriveAirport: "SFO",
          departAirport: "SMF"
        }
      ],
      hotel: {
        name: "JW Marroit SF",
        img:
          "https://q-cf.bstatic.com/images/hotel/max1024x768/187/18727539.jpg",
        location: { lat: 1, longt: 2 },
        address: "San Francisco UnionSquare",
        rate: 5,
        info: "Luxary Hotel",
        price: 579
      },
      activities: [
        {
          name: "Fisher Mart",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/a/ae/Fishermans_Wharf_Sign%2C_SF%2C_CA%2C_jjron_25.03.2012.jpg",
          location: { lat: 1, long: 2 },
          address: "1st, San Franscico, CA ,95618",
          rate: 4.5,
          price: 100,
          costTime: "2h"
        },
        {
          name: "Union Square",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/a/ae/Fishermans_Wharf_Sign%2C_SF%2C_CA%2C_jjron_25.03.2012.jpg",
          location: { lat: 1, long: 2 },
          address: "1st, San Franscico, CA ,95618",
          rate: 4.5,
          price: 1200,
          costTime: "2h"
        }
      ]
    }
  ]
};

export default CheckoutPage;