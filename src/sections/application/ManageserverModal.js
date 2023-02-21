import { Card, Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CountryPicker, FormProvider } from '../../components/hook-form';
import { UserListHead, } from '../@dashboard/user';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { manageServerStatus } from "../../redux/action/serverAction";

const ManageserverModal = ({ modal, toggle, appInfo, setSelectedServerList }) => {

    const [selectCountry, setSelectCountry] = useState('')
    const [contryWiseData, setContryWiseData] = useState([])
    const [selected, setSelected] = useState([]);


    const TABLE_HEAD = [
        { id: 'id', label: 'ID', alignRight: false },
        { id: 'name', label: 'Name', alignRight: false },
        { id: 'ipAddress', label: 'IP Address', alignRight: false },
        { id: 'username', label: 'User Name', alignRight: false },
        { id: 'password', label: 'Password', alignRight: false },
        { id: 'country', label: 'Country', alignRight: false },
        { id: 'city', label: 'City', alignRight: false }

    ];

    const NewServerSchema = Yup.object().shape({

        country: Yup.string().required('Country is required'),
    });

    const defaultValues = {

        country: '',
    };

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(NewServerSchema),
        defaultValues
    });

    const {
        handleSubmit,

    } = methods;

    const onSubmit = async (values) => {
        console.log('value::', values);

    };


    const { allServer } = useSelector((state) => state?.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectCountry) callCountryFill();

    }, [selectCountry])

    const callCountryFill = () => {
        const filterData = allServer.filter((item) => {
            return item.country.includes(selectCountry)
        });


        setContryWiseData(filterData);
    }

    const SelectedServerList = () => {
        const arr2 = selected.map((item) => {
            return allServer.find((n) => n.id === item)
        })
        dispatch(manageServerStatus({ serverIds: selected, id: appInfo.id }))
        setSelectedServerList(arr2)
        toggle()
    }



    const isUserNotFound = contryWiseData.length === 0;


    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {

            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleSelectAllClick = (event) => {

        if (event.target.checked) {
            const newSelecteds = contryWiseData.map((n) => n.id);

            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    return (

        <Modal isOpen={modal} toggle={toggle} size="xl"  >
            <ModalHeader toggle={toggle}>Server</ModalHeader>
            <ModalBody>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} sx={{ my: 2 }}>
                        <CountryPicker name="country" label="Country" onChange={(e) => setSelectCountry(e.target.value)} value={selectCountry} />
                    </Stack>
                </FormProvider>

                <Card sx={{ width: 'auto' }}>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <UserListHead
                                order={'asc'}

                                headLabel={TABLE_HEAD}
                                rowCount={contryWiseData.length}
                                numSelected={selected.length}

                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {contryWiseData.map((row) => {
                                    const { id, name, IPAddress, username, password, country, city, } = row;
                                    const isItemSelected = selected.indexOf(id) !== -1;

                                    return (
                                        <TableRow
                                            hover
                                            key={id}
                                            tabIndex={-1}
                                            role="checkbox"
                                            selected={isItemSelected}
                                            aria-checked={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                                            </TableCell>
                                            <TableCell align="left">{id}</TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {name}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">{IPAddress ? IPAddress : '--'}</TableCell>
                                            <TableCell align="left">{username}</TableCell>
                                            <TableCell align="left">{password}</TableCell>
                                            <TableCell align="left">{country}</TableCell>
                                            <TableCell align="left">{city ? city : '--'}</TableCell>

                                        </TableRow>
                                    );
                                })}

                            </TableBody>

                            {isUserNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>

                                            <Typography gutterBottom align="center" variant="subtitle1">
                                                Not found
                                            </Typography>

                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Card>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={SelectedServerList} disabled={selected.length > 0 ? false : true} >
                    SAVE
                </Button>{' '}
                <Button color="secondary" onClick={toggle} >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>

    );
};

export default ManageserverModal;