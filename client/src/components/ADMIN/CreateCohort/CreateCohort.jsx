import React, { Component } from "react";
import ReactDom from "react-dom";
import "./CreateCohort.css";
class CreateCohort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  addNewDataToDataBase(content) {
    fetch("http://localhost:3000/CohortCreation", {
      method: "post",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      data.json();
    });
    // ReactDOM.unmountComponentAtNode(document.getElementById("app"));
    // ReactDOM.render(<App />, document.getElementById("app"));
  }
  componentDidMount() {
    fetch("http://localhost:3000/CohortData")
      .then((res) => res.json())
      .then((data) => this.setState({ data }))
      //   .then(() => console.log(this.state.data))
      .catch((err) => console.log(err));
  }
  submitNewCohortNumber() {
    const { data } = this.state;
    var number = document.getElementById("CreateCohortInput").value;
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].cohortNumber, newCohortNumber);
      if (data[i].cohortNumber == number) {
        alert("you need to enter a different cohort number!!");
      }
    }
    // console.log(!isNaN(Number(data)));
    if (number === "" || !isNaN(Number(number)) !== true) {
      alert("you  need to  insert a number !!");
    } else {
      let obj = { cohortNumber: number };
      this.addNewDataToDataBase(obj);
      document.getElementById("CreateCohortInput").value = "";
    }
  }
  render() {
    return (
      <div id="outerDiv">
        <div id="createCohortDiv">
          <input id="CreateCohortInput" placeholder="Cohort Number"></input>
          <br />
          <button onClick={this.submitNewCohortNumber.bind(this)}>
            Create
          </button>
        </div>
      </div>
    );
  }
}
export default CreateCohort;
