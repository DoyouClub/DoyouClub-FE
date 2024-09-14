import RootProvider from './components/RootProvider.tsx'
import RootNavigator from './navigation/RootNavigator.tsx'

const App = () => {
  return (
    <RootProvider>
      <RootNavigator />
    </RootProvider>
  )
}

export default App
