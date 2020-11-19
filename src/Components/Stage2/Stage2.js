import React, { useEffect, useState } from "react";
// import { Form, FormLabel, FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const Stage2 = (props) => {
  const [address, setAddress] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const { setActiveStep, csvData,setFormData } = props;

  useEffect(() => {
    if (csvData) {
      let data = csvData[0];
      setAddress(data[0]);
      setBedroom(data[1]);
      setBathroom(data[2]);
      setDescription(data[3]);
    } else {
      setAddress("");
      setBedroom("");
      setBathroom("");
      setDescription("");
      getLocation();
    }
    
  }, []);
  useEffect(() => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=AIzaSyCmbjYzue6gtnR6xDiDT7cOEyz9kCjCcZs`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let address = data.results[0].formatted_address;
        setAddress(address);
      })
      .catch((err) => console.log(err));
  }, [lat, lng]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        console.log("data", data);
        setLat(data.coords.latitude);
        setLng(data.coords.longitude);
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('clicked!!');
    // alert("clicked!!");
    console.log(address, bedroom, bathroom, description);
    setActiveStep(2);
    setFormData({
      address: address,
      bedroom: bedroom,
      bathroom: bathroom,
      description: description
    })

  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          style={{ width: 500, marginBottom: 20 }}
          variant="outlined"
          id="outlined-helperText"
          label="Address"
          type='text'
          onChange={(e) => {
            setAddress(e.target.value );
          }}
          value={address}
          size="small"
          required
          variant="outlined"
        />
        <TextField
          style={{ width: 500, marginBottom: 20 }}
          id="outlined-helperText"
          label="Bedroom"
          type='number'
          onChange={(e) => {
            setBedroom( e.target.value );
          }}
          value={bedroom}
          size="small"
          required
          variant="outlined"
        />
        <TextField
          style={{ width: 500, marginBottom: 20 }}
          id="outlined-helperText"
          label="Bathroom"
          type='number'
          onChange={(e) => {
            setBathroom(e.target.value );
          }}
          value={bathroom}
          size="small"
          required
          variant="outlined"
        />
        <TextField
          style={{ width: 500, marginBottom: 20 }}
          id="outlined-helperText"
          label="Descrition of the property (Optional)"
          onChange={(e) => {
            setDescription( e.target.value );
          }}
          type='text'
          value={description}
          size="small"
          variant="outlined"
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: 40, padding: 12, fontSize: 15 }}
      >
        Submit
      </Button>
    </form>
  );
};

export default Stage2;
