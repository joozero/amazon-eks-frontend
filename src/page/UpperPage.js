import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent, CardActions } from '@material-ui/core';
import { GridList } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  cardRoot: {
    maxWidth: 275,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  }
}));

function UpperPage() {
    const classes = useStyles();
    const [ data, setState ] = useState({outcome:[]})
    
    const url = '{backend-ingress ADDRESS}/services/all'
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          url,
        );
        setState(result.data);
      };
      
      fetchData();
    }, []);
  
    
    return (
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={2}>
          {data.outcome.map( item => (
          <div>
            <Card className={classes.cardRoot}>        
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.name} 
                </Typography>
                <Typography variant="body2" component="p">
                  <img 
                    style={{ display: 'block', margin: '0px auto' }}
                    src={item.url}
                    height='120'
                    alt={item.name}
                  />
                  <br/>
                  {item.value}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={item.link}>
                  <Button size="small"> See More </Button>
                </a>
              </CardActions>
            </Card>
          </div>
          ))}
        </GridList>
      </div>
    )
}

export default UpperPage;