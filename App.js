import { React } from 'react';

import { StackNavigation } from './navigation/StackNavigation';

import { Create } from './databaseQueries/databaseQueries';

import { LanguageProvider } from './context/LanguageContext';


export default function App() {

  Create();

  return (
    <LanguageProvider>
      {/* folder navigation->StackNavigation.js */}
      <StackNavigation />
    </LanguageProvider>
  )
}