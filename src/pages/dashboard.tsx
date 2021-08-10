import { useContext, useEffect } from 'react'

import { withSSRAuth } from '../utils/withSSRAuth'
import { AuthContext } from '../contexts/AuthContext'
import { setupAPIClient } from '../services/api'

import { Can } from '../components/Can'

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext) 

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div> 
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)  
  await apiClient.get('/me')

  return {
    props: {}
  }
})