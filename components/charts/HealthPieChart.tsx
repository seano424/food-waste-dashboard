'use client'

import React from 'react'
import { HealthData, ChartTooltipPayload } from '@/types/dashboard'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface CustomPieTooltipProps {
  active?: boolean
  payload?: ChartTooltipPayload[]
}

const CustomPieTooltip = ({ active, payload }: CustomPieTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="tooltip">
        <p className="font-semibold text-gray-800">{data.name}</p>
        <p style={{ color: data.payload.color }}>
          Count: <span className="font-bold">{data.value}</span>
        </p>
      </div>
    )
  }
  return null
}

interface HealthPieChartProps {
  data: HealthData[]
}

export const HealthPieChart: React.FC<HealthPieChartProps> = ({ data }) => {
  return (
    <div className="chart-container hover-lift">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Inventory Health Status
      </h3>
      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
