import { React } from 'react';

import { StackNavigation } from './navigation/StackNavigation';
import { Create } from './databaseQueries/Create';


export default function App() {
  Create()
  return (
    <>
      {/* folder navigation->StackNavigation.js */}
      <StackNavigation />
    </>
  )
}