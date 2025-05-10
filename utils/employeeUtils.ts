import { parseDate } from './date';

export interface EmployeeRecord {
  EmpID: string;
  ProjectID: string;
  DateFrom: string;
  DateTo: string | null;
}

export interface PairProject {
  emp1: string;
  emp2: string;
  projectId: string;
  daysWorked: number;
}

export const findEmployeePairs = (records: EmployeeRecord[]): PairProject[] => {
  const projectMap: Record<string, EmployeeRecord[]> = {};
  records.forEach(r => {
    if (!projectMap[r.ProjectID]) projectMap[r.ProjectID] = [];
    projectMap[r.ProjectID].push(r);
  });

  const pairDays: PairProject[] = [];
  const totalDaysMap: Record<string, number> = {};

  Object.entries(projectMap).forEach(([projectId, employees]) => {
    for (let i = 0; i < employees.length; i++) {
      for (let j = i + 1; j < employees.length; j++) {
        const emp1 = employees[i];
        const emp2 = employees[j];

        const from1 = parseDate(emp1.DateFrom);
        const to1 = emp1.DateTo === 'NULL' || emp1.DateTo === null ? new Date() : parseDate(emp1.DateTo);
        const from2 = parseDate(emp2.DateFrom);
        const to2 = emp2.DateTo === 'NULL' || emp2.DateTo === null ? new Date() : parseDate(emp2.DateTo);

        const overlapStart = from1 > from2 ? from1 : from2;
        const overlapEnd = to1 < to2 ? to1 : to2;

        if (overlapStart <= overlapEnd) {
          const days = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24));
          const key = [emp1.EmpID, emp2.EmpID].sort().join('-');
          totalDaysMap[key] = (totalDaysMap[key] || 0) + days;
          pairDays.push({
            emp1: emp1.EmpID,
            emp2: emp2.EmpID,
            projectId,
            daysWorked: days,
          });
        }
      }
    }
  });

  const maxPair = Object.entries(totalDaysMap).reduce(
    (max, [key, days]) => (days > max.days ? { key, days } : max),
    { key: '', days: 0 }
  );

  return pairDays.filter(p =>
    [p.emp1, p.emp2].sort().join('-') === maxPair.key
  );
};
