import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import './App.css'

function App() {

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default App
