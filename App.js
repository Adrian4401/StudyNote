import { React } from 'react';

import { StackNavigation } from './navigation/StackNavigation';

import { Create } from './databaseQueries/databaseQueries';


export default function App() {

  Create();

  return (
    <>
      {/* folder navigation->StackNavigation.js */}
      <StackNavigation />
    </>
  )
}