
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography, Stack, InputAdornment, IconButton } from '@mui/material';

import { CountryPicker, FormProvider, RHFTextField } from '../components/hook-form';
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

const EditServerInfo = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const EditServerSchema = Yup.object().shape({
        name: Yup.string().required('No Name provided.'),
        username: Yup.string().required('No User Name provided.'),
        password: Yup.string().required('Password is required'),
        country: Yup.string().required('Country is required'),
        city: Yup.string().required('City is required'),
        IPAddress: Yup.string().required('IP Address is required'),
        cPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
    });

    const defaultValues = {
        email: 'data.email',
        yourname: 'data.yourname',
        walletAddress: 'data.walletaddress',
        coin: 'data.coin',
        life: 'data.creditlife'
    };

    const methods = useForm({
        resolver: yupResolver(EditServerSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (values) => {
        console.log('values :', values);
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Edit VPN Server
                </Typography>
            </Stack>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="name" label="Name" />
                    <RHFTextField name="IPAddress" label="IP Address" />
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

                    <CountryPicker name="country" label="Country" />
                    <RHFTextField name="city" label="City" />
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


export default EditServerInfo;