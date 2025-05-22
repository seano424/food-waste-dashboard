import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ExpiryData } from '../../types/dashboard'

interface CustomBarTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const CustomBarTooltip = ({ active, payload, label }: CustomBarTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-blue-600">
          Products: <span className="font-bold">{payload[0].value}</span>
        </p>
        <p className="text-green-600">
          Value:{' '}
          <span className="font-bold">
            ${payload[1]?.value?.toFixed(2) || '0.00'}
          </span>
        </p>
      </div>
    )
  }
  return null
}

interface ExpiryBarChartProps {
  data: ExpiryData[]
}

export const ExpiryBarChart: React.FC<ExpiryBarChartProps> = ({ data }) => {
  return (
    <div className="chart-container hover-lift">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Products Expiring by Day
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
            <XAxis
              dataKey="day"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar
              dataKey="count"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Products"
            />
            <Bar
              dataKey="value"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              name="Value"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 