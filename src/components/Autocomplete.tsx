import * as React from 'react';
import './autocomplete.css'
import { Typography, Divider, InputBase, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { useAutoComplete } from './useAutoComplete';
import { ResponseData } from '../api/constants';

export const AutoComplete = () => {
    const { suggestions, handleChange, searchInputRef, handleKeyDown, loading, searchedValue, selectedSuggestions, handleClick, activeSuggestion } = useAutoComplete()

    if (loading) {
        <h1>Loading...</h1>
    }


    return (
        <React.Fragment>
            <InputBase
                id="Search-input"
                sx={{ border: '1px solid black', py: 1.2, px: 1, width: '100%' }}
                inputProps={{ 'aria-label': 'search-input' }}
                placeholder="Search Countries"
                value={searchedValue}
                onChange={handleChange}
                inputRef={searchInputRef}
                onKeyDown={handleKeyDown}

            />
            <Divider />
            {!suggestions.length}
            {!!suggestions.length &&
                <Paper sx={{ width: '100%' }}>
                    <List>
                        {suggestions.map((suggestion: ResponseData, index: number) => (
                            <ListItemButton onClick={() => handleClick(suggestion.name)} key={suggestion.name} className={index === activeSuggestion - 1 ? "activeSelected" : ""}>
                                <ListItemIcon>
                                    <img src={suggestion.flags} alt={suggestion.name.substring(0, 6)} width={20} height={20} />
                                </ListItemIcon>
                                <ListItemText>{suggestion.name}</ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>
            }
            <Typography variant='h5'>{selectedSuggestions}</Typography>
        </React.Fragment>
    );
};
