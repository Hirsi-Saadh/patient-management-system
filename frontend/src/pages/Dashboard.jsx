import React, {useEffect, useState} from 'react';
import {createPatient, deletePatient, getPatients} from "../api/patientApi.js";
import Sidebar from "../components/layout/Sidebar.jsx";
import PatientForm from "../components/patient/PatientForm.jsx";
import PatientTable from "../components/patient/PatientTable.jsx";

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openNewPatientModal, setOpenNewPatientModal] = useState(false);

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
    };


    const handleDelete = async (id) => {
        await deletePatient(id);
        await fetchPatients();
    };


    return (
        <div className="flex w-full h-full">
            <Sidebar/>

            <div className="p-6 w-full h-full overflow-y-auto">
                {loading ? (
                    <div>Loading...</div>
                ) : patients.length === 0 ? (
                    <div>No patients found.</div>
                ) : (
                    <PatientTable
                        data={patients}
                        onDelete={handleDelete}
                        refetch={fetchPatients}
                        newPatient={()=>setOpenNewPatientModal(true)}
                    />
                )}

                {openNewPatientModal && (
                    <PatientForm
                        onSubmit={handleCreate}
                        onClose={() => setOpenNewPatientModal(false)}
                    />
                )}


            </div>


        </div>
    );
};

export default Dashboard;