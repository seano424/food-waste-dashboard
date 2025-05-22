'use client'

import React, { useEffect } from 'react'
import { Product } from '@/types/dashboard'

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  products: Product[]
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  products,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm p-6 rounded-t-xl flex justify-between items-center border-b border-gray-100">
          <h2 className="text-2xl font-black uppercase text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="font-black text-gray-900 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4 p-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ${(product.price * product.stockLevel).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.stockLevel} units
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className={`status-${product.healthStatus}`}>
                  {product.healthStatus}
                </span>
                <p className="text-sm text-gray-600">
                  Expires in {product.daysUntilExpiry} days
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
