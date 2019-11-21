import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcustomer(props){
    const [open, setOpen] = useState(false);
    const [customer, setCustomer]=useState({
        firstname: '',
        lastname:'',
        streetaddress:'',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
      const handleChange = (event) => {
        setCustomer({...customer, [event.target.name]:event.target.value }) 
        console.log(customer); 
      };
  
      const addCustomer =()=>{
        props.saveCustomer(customer);
        handleClose();
      }

      return(
        <div style={{margin: 10}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add new customer
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add information</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                  Insert firstname, lastname, streetaddress, postcode, city, email and phone
                  </DialogContentText>
                    <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value= {customer.firstname}
                            onChange = {(e)=> handleChange(e)}
                            label="firstname"
                            fullWidth
                    />
                    <TextField
                            margin="dense"
                            name="lastname"
                            value= {customer.lastname}
                            onChange = {(e)=> handleChange(e)}
                            label="lastname"
                            fullWidth
                    />
                    <TextField
                            margin="dense"
                            name="streetaddress"
                            value= {customer.streetaddress}
                            onChange = {(e)=> handleChange(e)}
                            label="streetaddress"
                            fullWidth
                    />
                    <TextField
                            margin="dense"
                            name="postcode"
                            value= {customer.postcode}
                            onChange = {(e)=> handleChange(e)}
                            label="postcode"
                            fullWidth
                    />
                        <TextField
                            margin="dense"
                            name="city"
                            value= {customer.city}
                            onChange = {(e)=> handleChange(e)}
                            label="city"
                            fullWidth
                    />
                    <TextField
                            margin="dense"
                            name="email"
                            value= {customer.email}
                            onChange = {(e)=> handleChange(e)}
                            label="email"
                            fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value= {customer.phone}
                        onChange = {(e)=> handleChange(e)}
                        label="phone"
                        fullWidth
                    />
                </DialogContent>
              <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCustomer} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

        </div>
    )

}