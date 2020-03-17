import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import CreateReport from './CreateReport';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function PopperPopupState() {
  const classes = useStyles();

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {popupState => (
        <div>
          <Button variant="outlined" color="primary" {...bindToggle(popupState)}>
            Create Report
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Paper>
                  <br />
                  <CreateReport />
                  <br />
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
