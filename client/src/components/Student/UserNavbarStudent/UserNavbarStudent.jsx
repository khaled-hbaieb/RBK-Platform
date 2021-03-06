import React from "react";
import "../../HIR/UserNavbarHIR/UserNavbarHIR.css";
import $ from "jquery";
import CohortButtonStudent from "../CohortButtonStudent/CohortButtonStudent.jsx";
import ChatRoomButton from "../../ADMIN/ChatRoomButton/ChatRoomButton.jsx";
import ProfileButtonStudent from "../ProfileButtonStudent/ProfileButtonStudent.jsx";
import LogoutButton from "../../LogoutButton/LogoutButton.jsx";
import axios from "axios";
import PinBoardButtonStudent from "../PinBoardButton/PinBoardButton.jsx";
class UserNavbarStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: true,
      data: [],
      current: {},
    };
  }
  async componentWillMount() {
    let data = await axios.post("/GetUser", {
      fullName: localStorage.fullName,
    });
    this.setState({ current: data.data });
  }
  showNav() {
    $("#container").animate({ left: "0" }, 1000);
    $("#arrow").css("transform", "rotate(180deg)");
  }
  hideNav() {
    if (this.state.hover === true) {
      $("#container").animate({ left: "-350px" }, 1000);
      $("#arrow").css("transform", "");
    }
  }
  fixNav() {
    if (this.state.hover === true) {
      this.setState({ hover: false });
      $("#container").css("left", 0);
    } else {
      this.setState({ hover: true });
    }
  }
  render() {
    return (
      <div>
        <div
          id="container"
          onMouseEnter={this.showNav.bind(this)}
          onMouseLeave={this.hideNav.bind(this)}
        >
          <div id="arrowbox">
            <center>
              <img
                onClick={this.fixNav.bind(this)}
                id="arrow"
                src="./arr2.png"
              ></img>
            </center>
          </div>
          <center>
            <img src="./rbk2.png" id="rbkLogo" />
          </center>
          <div id="buttonsBox">
            <CohortButtonStudent />
            <ChatRoomButton />
            <ProfileButtonStudent profile={this.state.current} />
            <PinBoardButtonStudent />
            <LogoutButton />
          </div>
        </div>
        <div id="interface"></div>
      </div>
    );
  }
}
export default UserNavbarStudent;
