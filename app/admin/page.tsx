import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Admin = () => {
  return (
    <div className="flex flex-col flex-1 gap-4 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Faça login no painel de controle administrativo para gerenciar o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="text" id="email" name="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" placeholder='Enter your password'/>
            </div>
            <Button>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Admin
