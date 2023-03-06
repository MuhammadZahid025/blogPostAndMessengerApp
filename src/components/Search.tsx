import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { useCallback, useContext, useState } from 'react'
import { debounce } from 'lodash';
import { useGetPostsLazyQuery } from '../generated/graphql';
import { UserLoginContext } from '../context/AuthContext';
import ClearIcon from '@material-ui/icons/Clear';

const Search = () => {
    const { funcShowFilteredPosts } = useContext(UserLoginContext);
    const [searchText, setSearchText] = useState("")


    const [searchPost] = useGetPostsLazyQuery({
        onError({ message }) {
        },
        onCompleted(data) {
            funcShowFilteredPosts(data)
        }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce((value) => {
        if (value !== "") {
            searchPost({
                variables: {
                    search: value
                }
            })
        }
    }, 500), []);

    const handleChange = (event: any) => {
        const value = event.target.value;
        setSearchText(value);
        handleSearch(value);
    }

    const handleClearClick = () => {
        setSearchText("")
        funcShowFilteredPosts([])

    }

    return (
        <>
            <Box component="form">
                <TextField
                    size="small"
                    value={searchText}
                    label="Search for posts..."
                    sx={{ flexGrow: 1, maxWidth: 300 }}
                    onChange={handleChange}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {searchText && (
                                    <IconButton onClick={handleClearClick}>
                                        <ClearIcon />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </>
    )
}
export default Search