import type { IssuePriority } from '../../../shared/types/IssuePriority';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type BarShapeProps,
  Rectangle,
} from 'recharts';

interface PriorityChartProps {
  priorities: Record<IssuePriority, number>;
}

interface BarDataEntry {
  name: IssuePriority;
  value: number;
}

const COLORS: Record<IssuePriority, string> = {
  none: '#6b778c',
  low: '#ffc400',
  medium: '#ff8b00',
  high: '#ff5630',
};

function CustomBar(props: BarShapeProps) {
  const payload = props.payload as BarDataEntry;
  return <Rectangle {...props} fill={COLORS[payload.name]} />;
}

export function PriorityChart({ priorities }: PriorityChartProps) {
  const data: BarDataEntry[] = [
    { name: 'none', value: priorities.none },
    { name: 'low', value: priorities.low },
    { name: 'medium', value: priorities.medium },
    { name: 'high', value: priorities.high },
  ];

  return (
    <div className="flex flex-col items-center justify-around gap-4 p-4 border border-gray-primary-light rounded-md shadow-sm overflow-hidden">
      <h4 className="font-semibold text-base text-center">Priority Summary</h4>
      <BarChart
        style={{
          width: '100%',
          maxWidth: '420px',
          maxHeight: '60vh',
          aspectRatio: 1.8,
        }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Bar dataKey="value" barSize={45} shape={CustomBar} />
      </BarChart>
    </div>
  );
}
