import { useEffect, useState } from 'react'
import Table from '../common/Table'
import { getOrdersAPI } from '../../services/orderServices'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import useData from '../../hooks/useData'
import { DefaultPageSkeleton } from '../common/DefaultPageSkeleton'

function MyOrderPage() {
  const { data: orders, error, isLoading } = useData('/order')

  return (
    <section className="items-center flex justify-center w-1/2 mx-auto py-9 px-11">
      {isLoading && <DefaultPageSkeleton />}
      {error && <em className="text-red-500">{error}</em>}
      <Table headings={['Order', 'Products', 'Total', 'Status']}>
        <tbody>
          {orders &&
            orders.map((order, idx) => (
              <tr key={order._id} className="*:text-center">
                <td>{idx + 1}</td>
                <td>{order.products.map((p) => p.product.title).join(', ')}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </section>
  )
}

export default MyOrderPage
