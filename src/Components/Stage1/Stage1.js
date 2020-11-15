import { Button } from '@material-ui/core';
import React from 'react';
import CSVReader from 'react-csv-reader';
import './Stage1.css';

const Stage1 = (props) => {
    return ( 
        <div className="text-center">
            {/* <Button
            style={{margin:20, padding:20, fontSize:15}}
            variant="contained"
            color="primary"
            >
            Upload as CSV
            </Button> */}
            <div>
               <CSVReader inputStyle={{color: 'red'}}  cssInputClass='csv-reader' onFileLoaded={(data, fileInfo) => console.log(data, fileInfo)}/> 
            </div>
             
            <Button 
            style={{margin:20, padding:20, fontSize:15}}
            variant="contained"
            color="primary"
            >
            Add from Scratch
            </Button>
        </div>
     );
}
 
export default Stage1;