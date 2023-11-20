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

const UserProfile = () => {
  const router = useRouter()

  const user = {
    name: 'Baraa',
    username: 'baraa',
    avatar: 'https://baraa.app/profile.jpeg',
  }

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
            router.push(`/profiles/${user.username}`)
          }}>
          View profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push('/settings')
          }}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push('/download')
          }}>
          Download Application
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile
