import React from 'react';
import { RealmMap } from '../components/realms/RealmMap';

export const RealmsPage: React.FC = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <RealmMap />
    </div>
  );
};
