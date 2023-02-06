import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container, Typography, Stack } from '@mui/material';
// hooks
import { FormProvider, RHFTextField } from '../components/hook-form';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const AddNewApp = () => {


    const LoginSchema = Yup.object().shape({
        name: Yup.string().required('No Name provided.'),
        packageId: Yup.string().required('Package Id is required'),
        account: Yup.string().required('Account is required'),
        status: Yup.string().required('Status is required'),
    });

    const defaultValues = {
        name: '',
        packageId: '',
        account: '',
        status: '',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (values) => {

    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    New Application
                </Typography>

            </Stack>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="name" label=" Name" />
                    <RHFTextField name="packageId" label="Package Id" />
                    <RHFTextField name="account" label="Account" />
                    <RHFTextField name="status" label="Status" />

                </Stack>

                <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                    submit
                </LoadingButton>
            </FormProvider>

        </Container>
    );
};

export default AddNewApp;