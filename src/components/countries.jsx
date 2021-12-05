import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeState } from "../countries/countrySlice";

const Countries = () => {
  const country = useSelector((state) => state.country);
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");
  const [countryData, setCountryData] = useState({});

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    setCountryData(
      country.countries.filter((c) => c.name === e.target.value)[0]
    );
  };

  useEffect(() => {
    fetch("http://localhost:8080/countriesAll")
      .then((response) => response.json())
      .then((data) => dispatch(initializeState(data.countries)));
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <select defaultValue={selectedValue} onChange={handleChange}>
        <option value="">Select a country</option>

        {country.countries.map((c) => (
          <option key={c.rank} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="content">
        {selectedValue && (
          <div className="box">
            <span>
              {"Name: "}
              <b>{countryData.name}</b>
            </span>
            <br />
            <span>
              {"Rank: "}
              <b>{countryData.rank}</b>
            </span>
            <br />
            <span>
              {`Flag: `}
              <br />
              <br />
              <img src={`http://localhost:8080/${countryData.flag}`} alt="" />
            </span>
            <br />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Countries;
