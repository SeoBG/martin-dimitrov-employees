import { parseDate } from './date';

// Type definition for a record from the CSV file
export interface EmployeeRecord {
  EmpID: string;
  ProjectID: string;
  DateFrom: string;
  DateTo: string | null;
}

// Type definition for a pair of employees with project and days worked
export interface PairProject {
  emp1: string;
  emp2: string;
  projectId: string;
  daysWorked: number;
}

// Main function to find employee pairs and calculate their shared project days
export const findEmployeePairs = (records: EmployeeRecord[]): PairProject[] => {
  const projectMap: Record<string, EmployeeRecord[]> = {};

  // Group employees by ProjectID
  records.forEach(r => {
    if (!projectMap[r.ProjectID]) projectMap[r.ProjectID] = [];
    projectMap[r.ProjectID].push(r);
  });

  const pairDays: PairProject[] = [];
  const totalDaysMap: Record<string, number> = {};

  // Iterate through each project and compare all employee pairs
  Object.entries(projectMap).forEach(([projectId, employees]) => {
    for (let i = 0; i < employees.length; i++) {
      for (let j = i + 1; j < employees.length; j++) {
        const emp1 = employees[i];
        const emp2 = employees[j];

        // Parse dates, treating 'NULL' or null as today
        const from1 = parseDate(emp1.DateFrom);
        const to1 = emp1.DateTo === 'NULL' || emp1.DateTo === null ? new Date() : parseDate(emp1.DateTo);
        const from2 = parseDate(emp2.DateFrom);
        const to2 = emp2.DateTo === 'NULL' || emp2.DateTo === null ? new Date() : parseDate(emp2.DateTo);

        // Calculate the overlap period between the two employees
        const overlapStart = from1 > from2 ? from1 : from2;
        const overlapEnd = to1 < to2 ? to1 : to2;

        if (overlapStart <= overlapEnd) {
          const days = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24));
          // Create a unique key for the employee pair (sorted to avoid duplicates)
          const key = [emp1.EmpID, emp2.EmpID].sort().join('-');
          // Accumulate total days worked together across projects
          totalDaysMap[key] = (totalDaysMap[key] || 0) + days;

          // Save the current project pair result
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


  // Find the employee pair with the maximum total days worked together
  const maxPair = Object.entries(totalDaysMap).reduce(
    (max, [key, days]) => (days > max.days ? { key, days } : max),
    { key: '', days: 0 }
  );
  
  // Return only the records for the top employee pair
  return pairDays.filter(p =>
    [p.emp1, p.emp2].sort().join('-') === maxPair.key
  );
};
