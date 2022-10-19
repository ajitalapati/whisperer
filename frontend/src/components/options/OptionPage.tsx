import React, {useContext} from 'react'
import { Grid } from '@mui/material'
import Option from './Option'
import { OptionProps } from './Option';
import Typography from '@mui/material/Typography';
import { constants } from "../../constants"
import { UserContext } from '../../App';

const people: OptionProps[] = constants.peopleOptions;

export default function OptionPage() {
  const user = useContext(UserContext)
  return (
    <>
        <Grid container direction="column" alignItems="left" justifyContent="right" spacing={4}>
          <Grid item xs={2}>
            <Typography component="h2" variant="h2" align="center" color="textPrimary">
              Who do you want to talk to today?
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid container
              spacing={0.5} 
              direction="row"
              alignItems="left"
              justifyContent="center"
              style={{ minHeight: '100vh', width:"70%", margin:"auto" }}
              >
              {people.map((x: OptionProps) => {
                  return (
                    <Grid item xs={12} sm={4}>
                      <Option
                        name={x.name}
                        imgURL={x.imgURL}
                        description={x.description}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
    </>
  )
}