import { Button, Card, Stack } from '@mui/material';
import { memo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CreatePostBtn: React.FC = () => {

    const navigate = useNavigate();

    return (
        <Stack spacing={2}>
            <Card variant="outlined" >
                <Button variant="outlined" size="medium" onClick={() => navigate('/newPost')} sx={{ gap: "0.2rem", whiteSpace: "nowrap", m: 3 }}>
                    <AiOutlinePlus style={{ flexShrink: 0 }} />
                    <span>New Post</span>
                </Button>
            </Card>
        </Stack>
    )
}
export default memo(CreatePostBtn)