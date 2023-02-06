import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment';

// material
import {
    Card,
    Table,
    Stack,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,

} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { getAllServer } from '../redux/action/authAction'
// mock
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'username', label: 'User Name', alignRight: false },
    { id: 'password', label: 'Password', alignRight: false },
    { id: 'country', label: 'Country', alignRight: false },
    { id: 'config_udp', label: 'Config UDP', alignRight: false },
    { id: 'config_tcp', label: 'Config TCP', alignRight: false },
    { id: 'action', label: 'Action', alignRight: true },
    // { id: 'action' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
const ServerList = () => {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('id');

    const [filterName, setFilterName] = useState('');



    const [configData, setConfigData] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();


    const dispatch = useDispatch()
    const { allServer } = useSelector((state) => state?.user);

    useEffect(() => {
        callAPI();
    }, [])

    const callAPI = () => {

        dispatch(getAllServer())
    }

    const handleRequestSort = (event, property) => {

        // const isAsc = orderBy === property && order === 'asc';
        // setOrder(isAsc ? 'desc' : 'asc');
        // setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = allServer.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => setFilterName(event.target.value);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allServer.length) : 0;

    // const filteredUsers = applySortFilter(allServer, getComparator(order, orderBy), filterName);
    const filteredUsers = allServer;

    const isUserNotFound = filteredUsers.length === 0;

    return (
        <Page title="Server">
            <Container style={{ maxWidth: '1400px' }} >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        VPN Server
                    </Typography>
                    <Button variant="contained" onClick={() => navigate('/dashboard/server/newServer')} to="#" startIcon={<Iconify icon="eva:plus-fill" />}  >
                        New Server
                    </Button>
                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    // orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={allServer.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, username, password, country, config_udp, config_tcp, updated_date, avatarUrl, created_date } = row;
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
                                                            {username}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{password}</TableCell>
                                                <TableCell align="left">{country}</TableCell>
                                                <TableCell align="left">{config_udp ? <Button variant="contained" onClick={() => { handleOpen(); setConfigData({ title: 'Config UDP', body: config_udp || '' }) }}>Config UDP</Button> : '--'}</TableCell>
                                                <TableCell align="left">{config_tcp ? <Button variant="contained" onClick={() => { handleOpen(); setConfigData({ title: 'Config TCP', body: config_tcp || '' }) }}>Config TCP</Button> : '--'}</TableCell>
                                                <TableCell align="right">
                                                    <UserMoreMenu onPressEditRow={() => navigate('/dashboard/server/editServer')} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={allServer.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
                <Modal isOpen={open} toggle={handleClose} size="lg" >
                    <ModalHeader toggle={handleClose} >{configData?.title || ''}</ModalHeader>

                    <ModalBody>
                        {configData?.body || ''}
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </Page>
    );
};

const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    justifyContent: 'center'

};

export default ServerList;