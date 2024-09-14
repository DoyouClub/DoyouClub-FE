import type { ReactNode } from 'react'
import ReduxProvider from '../../lib/redux/component/ReduxProvider.tsx'
import ReactQueryProvider from '../../lib/react-query/component/ReactQueryProvider.tsx'
import { NavigationContainer } from '@react-navigation/native'

interface Props {
  children: ReactNode
}

const RootProvider = ({ children }: Props) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </ReactQueryProvider>
    </ReduxProvider>
  )
}

export default RootProvider
