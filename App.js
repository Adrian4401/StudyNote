import { React } from 'react';

import { StackNavigation } from './navigation/StackNavigation';

import { Create } from './database/queries';

import { LanguageProvider } from './context/LanguageContext';
import { DarkModeProvider } from './context/DarkModeContext';


export default function App() {

  Create();

  return (
    <LanguageProvider>
      <DarkModeProvider>

        {/* folder navigation->StackNavigation.js */}
        <StackNavigation />
        
      </DarkModeProvider>
    </LanguageProvider>
  )
}