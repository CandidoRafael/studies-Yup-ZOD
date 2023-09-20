import { useState, useEffect } from 'react'
import { z } from 'zod';

const useUsers = () => {
    
const UserSchema = z.object({
  id: z.number(),
  name: z.string().max(100)
})

const UsersSchema = z.array(UserSchema)

type Users = z.infer<typeof UsersSchema>

    const [users, setUsers] = useState<Users>([])
    const [error, setError] = useState<string>('')

    useEffect(() => {
      const url = 'users.json'  
        fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
            const result = UsersSchema.safeParse(json)
            
            if(result.success) {
                setUsers(result.data)
            } else {
                console.log(result.error)
                setError(result.error.message)
            }
        })
    }, [])

    return { users, error }
}

export default useUsers