export interface Product {
  id: string
  name: string
  category: 'dairy' | 'produce' | 'bakery' | 'meat' | 'pantry'
  expiryDate: Date
  stockLevel: number
  price: number
  daysUntilExpiry: number
  healthStatus: 'critical' | 'warning' | 'healthy'
}

export interface WasteData {
  date: string
  wastePrevented: number
  moneySaved: number
}

export interface ExpiryData {
  day: string
  count: number
  value: number
}

export interface HealthData {
  name: string
  value: number
  color: string
}

export interface ChartTooltipPayload {
  value: number
  name: string
  payload: {
    color?: string
    name?: string
    value?: number
  }
} 