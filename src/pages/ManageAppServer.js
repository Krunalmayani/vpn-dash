
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container, Typography, Stack, Button } from '@mui/material';

import { FormProvider, RHFTextField } from '../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ManageserverModal from '../sections/application/ManageserverModal';
import ShowServerOnApp from '../sections/application/ShowServerOnApp';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServer } from '../redux/action/serverAction';
import { getAppAllServer } from '../redux/action/appAction';

const ManageAppServer = () => {
    const [modal, setModal] = useState(false);
    const [selectedServerList, setSelectedServerList] = useState([]);

    const toggle = () => setModal(!modal);
    const { state } = useLocation();

    const LoginSchema = Yup.object().shape({});

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

    const dispatch = useDispatch()

    useEffect(() => {
        callAPI();
    }, [])

    const callAPI = () => {

        dispatch(getAllServer())
        dispatch(getAppAllServer({ id: state.id }))

    }


    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Manage App Server
                </Typography>

            </Stack>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ my: 2 }}>
                    <RHFTextField name="name" label=" Name" disabled />
                    <RHFTextField name="packageId" label="Package Id" disabled />
                    <RHFTextField name="account" label="Account" disabled />
                    <RHFTextField name="status" label="Status" disabled />


                </Stack>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >

                    <Button size="large" variant="contained" onClick={toggle}>
                        Manage Server
                    </Button>
                </div>

                <br />

                <ShowServerOnApp appInfo={state} serverList={selectedServerList} />

                <br />


                <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                    submit
                </LoadingButton>
            </FormProvider>
            <ManageserverModal appInfo={state} toggle={toggle} modal={modal} setSelectedServerList={setSelectedServerList} />
        </Container>
    );
};

export default ManageAppServer;