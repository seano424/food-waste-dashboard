import { Product, ExpiryData, HealthData, WasteData } from '@/types/dashboard'

// Simple seeded random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export const generateInventoryData = (seed: number = 12345): Product[] => {
  const products = [
    // Dairy
    { name: 'Organic Milk 2%', category: 'dairy', basePrice: 4.99 },
    { name: 'Greek Yogurt', category: 'dairy', basePrice: 6.49 },
    { name: 'Cheddar Cheese', category: 'dairy', basePrice: 8.99 },
    { name: 'Butter Unsalted', category: 'dairy', basePrice: 5.49 },

    // Produce
    { name: 'Organic Bananas', category: 'produce', basePrice: 3.99 },
    { name: 'Fresh Spinach', category: 'produce', basePrice: 4.49 },
    { name: 'Roma Tomatoes', category: 'produce', basePrice: 5.99 },
    { name: 'Organic Carrots', category: 'produce', basePrice: 3.49 },
    { name: 'Red Bell Peppers', category: 'produce', basePrice: 7.99 },

    // Bakery
    { name: 'Artisan Bread', category: 'bakery', basePrice: 4.99 },
    { name: 'Croissants (6pk)', category: 'bakery', basePrice: 6.99 },
    { name: 'Bagels Everything', category: 'bakery', basePrice: 5.49 },

    // Meat
    { name: 'Chicken Breast', category: 'meat', basePrice: 12.99 },
    { name: 'Ground Turkey', category: 'meat', basePrice: 8.99 },

    // Pantry
    { name: 'Pasta Linguine', category: 'pantry', basePrice: 2.99 },
    { name: 'Olive Oil Extra Virgin', category: 'pantry', basePrice: 14.99 },
  ]

  return products.map((product, index) => {
    const currentSeed = seed + index
    const daysUntilExpiry = Math.floor(seededRandom(currentSeed) * 14) // 0-14 days
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry)

    let healthStatus: 'critical' | 'warning' | 'healthy'
    if (daysUntilExpiry === 0) healthStatus = 'critical'
    else if (daysUntilExpiry <= 3) healthStatus = 'warning'
    else healthStatus = 'healthy'

    return {
      id: `prod-${index}`,
      name: product.name,
      category: product.category as any,
      expiryDate,
      stockLevel: Math.floor(seededRandom(currentSeed + 1) * 50) + 5,
      price: product.basePrice + (seededRandom(currentSeed + 2) * 2 - 1), // ±$1 variation
      daysUntilExpiry,
      healthStatus,
    }
  })
}

export const generateChartData = (inventory: Product[]) => {
  // Expiry bar chart data
  const expiryData: ExpiryData[] = [
    { day: 'Today', count: 0, value: 0 },
    { day: 'Tomorrow', count: 0, value: 0 },
    { day: 'Day 3', count: 0, value: 0 },
    { day: 'Day 4', count: 0, value: 0 },
    { day: 'Day 5', count: 0, value: 0 },
    { day: 'Next Week', count: 0, value: 0 },
    { day: 'Later', count: 0, value: 0 },
  ]

  inventory.forEach((product) => {
    const days = product.daysUntilExpiry
    const value = product.stockLevel * product.price

    if (days === 0) {
      expiryData[0].count++
      expiryData[0].value += value
    } else if (days === 1) {
      expiryData[1].count++
      expiryData[1].value += value
    } else if (days === 2) {
      expiryData[2].count++
      expiryData[2].value += value
    } else if (days === 3) {
      expiryData[3].count++
      expiryData[3].value += value
    } else if (days === 4) {
      expiryData[4].count++
      expiryData[4].value += value
    } else if (days <= 7) {
      expiryData[5].count++
      expiryData[5].value += value
    } else {
      expiryData[6].count++
      expiryData[6].value += value
    }
  })

  // Health pie chart data
  const criticalCount = inventory.filter(
    (p) => p.healthStatus === 'critical'
  ).length
  const warningCount = inventory.filter(
    (p) => p.healthStatus === 'warning'
  ).length
  const healthyCount = inventory.filter(
    (p) => p.healthStatus === 'healthy'
  ).length

  const healthData: HealthData[] = [
    { name: 'Critical (Today)', value: criticalCount, color: '#ef4444' },
    { name: 'Warning (This Week)', value: warningCount, color: '#f59e0b' },
    { name: 'Healthy', value: healthyCount, color: '#10b981' },
  ].filter((item) => item.value > 0)

  // Waste prevention line chart data
  const wasteData: WasteData[] = [
    { date: '2025-05-15', wastePrevented: 12, moneySaved: 48 },
    { date: '2025-05-16', wastePrevented: 18, moneySaved: 72 },
    { date: '2025-05-17', wastePrevented: 8, moneySaved: 32 },
    { date: '2025-05-18', wastePrevented: 22, moneySaved: 88 },
    { date: '2025-05-19', wastePrevented: 15, moneySaved: 60 },
    { date: '2025-05-20', wastePrevented: 28, moneySaved: 112 },
    { date: '2025-05-21', wastePrevented: 19, moneySaved: 76 },
    { date: '2025-05-22', wastePrevented: 25, moneySaved: 100 },
  ]

  return { expiryData, healthData, wasteData }
}
