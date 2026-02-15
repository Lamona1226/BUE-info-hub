import { Fragment, useMemo, useState } from 'react';
import { AlertTriangle, ArrowDownUp, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  certificateTooltips,
  feeCellLabels,
  feeToggleLabels,
  scholarshipCategoryStyles,
  tuitionFilterPlaceholders,
  tuitionTableColumns,
  tuitionTableCopy,
  type TuitionRow,
} from '@/data/fees-module';

interface TuitionMasterTableProps {
  rows: TuitionRow[];
  formatCurrency: (amount: number) => string;
}

type SortKey = (typeof tuitionTableColumns)[number]['id'];

const parsePercentValue = (value: string) => {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
};

const calculateFee = (base: number, discount: string, showOriginal: boolean) => {
  if (showOriginal) {
    return base;
  }

  const percent = parsePercentValue(discount);
  return Math.round(base - base * (percent / 100));
};

const getCategoryStyles = (category: 'C' | 'B' | 'A' | 'AStar') => scholarshipCategoryStyles[category];

export const TuitionMasterTable = ({ rows, formatCurrency }: TuitionMasterTableProps) => {
  const [search, setSearch] = useState('');
  const [showOriginalFees, setShowOriginalFees] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('faculty');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    faculty: '',
    igcse: '',
    american: '',
    thanaweya: '',
    other: '',
  });

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  };

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
        `${row.faculty} ${row.program || ''} ${row.baseTuition}`.toLowerCase().includes(query) ||
        Object.values(row.thresholds).some((value) => value.toLowerCase().includes(query));

      const matchesFaculty = !filters.faculty.trim()
        ? true
        : `${row.faculty} ${row.program || ''}`.toLowerCase().includes(filters.faculty.toLowerCase());

      const matchesIgcse = !filters.igcse.trim()
        ? true
        : row.thresholds.igcse.toLowerCase().includes(filters.igcse.toLowerCase());

      const matchesAmerican = !filters.american.trim()
        ? true
        : row.thresholds.american.toLowerCase().includes(filters.american.toLowerCase());

      const matchesThanaweya = !filters.thanaweya.trim()
        ? true
        : row.thresholds.thanaweya.toLowerCase().includes(filters.thanaweya.toLowerCase());

      const matchesOther = !filters.other.trim()
        ? true
        : row.thresholds.other.toLowerCase().includes(filters.other.toLowerCase());

      return matchesSearch && matchesFaculty && matchesIgcse && matchesAmerican && matchesThanaweya && matchesOther;
    });
  }, [filters, rows, search]);

  const sortedRows = useMemo(() => {
    const direction = sortDirection === 'asc' ? 1 : -1;

    return [...filteredRows].sort((a, b) => {
      const getValue = (row: TuitionRow) => {
        switch (sortKey) {
          case 'faculty':
            return row.faculty.toLowerCase();
          case 'baseTuition':
            return row.baseTuition;
          case 'categoryB':
            return calculateFee(row.baseTuition, row.discounts.B, showOriginalFees);
          case 'categoryA':
            return calculateFee(row.baseTuition, row.discounts.A, showOriginalFees);
          case 'categoryAStar':
            return calculateFee(row.baseTuition, row.discounts.AStar, showOriginalFees);
          case 'scoreIgcse':
            return parsePercentValue(row.thresholds.igcse);
          case 'scoreAmerican':
            return parsePercentValue(row.thresholds.american);
          case 'scoreThanaweya':
            return parsePercentValue(row.thresholds.thanaweya);
          case 'scoreOther':
            return parsePercentValue(row.thresholds.other);
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
  }, [filteredRows, showOriginalFees, sortDirection, sortKey]);

  const renderFeeCell = (row: TuitionRow, category: 'C' | 'B' | 'A' | 'AStar') => {
    const discount =
      category === 'C'
        ? '0%'
        : category === 'B'
          ? row.discounts.B
          : category === 'A'
            ? row.discounts.A
            : row.discounts.AStar;

    const amount =
      category === 'C' ? row.baseTuition : calculateFee(row.baseTuition, discount, showOriginalFees);

    const styles = getCategoryStyles(category);
    const label =
      category === 'C'
        ? feeCellLabels.base
        : category === 'B'
          ? feeCellLabels.categoryB
          : category === 'A'
            ? feeCellLabels.categoryA
            : feeCellLabels.categoryAStar;

    return (
      <div className={`flex flex-col items-end gap-1 rounded-lg p-2 ${styles.cell}`}>
        <span className="font-mono text-sm text-foreground">{formatCurrency(amount)}</span>
        <Badge variant="outline" className="text-xs">
          {discount} OFF
        </Badge>
        <Badge className={`text-xs ${styles.badge}`}>{label}</Badge>
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
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{feeToggleLabels.original}</span>
          <Switch checked={showOriginalFees} onCheckedChange={setShowOriginalFees} />
          <span className="text-sm text-muted-foreground">{feeToggleLabels.discounted}</span>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="overflow-auto rounded-xl border border-border max-h-[70vh]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-background">
              <tr className="border-b border-border bg-muted/50">
                <th className="p-3 text-left w-10" />
                {tuitionTableColumns.map((column) => (
                  <th key={column.id} className="p-3 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{column.label}</span>
                      {column.sortable && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleSort(column.id as SortKey)}
                        >
                          <ArrowDownUp className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {column.id.startsWith('score') && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {column.id === 'scoreIgcse' && certificateTooltips.igcse}
                            {column.id === 'scoreAmerican' && certificateTooltips.american}
                            {column.id === 'scoreThanaweya' && certificateTooltips.thanaweya}
                            {column.id === 'scoreOther' && certificateTooltips.other}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-2" />
                {tuitionTableColumns.map((column) => (
                  <th key={`${column.id}-filter`} className="p-2">
                    {column.id === 'faculty' && (
                      <Input
                        value={filters.faculty}
                        onChange={(event) =>
                          setFilters((prev) => ({ ...prev, faculty: event.target.value }))
                        }
                        placeholder={tuitionFilterPlaceholders.faculty}
                        className="h-8"
                      />
                    )}
                    {column.id === 'scoreIgcse' && (
                      <Input
                        value={filters.igcse}
                        onChange={(event) => setFilters((prev) => ({ ...prev, igcse: event.target.value }))}
                        placeholder={tuitionFilterPlaceholders.igcse}
                        className="h-8"
                      />
                    )}
                    {column.id === 'scoreAmerican' && (
                      <Input
                        value={filters.american}
                        onChange={(event) =>
                          setFilters((prev) => ({ ...prev, american: event.target.value }))
                        }
                        placeholder={tuitionFilterPlaceholders.american}
                        className="h-8"
                      />
                    )}
                    {column.id === 'scoreThanaweya' && (
                      <Input
                        value={filters.thanaweya}
                        onChange={(event) =>
                          setFilters((prev) => ({ ...prev, thanaweya: event.target.value }))
                        }
                        placeholder={tuitionFilterPlaceholders.thanweya}
                        className="h-8"
                      />
                    )}
                    {column.id === 'scoreOther' && (
                      <Input
                        value={filters.other}
                        onChange={(event) => setFilters((prev) => ({ ...prev, other: event.target.value }))}
                        placeholder={tuitionFilterPlaceholders.other}
                        className="h-8"
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.length === 0 && (
                <tr>
                  <td colSpan={tuitionTableColumns.length + 1} className="p-6 text-center text-muted-foreground">
                    {tuitionTableCopy.emptyState}
                  </td>
                </tr>
              )}
              {sortedRows.map((row) => (
                <Fragment key={row.id}>
                  <tr key={row.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="p-3 align-top">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRow(row.id)}
                        className="h-7 w-7"
                      >
                        {expandedRows.has(row.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                    <td className="p-3 align-top">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{row.faculty}</span>
                          {row.exceptions.length > 0 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertTriangle className="h-4 w-4 text-warning" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-1">
                                  {row.exceptions.map((exception) => (
                                    <p key={exception}>{exception}</p>
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        {row.program && <p className="text-xs text-muted-foreground">{row.program}</p>}
                      </div>
                    </td>
                    <td className="p-3 align-top">{renderFeeCell(row, 'C')}</td>
                    <td className="p-3 align-top">{renderFeeCell(row, 'B')}</td>
                    <td className="p-3 align-top">{renderFeeCell(row, 'A')}</td>
                    <td className="p-3 align-top">{renderFeeCell(row, 'AStar')}</td>
                    <td className="p-3 align-top text-xs text-muted-foreground">{row.thresholds.igcse}</td>
                    <td className="p-3 align-top text-xs text-muted-foreground">{row.thresholds.american}</td>
                    <td className="p-3 align-top text-xs text-muted-foreground">{row.thresholds.thanaweya}</td>
                    <td className="p-3 align-top text-xs text-muted-foreground">{row.thresholds.other}</td>
                  </tr>
                  {expandedRows.has(row.id) && (
                    <tr className="border-b border-border bg-muted/20">
                      <td colSpan={tuitionTableColumns.length + 1} className="p-4">
                        <div className="grid gap-4 lg:grid-cols-3 text-sm">
                          <div>
                            <p className="font-medium text-foreground">{tuitionTableCopy.scholarshipRulesTitle}</p>
                            <ul className="mt-2 space-y-1 text-muted-foreground">
                              {row.scholarshipRules.map((rule) => (
                                <li key={rule}>• {rule}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{tuitionTableCopy.exceptionTitle}</p>
                            <ul className="mt-2 space-y-1 text-muted-foreground">
                              {row.exceptions.length > 0 ? (
                                row.exceptions.map((exception) => <li key={exception}>• {exception}</li>)
                              ) : (
                                <li>• No faculty-specific exceptions.</li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{tuitionTableCopy.renewalTitle}</p>
                            <ul className="mt-2 space-y-1 text-muted-foreground">
                              {row.renewalRequirements.map((requirement) => (
                                <li key={requirement}>• {requirement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {sortedRows.map((row) => (
          <div key={`${row.id}-mobile`} className="rounded-xl border border-border p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground">{row.faculty}</p>
                {row.program && <p className="text-xs text-muted-foreground">{row.program}</p>}
              </div>
              {row.exceptions.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {row.exceptions.map((exception) => (
                        <p key={exception}>{exception}</p>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <div className="grid gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Base Tuition</p>
                {renderFeeCell(row, 'C')}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category B</p>
                {renderFeeCell(row, 'B')}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category A</p>
                {renderFeeCell(row, 'A')}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category A*</p>
                {renderFeeCell(row, 'AStar')}
              </div>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">IGCSE:</span> {row.thresholds.igcse}
              </div>
              <div>
                <span className="font-medium text-foreground">American:</span> {row.thresholds.american}
              </div>
              <div>
                <span className="font-medium text-foreground">Thanaweya:</span> {row.thresholds.thanaweya}
              </div>
              <div>
                <span className="font-medium text-foreground">Other:</span> {row.thresholds.other}
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => toggleRow(row.id)}>
              {expandedRows.has(row.id) ? tuitionTableCopy.hideDetails : tuitionTableCopy.viewDetails}
            </Button>
            {expandedRows.has(row.id) && (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">{tuitionTableCopy.scholarshipRulesTitle}</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    {row.scholarshipRules.map((rule) => (
                      <li key={rule}>• {rule}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">{tuitionTableCopy.exceptionTitle}</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    {row.exceptions.length > 0 ? (
                      row.exceptions.map((exception) => <li key={exception}>• {exception}</li>)
                    ) : (
                      <li>• No faculty-specific exceptions.</li>
                    )}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">{tuitionTableCopy.renewalTitle}</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    {row.renewalRequirements.map((requirement) => (
                      <li key={requirement}>• {requirement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
