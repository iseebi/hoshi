import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import TopPageContainer from './pages/TopPageContainer';
import NotFoundPageContainer from './pages/NotFoundPageContainer';

const Router: React.FC = () => (
  <Suspense fallback={<div>loading</div>}>
    <Routes>
      <Route path="/" element={<TopPageContainer />} />
      <Route path="*" element={<NotFoundPageContainer />} />
    </Routes>
  </Suspense>
);

export default Router;
