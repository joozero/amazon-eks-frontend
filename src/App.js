import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UpperPage from './page/UpperPage';
import axios from 'axios';

import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Box } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';

function App(props) {
  const [data, setData] = useState({ outcome: [] });
  const [query, setQuery] = useState('eks');
  const [search, setSearch] = useState('eks');
  const [error, setError] = useState(null);

  const url = `{backend-ingress ADDRESS}/contents/${search}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(url);
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err);
        setData({ outcome: [] });
      }
    }
    fetchData();
  }, [search]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <AppBar position="static" sx={{ backgroundColor: '#2E3B55' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <CloudIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            EKS DEMO Blog
          </Typography>
          {new Date().toLocaleTimeString()}
        </Toolbar>
      </AppBar>

      <Box sx={{ my: 2 }}>
        <UpperPage setError={setError} />
      </Box>

      <Box
        component="form"
        sx={{ '& > *': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(query.trim());
        }}
      >
        <TextField
          id="standard-basic"
          label="Enter your keyword to search"
          variant="standard"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          Error loading content: {error.message}
        </Typography>
      )}

      <ul>
        {data.outcome.map((item) => (
          <li key={item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            <br />
          </li>
        ))}
      </ul>
    </Box>
  );
}

App.propTypes = {
  sections: PropTypes.array,
};

export default App;
