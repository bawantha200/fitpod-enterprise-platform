/**
 * useCafeSession.js  (ViewModel layer)
 * Small hook so pages can write `const { role } = useCafeSession();`
 */
import { useContext } from 'react';
import { CafeSessionContext } from './CafeSessionProvider';

export default function useCafeSession() {
  const session = useContext(CafeSessionContext);
  if (!session) {
    throw new Error('useCafeSession must be used inside <CafeSessionProvider>');
  }
  return session;
}
