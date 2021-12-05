import React, { Fragment } from "react";
import { Tabs } from "react-simple-tabs-component";
import AddCountry from "./components/addCountry";
import Countries from "./components/countries";
import "react-simple-tabs-component/dist/index.css";
import "./App.css";

function App() {
  const tabs = [
    {
      label: "View Country Data",
      Component: Countries,
    },
    {
      label: "Add New Country",
      Component: AddCountry,
    },
  ];

  return (
    <Fragment>
      <h1 id="header">Welcome to Karvy Infotech</h1>
      <div className="tab-position">
        <Tabs tabs={tabs} />
      </div>
    </Fragment>
  );
}

export default App;
