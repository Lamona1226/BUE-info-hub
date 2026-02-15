import { useMemo, useState } from 'react';
import { Phone, Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { departments } from '@/data/contacts';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
 
export const ContactsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const filteredDepartments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const selectedDepartments =
      departmentFilter === 'all'
        ? departments
        : departments.filter((dept) => dept.name === departmentFilter);

    if (!query) {
      return selectedDepartments.map((dept) => ({
        department: dept,
        rows: [
          ...(dept.head && dept.headExtension
            ? [{ name: dept.head, extension: dept.headExtension }]
            : []),
          ...dept.contacts.map((contact) => ({
            name: contact.name,
            extension: contact.extension,
          })),
        ],
      }));
    }

    return selectedDepartments
      .map((dept) => {
        const rows = [
          ...(dept.head && dept.headExtension
            ? [{ name: dept.head, extension: dept.headExtension }]
            : []),
          ...dept.contacts.map((contact) => ({
            name: contact.name,
            extension: contact.extension,
          })),
        ].filter((row) => {
          return (
            row.name.toLowerCase().includes(query) ||
            row.extension.toLowerCase().includes(query) ||
            dept.name.toLowerCase().includes(query)
          );
        });

        return { department: dept, rows };
      })
      .filter((entry) => entry.rows.length > 0);
  }, [departmentFilter, searchQuery]);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Contact Directory"
        description="Internal extension numbers grouped by department."
      />

      <section className="mt-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-[1fr_240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, extension, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.name} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredDepartments.length === 0 && (
          <div className="rounded-xl border border-border p-6 text-center text-muted-foreground">
            No contacts match the current search or filter.
          </div>
        )}

        {filteredDepartments.map(({ department, rows }) => (
          <div key={department.name}>
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">{department.name}</h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Staff Name</th>
                    <th className="text-left p-3 font-semibold">Internal Extension</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? (
                    rows.map((row, index) => (
                      <tr key={`${department.name}-${row.extension}-${index}`} className="border-t border-border">
                        <td className="p-3 font-medium text-foreground">{row.name}</td>
                        <td className="p-3 text-muted-foreground">{row.extension || '—'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="p-6 text-center text-muted-foreground">
                        No contacts listed for this department.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};