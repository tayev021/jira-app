import type { IssueStatus } from '../../../shared/types/IssueStatus';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  type PieSectorDataItem,
} from 'recharts';

interface PieDataEntry {
  name: IssueStatus;
  value: number;
}

interface StatusChartProps {
  statuses: Record<IssueStatus, number>;
}

const COLORS: Record<IssueStatus, string> = {
  todo: '#1868db',
  'in progress': '#ff8b00',
  done: '#36b37e',
};

function CustomSector(props: PieSectorDataItem) {
  const payload = props.payload as PieDataEntry;
  return <Sector {...props} fill={COLORS[payload.name]} />;
}

export function StatusChart({ statuses }: StatusChartProps) {
  const data: PieDataEntry[] = [
    { name: 'todo', value: statuses.todo },
    { name: 'in progress', value: statuses['in progress'] },
    { name: 'done', value: statuses.done },
  ];

  return (
    <div className="p-4 border border-gray-primary-light rounded-md shadow-sm overflow-hidden">
      <h4 className="mb-5 font-semibold text-base text-center">
        Status Summary
      </h4>
      <div className="flex items-center justify-around gap-4">
        <ResponsiveContainer width={220} height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              shape={CustomSector}
              startAngle={360}
              endAngle={0}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
            />
          </PieChart>
        </ResponsiveContainer>
        <ul className="text-base text-nowrap">
          <li className="font-semibold text-primary">Todo: {statuses.todo}</li>
          <li className="font-semibold text-orange-primary">
            In progress: {statuses['in progress']}
          </li>
          <li className="font-semibold text-green-primary">
            Done: {statuses.done}
          </li>
        </ul>{' '}
      </div>
    </div>
  );
}
