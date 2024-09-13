import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
}

const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
