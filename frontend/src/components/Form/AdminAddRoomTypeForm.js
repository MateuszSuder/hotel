import React from "react";
import { TextField, Grid, Typography, Button } from "@mui/material";

const AdminAddRoomTypeForm = ({ formik }) => {
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container gap={3}>
                <Grid container item gap={2}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Nazwa pokoju"
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            name="capacity"
                            label="Pojemność pokoju"
                            value={formik.values.capacity}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.capacity &&
                                Boolean(formik.errors.capacity)
                            }
                            helperText={
                                formik.touched.capacity &&
                                formik.errors.capacity
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            name="price"
                            label="Cena pokoju"
                            value={formik.values.price}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.price &&
                                Boolean(formik.errors.price)
                            }
                            helperText={
                                formik.touched.price && formik.errors.price
                            }
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline={true}
                        rows={4}
                        name="description"
                        label="Opis pokoju"
                        value={formik.values.description}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                    />
                </Grid>
                <Grid container mt={1} spacing={3} justifyContent="flex-end">
                    <Button variant="contained" type="submit">
                        zapisz
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AdminAddRoomTypeForm;
