import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ComparisonTableProps {
  headers: string[];
  rows: {
    label: string;
    values: (string | ReactNode)[];
    highlight?: boolean;
  }[];
  className?: string;
}

export const ComparisonTable = ({ headers, rows, className }: ComparisonTableProps) => {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-border', className)}>
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="min-w-[200px]">Criteria</th>
            {headers.map((header, index) => (
              <th key={index} className="min-w-[180px]">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={cn(row.highlight && 'bg-secondary/10')}
            >
              <td className="font-medium text-foreground">{row.label}</td>
              {row.values.map((value, colIndex) => (
                <td key={colIndex} className="text-muted-foreground">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
