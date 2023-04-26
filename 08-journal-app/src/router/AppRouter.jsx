import { useCheckOut } from '../hooks';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckignAuth } from '../ui/components/CheckignAuth';


export const AppRouter = () => {
  const {status }=useCheckOut();
  if (status === 'checking') {
    return <CheckignAuth />
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<JournalRoutes />} />/* JournalApp */
          : <Route path="/auth/*" element={<AuthRoutes />} />/* Login y Registro */
      }
      <Route path='/*' element={<Navigate to="/auth/login"/>}/>
    </Routes>
  )
}
