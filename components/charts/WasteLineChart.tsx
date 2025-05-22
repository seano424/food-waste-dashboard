import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { WasteData } from '../../types/dashboard'

interface CustomLineTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const CustomLineTooltip = ({ active, payload, label }: CustomLineTooltipProps) => {
  if (active && payload && payload.length) {
    const date = new Date(label!)
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
    return (
      <div className="tooltip">
        <p className="font-semibold text-gray-800">
          {formattedDate}
        </p>
        <p className="text-green-600">
          Items Saved: <span className="font-bold">{payload[0].value}</span>
        </p>
        <p className="text-blue-600">
          Money Saved:{' '}
          <span className="font-bold">${payload[1]?.value || 0}</span>
        </p>
      </div>
    )
  }
  return null
}

interface WasteLineChartProps {
  data: WasteData[]
}

export const WasteLineChart: React.FC<WasteLineChartProps> = ({ data }) => {
  return (
    <div className="chart-container hover-lift hover-glow">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Daily Waste Prevention Progress
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return `${date.getMonth() + 1}/${date.getDate()}`
              }}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip content={<CustomLineTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="wastePrevented"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="Items Saved"
            />
            <Line
              type="monotone"
              dataKey="moneySaved"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="Money Saved ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 