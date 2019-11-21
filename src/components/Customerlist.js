import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import { CSVLink} from "react-csv";
import Grid from '@material-ui/core/Grid';
import Editcustomer from "./Editcustomer";
import Addcustomer from "./Addcustomer"
import Addtraining from "./Addtraining";

function Customerlist(){

    const [customers, setCustomers]= useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage]= useState('');
    // snackbarin viestiä varten

    
    //asiakaslistan haku renderöitäessä
    useEffect(()=>{
        fetchCustomers()
        }, []
    );

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    const fetchCustomers =()=> {
        fetch ('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err=> console.error(err))
            
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?'))
        fetch(link, {method:'DELETE'})
            .then(res=> fetchCustomers())
            .then(res => setMessage('customer deleted')) 
            .then (res => setOpen(true))
            .catch(err=> console.error(err))

    }

    const saveCustomer =(newCustomer)=>{
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        }
        )
        .then (res => fetchCustomers())
        .catch(err=> console.error(err));



    }

    const updateCustomer=(customer, link)=>{
        fetch(link, {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res=> fetchCustomers())
        .then(res => setMessage('changes saved')) 
        .then(res=> setOpen(true))
        .catch(err=>console.error(err))
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
            Header:'firstname',
            accessor:'firstname'
        
        },
        {
            Header:'lastname',
            accessor:'lastname'
        
        },
        {
            Header:'Streetaddress',
            accessor:'streetaddress'
        
        },
        {
            Header:'postcode',
            accessor:'postcode'
        
        },
        {
            Header:'city',
            accessor:'city'
        
        },
        {
            Header:'email',
            accessor:'email'
        
        },
        {
            Header:'phone',
            accessor:'phone'
        
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row=> <Addtraining  saveTraining = {saveTraining} customer={row.original}/>
       
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row => <Editcustomer updateCustomer = {updateCustomer} customer={row.original} />

        },
        {
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            Cell: ({value})=> <Button size="small" color="secondary" onClick={()=>deleteCustomer(value)}>Delete</Button>
            // sisään menee value/row etc, renderöi buttonin
            //kuuntelija (onClick) tarvitsee nuolifunktion ei suoraan funktiokutsua (deleteCustomer())
        }

            
        
    ]

    
    return(   
        
        <div>
            <Grid container>
                <Grid item>
                    <Addcustomer saveCustomer={saveCustomer}/>
                </Grid>
                <Grid style={{padding: 15}} item>
                    <CSVLink data={customers}>Export data</CSVLink>
                </Grid>
            </Grid >
 
            <ReactTable filterable={true} columns={columns} data ={customers} defaultFilterMethod={filterCaseInsensitive}/>
            
        </div>
    )


}
export default Customerlist;