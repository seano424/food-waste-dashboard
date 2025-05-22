'use client'

import React, { useMemo } from 'react'
import { MetricsSection } from './MetricsSection'
import { ExpiryBarChart } from './charts/ExpiryBarChart'
import { HealthPieChart } from './charts/HealthPieChart'
import { WasteLineChart } from './charts/WasteLineChart'
import {
  generateInventoryData,
  generateChartData,
} from '../utils/dashboardData'

// Simple seeded random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const FoodWasteDashboard = () => {
  // Use a fixed seed for consistent data between server and client
  const seed = 12345
  const inventory = useMemo(() => generateInventoryData(seed), [])
  const { expiryData, healthData, wasteData } = useMemo(() => generateChartData(inventory), [inventory])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Food Waste Reduction Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor inventory health and prevent food waste across your
            organization
          </p>
        </div>

        {/* Key Metrics */}
        <MetricsSection inventory={inventory} />

        {/* Charts Grid */}
        <div className="chart-grid-layout mb-8">
          <ExpiryBarChart data={expiryData} />
          <HealthPieChart data={healthData} />
        </div>

        {/* Daily Waste Prevention Line Chart */}
        <WasteLineChart data={wasteData} />

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>
            🌱 Building sustainable food systems through data-driven waste
            reduction
          </p>
        </div>
      </div>
    </div>
  )
}

export default FoodWasteDashboard
