import { MOCK_WEEKLY_REPORT } from '../mock/mockData';
import type { WeeklyReport } from '../types/report';

export async function getWeeklyReport(_weekStartDate: string, _weekEndDate: string): Promise<WeeklyReport> {
  return MOCK_WEEKLY_REPORT;
}
