import RootNavigator from './navigation/RootNavigator.tsx'
import RootProvider from './components/common/RootProvider.tsx'

const App = () => {
  return (
    <RootProvider>
      <RootNavigator />
    </RootProvider>
  )
}

export default App
