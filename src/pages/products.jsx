import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Products() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(res => setData(res.data))
  }, [])

  return (
    <div>
      <h2>Products...</h2>
      <table border="1">
        <tbody>
          {data.map(p => (
            <tr key={p.Id}>
              <td>{p.Code}</td>
              <td>{p.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}