import React, { useState } from "react";
// import { Form, FormLabel, FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const Stage2 = () => {
  const [address, setAddress] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('clicked!!');
    alert("clicked!!");
    console.log(
      address,
      bedroom,
      bathroom,
      description
    );
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
          onChange={(e) => {
            setAddress({ address: e.target.value });
          }}
            size="small"
          required
          //   defaultValue="Default Value"
          //   helperText="Some important text"
          variant="outlined"
        />
        <TextField
          style={{ width: 500, marginBottom: 20 }}
          id="outlined-helperText"
          label="Bedroom"
          onChange={(e) => {
            setBedroom({ bedroom: e.target.value });
          }}
            size="small"
          required
          //   defaultValue="Default Value"
          //   helperText="Some important text"
          variant="outlined"
        />
        <TextField
          style={{ width: 500, marginBottom: 20 }}
          id="outlined-helperText"
          label="Bathroom"
          onChange={(e) => {
            setBathroom({ bathroom: e.target.value });
          }}
            size="small"
          required
          //   defaultValue="Default Value"
          //   helperText="Some important text"
          variant="outlined"
        />
        <TextField
          style={{ width: 500, marginBottom: 20 }}
          id="outlined-helperText"
          label="Descrition of the property (Optional)"
          onChange={(e) => {
            setDescription({ description: e.target.value });
          }}
            size="small"
          //   defaultValue="Default Value"
          //   helperText="Some important text"
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
