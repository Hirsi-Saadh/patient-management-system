import React, {useEffect, useState} from 'react';
import {createPatient, deletePatient, getPatients} from "../api/patientApi.js";
import Sidebar from "../components/layout/Sidebar.jsx";
import PatientForm from "../components/patient/PatientForm.jsx";
import PatientTable from "../components/patient/PatientTable.jsx";
import ConfirmationModal from "../components/layout/ConfirmationModal.jsx";
import {enqueueSnackbar} from "notistack";

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openNewPatientModal, setOpenNewPatientModal] = useState(false);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);

    const fetchPatients = async () => {
        setLoading(true);
        const res = await getPatients();
        setPatients(res.data?.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleCreate = async (data) => {
        await createPatient(data);
        await fetchPatients();
        enqueueSnackbar("Patient added", {variant: 'success'});
    };

    const openDeleteConfirmationModal = (id) => {
        setPatientToDelete(id)
        setOpenDeleteConfirmation(true);
    }

    const closeDeleteConfirmationModal = () => {
        setOpenDeleteConfirmation(false);
        setPatientToDelete(null);
    }


    const handleDelete = async (id) => {
        await deletePatient(id);
        await fetchPatients();
        setOpenDeleteConfirmation(false);
        enqueueSnackbar("Patient deleted", {variant: 'success'});
    };


    return (
        <div className="flex w-full h-full">
            <Sidebar/>

            <div className="p-6 w-full h-full overflow-y-auto">

                <PatientTable
                    data={patients}
                    onDelete={openDeleteConfirmationModal}
                    refetch={fetchPatients}
                    newPatient={() => setOpenNewPatientModal(true)}
                    loading={loading}
                />


                {openNewPatientModal && (
                    <PatientForm
                        onSubmit={handleCreate}
                        onClose={() => setOpenNewPatientModal(false)}
                    />
                )}


            </div>

            {openDeleteConfirmation && (
                <ConfirmationModal
                    isOpen={openDeleteConfirmationModal}
                    onClose={closeDeleteConfirmationModal}
                    onConfirm={() => handleDelete(patientToDelete)}
                    message="Are you sure you want to delete this patient?"
                />
            )}


        </div>
    );
};

export default Dashboard;