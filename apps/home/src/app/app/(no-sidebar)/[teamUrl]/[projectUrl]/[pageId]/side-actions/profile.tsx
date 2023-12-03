'use client'

import { useRouter } from 'next/navigation'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui'
import useUser from '@/resolvers/use-user'

const UserProfile = () => {
  const router = useRouter()
  const { user } = useUser()

  const name = user?.name || user?.username
  const twoCharsName = name?.slice(0, 2).toUpperCase() || 'BU'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-full select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          type="button">
          <Avatar>
            <AvatarImage alt={`${name}'s avatar`} src={user?.avatar} />
            <AvatarFallback>{twoCharsName}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="ml-4 flex flex-col gap-0.5"
        sideOffset={10}>
        <DropdownMenuItem
          onClick={() => {
            router.push('/profile')
          }}>
          View profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile
