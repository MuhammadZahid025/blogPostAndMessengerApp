import { Fragment } from 'react';
import { useParams } from 'react-router-dom'
import CreateComment from '../components/CreateComment';
import ShowComment from '../components/ShowComment';
import SinglePostCard from '../components/SinglePostCard';
import { useFindPostByIdQuery } from '../generated/graphql'

const ViewPost = () => {
    const { id } = useParams()
    const { data, refetch } = useFindPostByIdQuery({
        variables: {
            id: parseInt(id!)
        },

    });

    return (
        <>
            {
                data?.findPostById?.post &&
                <SinglePostCard
                    id={data?.findPostById.post?.id}
                    userName={data?.findPostById.post?.user.name}
                    createdAt={data?.findPostById.post?.createdAt}
                    title={data?.findPostById.post?.title}
                    text={data?.findPostById.post?.text}
                    numberOfComments={data?.findPostById.post?.comments?.length!}
                />
            }
            <CreateComment
                postId={data?.findPostById?.post?.id!}
                refetch={refetch}
                name="comment"
            />
            {
                data?.findPostById?.post?.comments?.length! > 0 &&
                data?.findPostById?.post?.comments?.map((comment, index) => {
                    return (
                        <Fragment key={index}>
                            <ShowComment
                                name={comment.user.name}
                                createdAt={comment.createdAt}
                                text={comment.text}
                                refetch={refetch}
                                postId={data?.findPostById.post?.id!}
                                parentId={comment.id}
                                replyCount={comment?.replyCount!}
                            />
                        </Fragment>
                    )
                })
            }
        </>
    )
}
export default ViewPost