import { useNavigate } from 'react-router-dom';
// @mui
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, InputAdornment, IconButton } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import { FormProvider, RHFTextField } from '../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

const AddNewServer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const NewServerSchema = Yup.object().shape({
        username: Yup.string().required('No Name provided.'),
        password: Yup.string().required('Password is required'),
        country: Yup.string().required('Country is required'),
        cPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('No Name provided.')
    });

    const defaultValues = {
        username: '',
        password: '',
        cPassword: '',
        country: '',
        config_udp: '',
        config_tcp: ''
    };

    const methods = useForm({
        resolver: yupResolver(NewServerSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (values) => {
        console.log('value::', values);

    };


    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    New  VPN Server
                </Typography>

            </Stack>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="username" label="User Name" />
                    <RHFTextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <RHFTextField
                        name="cPassword"
                        label="Confirm Password"
                        type={showCPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowCPassword(!showCPassword)}>
                                        <Iconify icon={showCPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <RHFTextField name="country" label="Country" />
                    <RHFTextField name="config_udp" label="Config UDP" multiline rows={3} />
                    <RHFTextField name="config_tcp" label="Config TCP" multiline rows={3} />
                </Stack>

                <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                    submit
                </LoadingButton>
            </FormProvider>

        </Container>
    );
};



export default AddNewServer;