import React, { useEffect, useState } from 'react'
import api from '../api'

export default function AppPage(){
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)

  useEffect(()=>{
    async function load(){
      try{
        const res = await api.get('/api/users')
        setData(res.data)
      }catch(err){
        setError(err.response?.data || err.message)
      }
    }
    load()
  },[])

  return (
    <div>
      <h1>Área del proyecto</h1>
      {error && <div style={{color:'red'}}>Error: {JSON.stringify(error)}</div>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}
