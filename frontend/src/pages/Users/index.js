import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { List } from './components/List';
import { AddEdit } from './components/AddEdit';

function Users() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/add" element={<AddEdit />}/>
                <Route path="/edit/:id" element={<AddEdit />} />
            </Routes>
        </div>
    );
}

export { Users };