import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-60 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">
                Patient System
            </h2>

            <ul>
                <li className="mb-2 hover:text-gray-300 cursor-pointer">
                    Dashboard
                </li>
            </ul>

        </div>
    );
};

export default Sidebar;