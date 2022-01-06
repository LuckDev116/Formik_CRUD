import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { createNewUser, updateOneUser, getOneUser } from "../../../services/userServices";
function AddEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
    return (
        <Formik
            initialValues={user}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .required('Required'),
                lastName: Yup.string()
                    .required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                if (!id) await createNewUser(values);
                else await updateOneUser(id, values);
                navigate('/');
            }}
        >
            {({ setFieldValue }) => {
                // eslint-disable-next-line
                useEffect(() => {
                    if (id) {
                        getOneUser(id).then(res => {
                            const resUser = res.data.user;
                            setUser(resUser);
                            setFieldValue('firstName', resUser.firstName);
                            setFieldValue('lastName', resUser.lastName);
                            setFieldValue('email', resUser.email);
                        })
                    }
                }, []);
                return (
                    <Form>
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label htmlFor="firstName">First Name</label>
                                <Field name="firstName" type="text" className="form-control valid" />
                                <ErrorMessage name="firstName" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="lastName">Last Name</label>
                                <Field name="lastName" type="text" className="form-control valid" />
                                <ErrorMessage name="lastName" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="email">Email Address</label>
                                <Field name="email" type="email" className="form-control valid" />
                                <ErrorMessage name="email" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-12">
                                <button type="submit" className="btn btn-primary" >Submit</button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export { AddEdit };