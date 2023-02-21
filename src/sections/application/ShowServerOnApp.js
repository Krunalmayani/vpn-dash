import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../components/Iconify';
import { deleteManageServer } from '../../redux/action/serverAction';
import { UserListHead } from '../@dashboard/user';


const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'ipAddress', label: 'IP Address', alignRight: false },
    { id: 'username', label: 'User Name', alignRight: false },
    { id: 'password', label: 'Password', alignRight: false },
    { id: 'country', label: 'Country', alignRight: false },
    { id: 'city', label: 'City', alignRight: false },

];

const ShowServerOnApp = ({ appInfo, serverList }) => {

    const [selectedServerList, setSelectedServerList] = useState(serverList);

    const dispatch = useDispatch();
    const { appServer } = useSelector((state) => state.application);
    useEffect(() => {
        setSelectedServerList(appServer || []);

    }, [appServer])

    const DeleteServerRecord = (row) => {
        dispatch(deleteManageServer({ id: appInfo.id, serverID: row.id }))

    }


    return (
        <>

            {selectedServerList.length !== 0 &&
                <TableContainer sx={{ minWidth: 800, }}>
                    <Table sx={{ borderWidth: 10, borderBlock: 12 }}>
                        <UserListHead
                            order={'asc'}

                            headLabel={TABLE_HEAD}
                            rowCount={serverList.length}
                            // numSelected={selected.length}
                            isCheckBox={false}
                        // onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                            {selectedServerList.map((row) => {
                                const { id, name, IPAddress, username, password, country, city, } = row;
                                // const isItemSelected = selected.indexOf(id) !== -1;

                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                        role="checkbox"

                                    >
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
                                        <TableCell align="left">
                                            <IconButton onClick={() => DeleteServerRecord(row)}>
                                                <Iconify icon="eva:trash-2-fill" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    );
};

export default ShowServerOnApp;