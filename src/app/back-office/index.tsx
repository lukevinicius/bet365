import { Link } from 'react-router-dom'

export function BackOffice() {
  return (
    <div>
      <h1>Back Office</h1>
      <Link to="/back-office/users">usuários</Link>
    </div>
  )
}
