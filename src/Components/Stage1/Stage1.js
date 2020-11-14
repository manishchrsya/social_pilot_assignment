import { Button } from '@material-ui/core';
import React from 'react';

const Stage1 = (props) => {
    return ( 
        <div className="text-center">
            <Button
            style={{margin:20, padding:20, fontSize:15}}
            variant="contained"
            color="primary"
            >
            Upload as CSV
            </Button>
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