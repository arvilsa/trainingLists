import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import { CSVLink} from "react-csv";
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Addtraining from "./Addtraining"


function Traininglist(){

    const [trainings, setTrainings]= useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage]= useState('');

    useEffect(()=>{
        fetchTrainings()
        }, []
    );

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const fetchTrainings =()=> {
        fetch ('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err=> console.error(err))
            
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete training?'))
        fetch('https://customerrest.herokuapp.com/api/trainings/'+id, {method:'DELETE'})
            .then(res=> fetchTrainings())
            .then(res => setMessage('Training deleted')) 
            .then (res => setOpen(true))
            .catch(err=> console.error(err))

    }

    const saveTraining =(newTraining)=>{
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        }
        )
        .then (res => fetchTrainings())
        .catch(err=> console.error(err));

    }

    const filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === 'string') {
            return (
                row[id] !== undefined ?
                    String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
            )
        }
        else {
            return (
                String(row[filter.id]) === filter.value
            )
        }
    }

    

    const columns=[
        {
            Header:'date',
            accessor:'date',
            Cell: d => moment.utc(d.value).format('MMMM Do YYYY, h:mm:ss a')
        
        },
        {
            Header:'duration',
            accessor:'duration'
        
        },
        {
            Header:'activity',
            accessor:'activity'
        
        },
        {
            Header: 'firstname',
            accessor: 'customer.firstname',
           

        },
        {
            Header: 'lastname',
            accessor: 'customer.lastname',
           

        },
        {
            accessor: 'id',
            filterable: false,
            sortable: false,
            Cell: ({value})=> <Button size="small" color="secondary" onClick={()=>deleteTraining(value)}>Delete</Button>
            // sisään menee value(accessor), renderöi buttonin
            //kuuntelija (onClick) tarvitsee nuolifunktion ei suoraan funktiokutsua (deleteCustomer())
        }
        
    ]

    
    return(
        
        
        <div>
 
                   
        <div>
            <Grid container>

                <Grid style={{padding: 15}} item>
                    <CSVLink data={trainings}>Export data</CSVLink>
                </Grid>
            </Grid >
 
            <ReactTable filterable={true} columns={columns} data ={trainings} defaultFilterMethod={filterCaseInsensitive}/>
            
        </div>
            
        </div>
    )


}
export default Traininglist;