import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Resizer from "react-image-file-resizer";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

const Stage3 = (props) => {
  const [imgData, setImageData] = useState([]);
  const [imgLocalPath, setImgLocalPath] = useState([]);
  const [featuredImage, setFeaturedImage] = useState([]);

  const { formData } = props;
  const imageArrayDataForLocal = imgLocalPath;
  const imageArrayData = imgData;

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleImageUpload = async (e) => {
    if (imageArrayData.length < 4) {
      let uploadImage = e.target.files[0];
      console.log('e.target.files',e.target.files);
      const myData = await resizeFile(uploadImage);
      // let uploadLocalImage = e.target.value;
      imageArrayDataForLocal.push(uploadImage.webkitRelativePath);
      setImgLocalPath(imageArrayDataForLocal);
      imageArrayData.push(myData);
      setImageData(imageArrayData);
      // console.log("changesdimage data", imgData);
    } else {
      alert("You have already selected the Maximum numbers of images!!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      image1: imgData[0],
      image2: imgData[1],
      imgage3: imgData[2],
      image4: imgData[3],
      featuredImage: featuredImage,
    };

    // console.log('imgData', imgData);

    console.log("formData", data);
  };

  const checkBoxHandler = (e, index) => {
    const check = e.target.checked;
    if (check) {
      setFeaturedImage(imgData[index]);
    }
  };
  console.log("manish2", imgData);
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            style={{ width: 500, marginBottom: 20 }}
            variant="outlined"
            id="outlined-helperText"
            type="file"
            onChange={handleImageUpload}
            size="small"
            required
            variant="outlined"
          />
          {console.log('manish1',imgLocalPath)}
        </div>
        <div style={{ display: "flex", marginLeft: 100, marginRight: 100 }}>
          {imgLocalPath.length > 0
            ? imgLocalPath.map((data, index) => {
                console.log("manish", data);
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      padding: 20,
                      marginLeft: 50,
                      marginRight: 50,
                    }}
                  >
                    <div>
                      <img
                        style={{ width: 100, height: 100 }}
                        alt="image"
                        src={data}
                      ></img>
                      <Checkbox
                        defaultChecked={false}
                        color="primary"
                        onChange={(e) => {
                          checkBoxHandler(e, index);
                        }}
                      />
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <Button
        // disabled={imgData.length===4 ? false : true}
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

export default Stage3;
