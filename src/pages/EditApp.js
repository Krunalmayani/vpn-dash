import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { styled } from '@mui/material/styles';
import { Container, Typography, Stack } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import { FormProvider, RHFTextField } from '../components/hook-form';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const EditAppInfo = () => {

    const { state } = useLocation()
    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');
    const token = localStorage.getItem('token')
    const navigate = useNavigate();


    const LoginSchema = Yup.object().shape({
        yourname: Yup.string().required('No Name provided.'),
        walletAddress: Yup.string().required('No Wallet Address provided.').min(42, 'Wallet address should be 42 chars !').max(42, 'Wallet address inccorect !')
    });

    const defaultValues = {
        name: state.name,
        packageId: state.packageId,
        account: state.account,
        status: state.status
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
                    Edit Application
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
export default EditAppInfo;