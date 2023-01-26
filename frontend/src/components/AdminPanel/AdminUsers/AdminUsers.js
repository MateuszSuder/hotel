import React, {useState} from 'react';
import {
    Chip,
    Grid,
    Paper, Skeleton, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import BlockIcon from '@mui/icons-material/Block';
import {useQuery} from "react-query";
import axios from "axios";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AdminUserView from "./AdminUsersView/AdminUserView";
import AdminUserAction from "./AdminUsersAction/AdminUserAction";
import theme from "../../theme/theme";

const AdminUsersIcon = ({Icon, tooltip, onClick}) => {
    return (
        <Grid item sx={{display: "flex", alignItems: "center"}} onClick={e => e.stopPropagation()}>
            <Tooltip title={tooltip}>
                <Icon onClick={onClick} />
            </Tooltip>
        </Grid>
    )
}

export const RoleChip = ({role}) => {
    switch(role) {
        case "USER":
            return (
                <Chip label="użytkownik" color="success" />
            )
        case "EMPLOYEE":
            return (
                <Chip label="pracownik" color="primary" />
            )
        case "ADMIN":
            return (
                <Chip label="administrator" color="secondary" />
            )
        default:
            return (<></>)
    }
}

const AdminUsersTableRow = ({user}) => {
    const [userId, setUserId] = useState();
    const [openUser, setOpenUser] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [action, setAction] = useState(null);

    const openUserModal = () => {
        setOpenUser(true);
    }

    /**
     * @param {"MODIFY" | "BLOCK" | "DELETE"} action
     */
    const openActionModal = (action) => {
        setUserId(user._id);
        setAction(action);
        setOpenAction(true);
    }

    const setActionModal = (val) => {
        if(!val) {
            setAction(null);
        }

        setOpenAction(val);
    }

    return (
        <>
            <TableRow hover sx={{cursor: "pointer"}} onClick={openUserModal}>
                <TableCell width="30%">
                    <Typography color={user.isDeleted ? theme.palette.error.main : theme.palette.text.primary}>
                        {user.email}
                    </Typography>
                </TableCell>
                <TableCell width="35%">
                    <Typography>
                        {user.name} {user.lastName}
                    </Typography>
                </TableCell>
                <TableCell width="15%">
                    <RoleChip role={user.role}/>
                </TableCell>
                <TableCell width="10%">
                    <Grid container alignItems="center">
                        <AdminUsersIcon Icon={ManageAccountsIcon} tooltip="Zmień rolę użytkownika" onClick={() => openActionModal("MODIFY")} />
                        <AdminUsersIcon Icon={user.isBlocked ? CheckCircleOutlineOutlinedIcon : BlockIcon} tooltip={user.isBlocked ? "Odblokuj użytkownika" : "Zablokuj użytkownika"} onClick={() => openActionModal("BLOCK")}/>
                        <AdminUsersIcon Icon={NoAccountsIcon} tooltip="Usuń użytkownika" onClick={() => openActionModal("DELETE")}/>
                    </Grid>
                </TableCell>
            </TableRow>
            <AdminUserView open={openUser} setOpen={setOpenUser} user={user}/>
            {
                action && (
                    <AdminUserAction user={user} action={action} open={openAction} setOpen={setActionModal}/>
                )
            }
        </>
    )
}

const AdminUsers = () => {
    const { data, isLoading, error } = useQuery('users', () => axios.get('/api/user'));

    if(isLoading)
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
            </Stack>
        )

    if (error) {
        return (
            <Grid maxWidth="xl">
                <Typography align="center" variant="h5" color={theme.palette.error.main}>
                    Wystąpił błąd
                </Typography>
            </Grid>
        )
    }

    const users = data.data.users;

    return (
        <Grid maxWidth="xl">
            <TableContainer component={Paper}>
                <Table aria-label="Użytkownicy">
                    <TableBody>
                        {users.map(user => (
                            <AdminUsersTableRow key={user._id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default AdminUsers;