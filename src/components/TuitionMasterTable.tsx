import { useMemo, useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  scholarshipCategoryStyles,
  tuitionTableCopy,
  type TuitionRow,
} from '@/data/fees-module';

interface TuitionMasterTableProps {
  rows: TuitionRow[];
  formatCurrency: (amount: number) => string;
}

type SortKey = 'faculty' | 'tuitionFees' | 'educationalSupportServices' | 'administrative' | 'categoryC' | 'categoryB' | 'categoryA' | 'categoryAStar';

export const TuitionMasterTable = ({ rows, formatCurrency }: TuitionMasterTableProps) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('faculty');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        !query ||
        `${row.faculty}`.toLowerCase().includes(query);
      return matchesSearch;
    });
  }, [rows, search]);

  const sortedRows = useMemo(() => {
    const direction = sortDirection === 'asc' ? 1 : -1;

    return [...filteredRows].sort((a, b) => {
      const getValue = (row: TuitionRow) => {
        switch (sortKey) {
          case 'faculty':
            return row.faculty.toLowerCase();
          case 'tuitionFees':
            return row.tuitionFees;
          case 'educationalSupportServices':
            return row.educationalSupportServices;
          case 'administrative':
            return row.administrative;
          case 'categoryC':
            return row.categoryC;
          case 'categoryB':
            return row.categoryB;
          case 'categoryA':
            return row.categoryA;
          case 'categoryAStar':
            return row.categoryAStar;
          default:
            return 0;
        }
      };

      const valueA = getValue(a);
      const valueB = getValue(b);

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * direction;
      }

      return (Number(valueA) - Number(valueB)) * direction;
    });
  }, [filteredRows, sortDirection, sortKey]);

  const renderThresholdLines = (row: TuitionRow) => (
    <div className="space-y-2 text-xs">
      <p><span className="font-semibold">Thanaweya:</span> B {row.thresholdBands.thanaweya.B}% | A {row.thresholdBands.thanaweya.A}% | A* {row.thresholdBands.thanaweya.AStar}%</p>
      <p><span className="font-semibold">Al-Azhar:</span> B {row.thresholdBands.alAzhar.B}% | A {row.thresholdBands.alAzhar.A}% | A* {row.thresholdBands.alAzhar.AStar}%</p>
      <p><span className="font-semibold">STEM:</span> B {row.thresholdBands.stem.B}% | A {row.thresholdBands.stem.A}% | A* {row.thresholdBands.stem.AStar}%</p>
      <p><span className="font-semibold">Nile:</span> B {row.thresholdBands.nile.B}% | A {row.thresholdBands.nile.A}% | A* {row.thresholdBands.nile.AStar}%</p>
      <p><span className="font-semibold">IG:</span> B {row.thresholdBands.ig.B}% | A {row.thresholdBands.ig.A}% | A* {row.thresholdBands.ig.AStar}%</p>
      <p><span className="font-semibold">American:</span> B {row.thresholdBands.american.B}% | A {row.thresholdBands.american.A}% | A* {row.thresholdBands.american.AStar}%</p>
      <p><span className="font-semibold">Arab:</span> B {row.thresholdBands.arab.B}% | A {row.thresholdBands.arab.A}% | A* {row.thresholdBands.arab.AStar}%</p>
    </div>
  );

  const renderCategoryCell = (row: TuitionRow, category: 'C' | 'B' | 'A' | 'AStar') => {
    const amount =
      category === 'C'
        ? row.categoryC
        : category === 'B'
          ? row.categoryB
          : category === 'A'
            ? row.categoryA
            : row.categoryAStar;

    const percentage =
      category === 'C'
        ? '0%'
        : category === 'B'
          ? row.discountPolicy.B
          : category === 'A'
            ? row.discountPolicy.A
            : row.discountPolicy.AStar;

    const badgeClass =
      category === 'C'
        ? 'bg-muted text-foreground border border-border'
        : scholarshipCategoryStyles[category].badge;

    const label = category === 'AStar' ? 'Category A*' : `Category ${category}`;

    return (
      <div className={`space-y-2 rounded-lg p-2 ${scholarshipCategoryStyles[category].cell}`}>
        <p className="font-mono text-sm text-foreground">{formatCurrency(amount)}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={`text-xs ${badgeClass}`}>{label}</Badge>
          <Badge variant="outline" className="text-xs">
            {percentage} OFF
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={tuitionTableCopy.searchPlaceholder}
            className="w-full"
          />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="overflow-auto rounded-xl border border-border max-h-[70vh]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-background">
              <tr className="border-b border-border bg-muted/50">
                <th className="p-3 text-left">
                  <Button variant="ghost" onClick={() => handleSort('faculty')} className="px-0">
                    Faculty <ArrowDownUp className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </th>
                <th className="p-3 text-left">Tuition Fees</th>
                <th className="p-3 text-left">Educational Support Services</th>
                <th className="p-3 text-left">Administrative</th>
                <th className="p-3 text-left">Category C</th>
                <th className="p-3 text-left">Category B</th>
                <th className="p-3 text-left">Category A</th>
                <th className="p-3 text-left">Category A*</th>
                <th className="p-3 text-left">{tuitionTableCopy.thresholdTitle}</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-muted-foreground">
                    {tuitionTableCopy.emptyState}
                  </td>
                </tr>
              )}
              {sortedRows.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="p-3 align-top font-medium text-foreground">{row.faculty}</td>
                  <td className="p-3 align-top">{formatCurrency(row.tuitionFees)}</td>
                  <td className="p-3 align-top">{formatCurrency(row.educationalSupportServices)}</td>
                  <td className="p-3 align-top">{formatCurrency(row.administrative)}</td>
                  <td className="p-3 align-top">{renderCategoryCell(row, 'C')}</td>
                  <td className="p-3 align-top">{renderCategoryCell(row, 'B')}</td>
                  <td className="p-3 align-top">{renderCategoryCell(row, 'A')}</td>
                  <td className="p-3 align-top">{renderCategoryCell(row, 'AStar')}</td>
                  <td className="p-3 align-top">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" variant="outline">{tuitionTableCopy.viewThresholds}</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[360px]">
                        {renderThresholdLines(row)}
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {sortedRows.map((row) => (
          <div key={`${row.id}-mobile`} className="rounded-xl border border-border p-4 space-y-3">
            <p className="font-semibold text-foreground">{row.faculty}</p>
            <div className="grid gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Tuition Fees</p>
                <p>{formatCurrency(row.tuitionFees)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Educational Support Services</p>
                <p>{formatCurrency(row.educationalSupportServices)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Administrative</p>
                <p>{formatCurrency(row.administrative)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category C / B / A / A*</p>
                <div className="mt-2 space-y-2">
                  {renderCategoryCell(row, 'C')}
                  {renderCategoryCell(row, 'B')}
                  {renderCategoryCell(row, 'A')}
                  {renderCategoryCell(row, 'AStar')}
                </div>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">{tuitionTableCopy.viewThresholds}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px]">
                {renderThresholdLines(row)}
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};
