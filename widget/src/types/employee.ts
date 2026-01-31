/**
 * Employee Status Union Type
 */
export type EmployeeStatus = 'Active' | 'OnLeave' | 'Terminated';

/**
 * Employee Interface
 */
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinedAt: string; // ISO 8601 format
  status: EmployeeStatus;
  avatarUrl: string;
}
