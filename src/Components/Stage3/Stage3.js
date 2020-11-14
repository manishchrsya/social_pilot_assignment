
import React, { useState } from "react";
import { DropzoneArea } from "@devloops/material-ui-dropzone";




const Stage3 = () => {
  const [image, setImage] = useState([]);

  const onChangeHandler=(data)=>{
      console.log('data',data);
  }


  
  return (
    <div>
      <DropzoneArea limit={4} onChange={onChangeHandler} bannerText='Select the images' preview={true}/>
    </div>

  )
};

export default Stage3;
