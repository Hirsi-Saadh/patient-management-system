import React, {useState} from 'react';
import {updatePatient} from '../../api/patientApi';

const EDITABLE_COLUMNS = [
    {key: 'firstName', label: 'First Name'},
    {key: 'lastName', label: 'Last Name'},
    {key: 'address', label: 'Address'},
    {key: 'city', label: 'City'},
    {key: 'state', label: 'State'},
    {key: 'zipCode', label: 'Zip Code'},
    {key: 'phoneNumber', label: 'Phone'},
    {key: 'email', label: 'Email'},
];

const PatientTable = ({data = [], onDelete, refetch, newPatient}) => {
    const [sortKey, setSortKey] = useState('id');
    const [sortDir, setSortDir] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const PER_PAGE = 10;

    const handleSort = (key) => {
        if (sortKey === key) setSortDir(d => d * -1);
        else {
            setSortKey(key);
            setSortDir(1);
        }
        setPage(1);
    };

    const filtered = data.filter(row =>
        `${row.firstName} ${row.lastName} ${row.email} ${row.phoneNumber}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        return (typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))) * sortDir;
    });

    const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
    const slice = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const start = sorted.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
    const end = Math.min(page * PER_PAGE, sorted.length);

    const startEdit = (row) => {
        setEditingId(row.id);
        setEditForm({
            firstName: row.firstName,
            lastName: row.lastName,
            address: row.address,
            city: row.city,
            state: row.state,
            zipCode: row.zipCode,
            phoneNumber: row.phoneNumber,
            email: row.email,
        });
        setError(null);
    };
    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
        setError(null);
    };

    const handleFieldChange = (key, value) => {
        setEditForm(prev => ({...prev, [key]: value}));
    };

    const saveEdit = async (id) => {
        setSaving(true);
        setError(null);
        try {
            await updatePatient(id, editForm);  // PUT /patient/{id}
            setEditingId(null);
            setEditForm({});
            refetch();
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const SortIcon = ({col}) => (
        <span className="ml-1 text-xs opacity-50">
            {sortKey === col ? (sortDir === 1 ? '▲' : '▼') : '⇅'}
        </span>
    );


    const Th = ({col, label, width = ''}) => (
        <th
            onClick={() => handleSort(col)}
            className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 cursor-pointer select-none hover:bg-gray-100 transition-colors ${width}`}
        >
            {label}
            <SortIcon col={col}/>
        </th>
    );

    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1)
        .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
        .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
            acc.push(p);
            return acc;
        }, []);

    return (
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">

            <div
                className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-800">Patient List</h2>
                    <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full">
                        {filtered.length} records
                    </span>
                </div>
                <div className="justify-between sm:gap-2 flex items-center gap-3 w-full sm:w-auto">
                    <div>
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                        />
                    </div>
                    <div>
                        <button
                            className="btn bg-green-600 hover:bg-green-900 text-white py-1 px-2 font-semibold btn-sm hover:cursor-pointer rounded-lg"
                            onClick={newPatient}>
                            + New Patient
                        </button>

                    </div>


                </div>
            </div>

            {error && (
                <div
                    className="px-5 py-2.5 bg-red-50 border-b border-red-100 text-xs text-red-600 flex items-center justify-between">
                    <span>⚠ {error}</span>
                    <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-600">✕</button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                    <tr className="border-b border-gray-100">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 w-16">ID</th>
                        <Th col="firstName" label="First Name"/>
                        <Th col="lastName" label="Last Name"/>
                        <Th col="address" label="Address"/>
                        <Th col="city" label="City"/>
                        <Th col="state" label="State"/>
                        <Th col="zipCode" label="Zip Code"/>
                        <Th col="phoneNumber" label="Phone"/>
                        <Th col="email" label="email"/>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 w-44">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                    {slice.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-4 py-12 text-center text-gray-400 text-sm">
                                No patients found.
                            </td>
                        </tr>
                    ) : slice.map((row, i) => {
                        const isEditing = editingId === row.id;
                        return (
                            <tr
                                key={row.id}
                                className={`transition-colors ${
                                    isEditing
                                        ? 'bg-blue-50/60'
                                        : i % 2 === 0
                                            ? 'bg-white hover:bg-blue-50/30'
                                            : 'bg-gray-50/50 hover:bg-blue-50/30'
                                }`}
                            >
                                {/* ID — never editable */}
                                <td className="px-4 py-2.5 text-xs text-gray-400 font-mono">#{row.id}</td>

                                {/* Editable fields */}
                                {EDITABLE_COLUMNS.map(({key}) => (
                                    <td key={key} className="px-4 py-2.5">
                                        {isEditing ? (
                                            <input
                                                type={key === 'email' ? 'email' : 'text'}
                                                value={editForm[key] ?? ''}
                                                onChange={e => handleFieldChange(key, e.target.value)}
                                                className="w-full text-sm border border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                                                disabled={saving}
                                            />
                                        ) : (
                                            <span className={
                                                key === 'firstName' ? 'font-medium text-gray-900' :
                                                    key === 'email' ? 'text-blue-600' :
                                                        key === 'phoneNumber' ? 'text-gray-500' :
                                                            'text-gray-700'
                                            }>
                                                    {row[key]}
                                                </span>
                                        )}
                                    </td>
                                ))}

                                {/* Action buttons */}
                                <td className="px-4 py-2.5">
                                    {isEditing ? (
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => saveEdit(row.id)}
                                                disabled={saving}
                                                className="text-xs px-2.5 py-1 rounded-md border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50 font-medium"
                                            >
                                                {saving ? 'Saving…' : '✓ Save'}
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                disabled={saving}
                                                className="text-xs px-2.5 py-1 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                            >
                                                ✕ Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => startEdit(row)}
                                                className="text-xs px-2.5 py-1 rounded-md border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete?.(row.id)}
                                                className="text-xs px-2.5 py-1 rounded-md border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div
                className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500">
                <span>
                    {sorted.length === 0
                        ? 'No records'
                        : `Showing ${start}–${end} of ${sorted.length} patients`}
                </span>
                <div className="flex items-center gap-1">
                    <button onClick={() => setPage(1)} disabled={page === 1}
                            className="px-2 py-1 rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-100 transition-colors">«
                    </button>
                    <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                            className="px-2 py-1 rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-100 transition-colors">‹
                    </button>

                    {pageNumbers.map((p, idx) =>
                        p === '...' ? (
                            <span key={`e-${idx}`} className="px-1 text-gray-400">…</span>
                        ) : (
                            <button key={p} onClick={() => setPage(p)}
                                    className={`px-2.5 py-1 rounded border transition-colors ${
                                        page === p
                                            ? 'border-blue-300 bg-blue-50 text-blue-600 font-semibold'
                                            : 'border-gray-200 bg-white hover:bg-gray-100'
                                    }`}>
                                {p}
                            </button>
                        )
                    )}

                    <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}
                            className="px-2 py-1 rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-100 transition-colors">›
                    </button>
                    <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
                            className="px-2 py-1 rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-100 transition-colors">»
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientTable;