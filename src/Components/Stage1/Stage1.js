import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import './Stage1.css';

const Stage1 = (props) => {

    // const [csvData, setCsvData] = useState('')

    const {setActiveStep, setCsvData} = props;

    const onClickButton =()=>{
        setActiveStep(1)
    }

    const fileUploadHandler=(data)=>{
        setCsvData(data)
        onClickButton()
    }


    return ( 
        
        <div className="text-center">
            
            <Button
            style={{margin:20, padding:20, fontSize:15}}
            variant="contained"
            color="primary"
            >
            <CSVReader label='Import from CSV file     ' inputStyle={{color:'red'}} accept='.csv' onFileLoaded={fileUploadHandler}/> 
            </Button>
            <Button 
            style={{margin:20, padding:20, fontSize:15}}
            variant="contained"
            color="primary"
            onClick={()=>{onClickButton()}}
            >
            Add from Scratch
            </Button>
        </div>
     );
}
 
export default Stage1;