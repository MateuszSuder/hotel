import React from 'react';
import {Grid, Typography} from "@mui/material";
import ColorAvatar from "../../../ColorAvatar";
import AdminUserReservations from "./AdminUserReservation";
import CustomModal from "../../../CustomModal";
import {RoleChip} from "../AdminUsers";

const AdminUserView = ({open, setOpen, user}) => {
    if (!user) return (
        <></>
    )

    return (
        <CustomModal open={open} setOpen={setOpen} customStyle={{width: "60vw"}}>
            <Grid container alignItems="center" flexDirection="column" gap={1}>
                <Grid item>
                    <ColorAvatar text={`${user.name} ${user.lastName}`}/>
                </Grid>
                <Grid item mb={1}>
                    <RoleChip role={user.role}/>
                </Grid>
                <Typography variant="h5">
                    {user.name} {user.lastName}
                </Typography>
                <Typography>
                    {user.email}
                </Typography>
                <AdminUserReservations userId={user._id}/>
            </Grid>
        </CustomModal>
    );
};

export default AdminUserView;