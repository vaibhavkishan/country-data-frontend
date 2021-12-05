import axios from "axios";
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCountry } from "../countries/countrySlice";

const AddCountry = () => {
  const country = useSelector((state) => state.country);
  const dispatch = useDispatch();

  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "Oceania",
    "South America",
  ];

  const [name, setName] = useState("");
  const [continent, setContinent] = useState("");
  const [rank, setRank] = useState(0);
  const [flag, setFlag] = useState(null);
  const [showList, setShowList] = useState(false);

  const newCountry = {
    name: name.name,
    continent: continent.continent,
    rank: rank.rank,
    flag: `images/${flag ? flag.flag.name : ""}`,
  };

  const handleName = (e) => {
    setName({
      name: e.target.value,
    });
  };

  const handleContinent = (e) => {
    setContinent({
      continent: e.target.value,
    });
  };

  const handleRank = (e) => {
    setRank({
      rank: parseInt(e.target.value),
    });
  };

  const handleFlag = (e) => {
    setFlag({
      flag: e.target.files[0],
    });
  };

  const formData = new FormData();
  formData.append("name", name.name);
  formData.append("continent", continent.continent);
  formData.append("rank", rank.rank);
  if (flag) formData.append("flag", flag.flag, flag.flag.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !rank || !continent || !flag) {
      alert("All fields are required!");
      return;
    }

    dispatch(addCountry(newCountry));
    console.log(country.countries);

    var result = await axios.post("http://localhost:8080/country", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    result ? setShowList(true) : setShowList(false);
  };

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            minLength="3"
            maxLength="20"
            onChange={handleName}
          />
        </label>
        <br />
        <label>
          Continent:
          <select
            defaultValue={continent.continent}
            name="continent"
            onChange={handleContinent}
          >
            <option value="">Select a continent</option>

            {continents.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Rank:
          <input type="number" name="rank" max="200" onChange={handleRank} />
        </label>
        <br />
        <label>
          Flag:
          <input
            type="file"
            name="flag"
            accept=".jpg,.png"
            onChange={handleFlag}
          />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button type="reset">Reset</button>
      </form>

      {showList && (
        <Fragment>
          <h3>List of Countries:</h3>
          <div className="scrollit">
            <table>
              <tbody>
                <tr>
                  {country.countries.map((c, i) => (
                    <td key={i}>{c.name}</td>
                  ))}
                </tr>
                <tr>
                  {country.countries.map((c, i) => (
                    <td key={i}>
                      <img
                        src={`http://localhost:8080/${
                          c.flag || newCountry.flag
                        }`}
                        alt=""
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default AddCountry;
