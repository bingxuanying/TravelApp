import React, { Component } from "react";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import HotelIcon from "@material-ui/icons/Hotel";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import RoomIcon from "@material-ui/icons/Room";
import { Tooltip, Fade } from "@material-ui/core";
import { connect } from "react-redux";

import "./index.sass";
class TripOverviewDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      isEditting: this.props.index === this.props.page,
      day: this.props.index,
      isChecked: this.props.index < this.props.page,
      isStart: this.props.index === 1,
      isEnd: this.props.index === this.props.plan.length - 1,
      startCity:
        this.props.index > 1
          ? this.props.plan[this.props.index - 1].city.name
          : this.props.plan[this.props.index - 1].home.name,
      endCity: this.props.plan[this.props.index].city.name,
      hotel: this.props.plan[this.props.index].hotel,
      transport: this.props.plan[this.props.index].transport,
      activities: this.props.plan[this.props.index].activities
    };
  }

  render() {
    var circleSize;
    var largeCircle;
    var backgroudColor;
    // Change Circle font-size
    if (this.state.startCity === this.state.endCity) {
      circleSize = 24;
      largeCircle = false;
    } else {
      circleSize = 40;
      largeCircle = true;
    }
    // Highlight current editting
    if (this.state.isEditting) {
      backgroudColor = "rgba(0,255,0,0.25)";
    }
    // This grap all hotel and flight
    const dayInfo = this.getInfo();
    const Circle = this.getCircle(circleSize);
    return (
      <div className="trip-overview-day" style={{ background: backgroudColor }}>
        <div className="trip-overview-day-daydisplay">Day{this.state.day}</div>
        {largeCircle ? (
          <div />
        ) : (
          <div className="trip-overview-day-space-top"></div>
        )}
        <div className="trip-overview-day-dashline">
          <div className="vertical-line"></div>
        </div>
        <div className="trip-overview-day-city">
          <div className="trip-overview-day-city-graph">
            {this.state.isStart ? (
              <div className="left-line-empty"></div>
            ) : (
              <div className="left-line" />
            )}
            <div className="trip-overview-day-city-graph-circle">{Circle}</div>
            {this.state.isEnd ? (
              <div className="right-line-empty"></div>
            ) : (
              <div className="right-line" />
            )}
          </div>
          <div className="trip-overview-day-city-text">
            {this.state.endCity}
          </div>
        </div>
        {largeCircle ? (
          <div />
        ) : (
          <div className="trip-overview-day-space-bot"></div>
        )}
        <div className="trip-overview-day-text-wrap">{dayInfo}</div>
      </div>
    );
  }
  getInfo = () => {
    return (
      <div className="trip-overview-day-text text-truncate">
        <div className="hotel mb-0">
          <HotelIcon />
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={this.MoreInfo()}
          >
            <InfoOutlinedIcon style={{ marginLeft: "42px" }} fontSize="small" />
          </Tooltip>
          {this.state.hotel.map(function(hotel, index) {
            return (
              <p className="hotel-name mb-0 pl-0 " key={index}>
                <FiberManualRecordIcon style={{ fontSize: "8" }} />
                {hotel.name}
              </p>
            );
          })}
        </div>
        <div className="transport mb-1">
          <FlightTakeoffIcon />
          {this.state.transport &&
            this.state.transport.map(function(trans, index) {
              return (
                <p className="transport-name mb-0 pl-0" key={index}>
                  <FiberManualRecordIcon style={{ fontSize: "8" }} />
                  {trans.flight}
                </p>
              );
            })}
        </div>
      </div>
    );
  };
  getCircle = circleSize => {
    if (this.state.isEditting) {
      return (
        <RotateRightIcon
          style={{
            fontSize: circleSize,
            color: "orange",
            animation: "rotation 5s infinite linear"
          }}
        />
      );
    }
    if (this.state.isChecked) {
      return (
        <CheckCircleOutlinedIcon
          style={{ fontSize: circleSize, color: "green" }}
        />
      );
    } else {
      return <RadioButtonUncheckedIcon style={{ fontSize: circleSize }} />;
    }
  };
  MoreInfo = () => {
    // Almost same as getInfo()
    return (
      <div className="more-info-text p-1">
        <div className="hotel mb-2">
          <HotelIcon />
          {this.state.hotel.map(function(hotel, index) {
            return (
              <div className="hotel-content mb-1 pl-1" key={index}>
                <p className="hotel-text mb-1 pl-0">
                  <span className="hotel-name">
                    <FiberManualRecordIcon style={{ fontSize: "8" }} />
                    {hotel.name}
                  </span>
                  <span className="hotel-price">${hotel.price}</span>
                </p>
                <p className="hotel-date mb-2">
                  &nbsp;{hotel.startDate}&nbsp;~&nbsp;{hotel.endDate}
                </p>
              </div>
            );
          })}
        </div>
        <div className="transport mb-2">
          <FlightTakeoffIcon />
          {this.state.transport &&
            this.state.transport.map(function(trans, index) {
              return (
                <div className="transport-content mb-1 pl-1">
                  <p className="transport-text mb-1 pl-0" key={index}>
                    <span className="transport-name">
                      <FiberManualRecordIcon style={{ fontSize: "8" }} />
                      {trans.flight}
                    </span>
                    <span className="transport-price">${trans.price}</span>
                  </p>
                  <p className="transport-date mb-2">
                    &nbsp;{trans.departDate}&nbsp;{trans.departTime}
                    &nbsp;~&nbsp;
                    {trans.arriveTime}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="activity mb-1">
          <RoomIcon />
          {this.state.activities.map(function(activity, index) {
            return (
              <div className="activity-content">
                <p className="activity-text mb-1 pl-0" key={index}>
                  <span className="activity-name">
                    <FiberManualRecordIcon style={{ fontSize: "8" }} />
                    {activity.name}
                  </span>
                  <span className="activity-price">${activity.price}</span>
                </p>
                <p className="activity-info mb-2">&nbsp;Time:{activity.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    page: state.step.page,
    plan: state.plan
  };
};

export default connect(mapStateToProps)(TripOverviewDay);
