import { Box, Button, Stack, Typography } from "@mui/material";

const UseCasesHeading = () => {
    return (
        <Stack sx={{ m: { xs: 2, md: 5 } }} justifyContent="space-between" flexDirection="row" flexWrap="wrap">
            <Box maxWidth="md" mb={2}>
                <Typography variant="h6" fontWeight={300} color="secondary">
                    No need to start from scratch. Jump-start your workflow with a proven playbook designed for different teams. Customize it to make it yours.
                </Typography>
            </Box>
            <Button size="large" sx={{ py: 2, flexShrink: 0, alignSelf: "flex-start" }} variant="outlined">
                explore all use cases
            </Button>
        </Stack>
    );
};

export default UseCasesHeading;
