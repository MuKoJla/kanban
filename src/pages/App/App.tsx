import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';

import { Board } from '../Board';
import { Task } from '../Task';
import { PageNotFound } from '../PageNotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="task/:taskId" element={<Task />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  </BrowserRouter>
);

export { App };
