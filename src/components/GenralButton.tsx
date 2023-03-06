import { Box, Button, Card, Stack } from '@mui/material'

interface Props {
    btnText: string;
    icon: React.ElementType;
    onClick: any

}

const GeneralButton: React.FC<Props> = ({ btnText, icon: Icon, onClick }) => {
    return (
        <Stack spacing={2} width='100%'>
            <Card variant="outlined" >
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Button variant="outlined" size="medium" onClick={onClick} sx={{ m: 1.5 }}>
                        <Icon style={{ flexShrink: 0 }} />
                        <span>{btnText}</span>
                    </Button>
                </Box>
            </Card>
        </Stack>
    )
}

export default GeneralButton