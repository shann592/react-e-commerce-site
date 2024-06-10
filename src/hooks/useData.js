import apiClient from '../utils/api_client'
import { useEffect, useState } from 'react'
const useData = (endPoint, customConfig, deps) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(
    () => {
      apiClient
        .get(endPoint, customConfig)
        .then((res) => {
          if (
            endPoint === '/products' &&
            data &&
            data.products &&
            customConfig.params.page !== 1
          ) {
            setData((prev) => ({
              ...prev,
              products: [...prev.products, ...res.data.products],
            }))
          } else {
            setData(res.data)
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false))
    },
    deps ? deps : []
  )
  return { data, error, isLoading }
}
export default useData
