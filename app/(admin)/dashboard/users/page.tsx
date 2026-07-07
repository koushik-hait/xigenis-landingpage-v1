
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import UsersTable from './users-table'
import { getUsers } from './actions'

export default async function UsersPage() {
  const initialData = await getUsers(1, '')

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Accounts
          </CardTitle>
          <CardDescription>
            Total users: {initialData.totalCount}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable initialData={initialData} />
        </CardContent>
      </Card>
    </div>
  )
}
