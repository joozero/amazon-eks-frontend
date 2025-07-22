import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';

function UpperPage() {
  const [data, setData] = useState({ outcome: [] });

  const url = '{backend-ingress ADDRESS}/services/all';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(url);
        setData(result.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setData({ outcome: [] });
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      }}
    >
      <ImageList
        cols={7}
        gap={2}
        rowHeight={300}
        sx={{
          flexWrap: 'nowrap',
          transform: 'translateZ(0)', // 가속 렌더링 트릭
          width: '100%',
        }}
      >
        {data.outcome.map((item, index) => (
          <ImageListItem key={index}>
            <Card sx={{ maxWidth: 275, m: 1 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" component="p" sx={{ textAlign: 'center' }}>
                  <img
                    src={item.url}
                    alt={item.name}
                    height={120}
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                  <br />
                  {item.value}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Button size="small">See More</Button>
                </a>
              </CardActions>
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default UpperPage;
