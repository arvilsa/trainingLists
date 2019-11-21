import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


export default function Addtraining(props){
    const [open, setOpen] = useState(false);
    const [training, setTraining]=useState({
        date: '',
        duration:'',
        activity:'',
        customer:''
    });

    const handleClickOpen = () => {
      console.log(props.customer)
      setTraining({

        customer: props.customer.firstname
             
    })
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
      const handleChange = (event) => {
        setTraining({...training, [event.target.name]:event.target.value }) 
        console.log(training); 
      };
  
      const addTraining =()=>{
        props.saveTraining({...training, customer: props.customer.links[0].href});
        handleClose();
      }

      return(
        <div style={{margin: 10}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add new training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add information</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                  Insert date, duration, activity and customer
                  </DialogContentText>
                    <TextField
                            type='date'
                            autoFocus
                            margin="dense"
                            name="date"
                            value= {training.date}
                            onChange = {(e)=> handleChange(e)}
                            label="date"
                            fullWidth
                    />
                    <TextField
                            margin="dense"
                            name="duration"
                            value= {training.duration}
                            onChange = {(e)=> handleChange(e)}
                            label="duration"
                            fullWidth
                    />
                    <TextField
                            margin="dense"
                            name="activity"
                            value= {training.activity}
                            onChange = {(e)=> handleChange(e)}
                            label="activity"
                            fullWidth
                    />
          
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )

}