'use client'

import React, { useMemo, useState } from 'react'

import { Product } from '@/types/dashboard'
import { ProductDetailModal } from '@/components/ProductDetailModal'

interface MetricsSectionProps {
  inventory: Product[]
}

export const MetricsSection: React.FC<MetricsSectionProps> = React.memo(
  ({ inventory }) => {
    const [selectedMetric, setSelectedMetric] = useState<{
      title: string
      products: Product[]
    } | null>(null)

    const { totalValue, criticalItems, warningItems } = useMemo(
      () => ({
        totalValue: Number(
          inventory
            .reduce(
              (sum, product) => sum + product.stockLevel * product.price,
              0
            )
            .toFixed(2)
        ),
        criticalItems: inventory.filter((p) => p.healthStatus === 'critical')
          .length,
        warningItems: inventory.filter((p) => p.healthStatus === 'warning')
          .length,
      }),
      [inventory]
    )

    const handleMetricClick = (
      type: 'total' | 'critical' | 'warning' | 'all'
    ) => {
      let filteredProducts: Product[]
      let title: string

      switch (type) {
        case 'total':
          filteredProducts = inventory
          title = 'All Products'
          break
        case 'critical':
          filteredProducts = inventory.filter(
            (p) => p.healthStatus === 'critical'
          )
          title = 'Critical Items'
          break
        case 'warning':
          filteredProducts = inventory.filter(
            (p) => p.healthStatus === 'warning'
          )
          title = 'Warning Items'
          break
        default:
          filteredProducts = inventory
          title = 'All Products'
      }

      setSelectedMetric({ title, products: filteredProducts })
    }

    return (
      <>
        <div className="mb-8 flex flex-col gap-2">
          <div
            className="metric-card"
            onClick={() => handleMetricClick('total')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Inventory Value
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalValue.toFixed(2)}
                </p>
              </div>
              <div className="icon-primary">
                <span>💰</span>
              </div>
            </div>
          </div>

          <div
            className="metric-card"
            onClick={() => handleMetricClick('all')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {inventory.length}
                </p>
              </div>
              <div className="icon-success">
                <span>📦</span>
              </div>
            </div>
          </div>

          <div
            className="metric-card"
            onClick={() => handleMetricClick('critical')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Critical Items
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {criticalItems}
                </p>
              </div>
              <div className="icon-danger">
                <span>⚠️</span>
              </div>
            </div>
          </div>

          <div
            className="metric-card"
            onClick={() => handleMetricClick('warning')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Warning Items
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {warningItems}
                </p>
              </div>
              <div className="icon-warning">
                <span>⏰</span>
              </div>
            </div>
          </div>
        </div>

        <ProductDetailModal
          isOpen={selectedMetric !== null}
          onClose={() => setSelectedMetric(null)}
          title={selectedMetric?.title || ''}
          products={selectedMetric?.products || []}
        />
      </>
    )
  }
)
