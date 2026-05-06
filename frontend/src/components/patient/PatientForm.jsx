import React, {useState} from 'react';
import {enqueueSnackbar} from 'notistack'

const PatientForm = ({onSubmit, onClose}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        email: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        enqueueSnackbar("Patient added", {variant: 'success'});
        setFormData({
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            phoneNumber: '',
            email: '',
        });

        onSubmit(formData);
        onClose();
    }


    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="w-full justify-between items-center mb-1 flex">
                    <h2 className="text-lg font-semibold mb-4">
                        Add Patient
                    </h2>

                    <button
                        onClick={onClose}
                        className="btn bg-red-600 text-cyan-50 hover:bg-red-700 px-3 py-1 rounded"
                    >
                        X
                    </button>

                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">

                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border p-2 rounded"
                        type="email"
                        required
                    />

                    <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="border p-2 rounded"
                    />

                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="border p-2 rounded col-span-3"
                    />

                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="border p-2 rounded"
                    />

                    <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="border p-2 rounded"
                    />

                    <input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Zip Code"
                        className="border p-2 rounded"
                    />

                    <div className="col-span-3 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                        >
                            Add Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientForm;