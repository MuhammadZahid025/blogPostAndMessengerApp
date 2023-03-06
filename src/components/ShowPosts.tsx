import { Box, Pagination } from '@mui/material';
import { useFindAllPostsQuery } from '../generated/graphql';
import SinglePostCard from './SinglePostCard';
import { useContext, useState } from 'react';
import { UserLoginContext } from '../context/AuthContext';

const ShowPosts = () => {
    const { funcShowPosts, showPosts, filteredPosts } = useContext(UserLoginContext);
    const [currentPage, setCurrentPage] = useState(1);
    const POST_PER_PAGE = 5

    const { data } = useFindAllPostsQuery({
        variables: {
            paginationInput: {
                skip: (currentPage - 1) * POST_PER_PAGE,
                take: POST_PER_PAGE
            }
        },
        onCompleted: (data) => {
            funcShowPosts(data.findAllPosts);
        }
        // fetchPolicy: "network-only"
    });

    const handlePageChange = (event: any, newPage: any) => {
        setCurrentPage(newPage)

    }
    const { getPosts } = filteredPosts;
    return (
        <>
            {
                (!!getPosts?.length) ? getPosts.map((filteredPost: { id: number; name: string; createdAt: string; title: string; text: string; }) => {
                    return (<SinglePostCard
                        key={filteredPost.id}
                        id={filteredPost.id}
                        userName={filteredPost.name}
                        createdAt={filteredPost.createdAt}
                        title={filteredPost.title}
                        text={filteredPost.text}
                    />)
                }) :
                    !!showPosts?.items?.length && showPosts.items.map((post: { id: number; user: { name: string; }; createdAt: string; title: string; text: string; comments: string | any[]; }) => {
                        return (
                            <SinglePostCard
                                key={post.id}
                                id={post.id}
                                userName={post.user.name}
                                createdAt={post.createdAt}
                                title={post.title}
                                text={post.text}
                                numberOfComments={post.comments?.length!} />
                        )
                    })
            }
            <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
                {(!!getPosts?.length) ? "" : <Pagination
                    count={Math.ceil(showPosts?.total! / POST_PER_PAGE)}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                />}
            </Box>
        </>
    )
}
export default ShowPosts