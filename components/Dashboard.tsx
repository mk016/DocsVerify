'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';

interface DashboardProps {
  hashes: string[];
}

export const Dashboard: React.FC<DashboardProps> = ({ hashes }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Hash Codes</h2>
      <ul className="space-y-2">
        {hashes.map((hash, index) => (
          <li key={index} className="break-all">
            {hash}
          </li>
        ))}
      </ul>
    </Card>
  );
};