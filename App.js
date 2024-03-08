import { React } from 'react';

import { StackNavigation } from './navigation/StackNavigation';
import { Create } from './databaseQueries/Create';


export default function App() {
  return (
    <>
      {/* folder databaseQueries->Create.js */}
      <Create />
      {/* folder navigation->StackNavigation.js */}
      <StackNavigation />
    </>
  )
}