import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'ui'
import Link from 'next/link'
import useUser from '@/resolvers/use-user'
import api from '@/lib/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const SidebarUserAvatar = () => {
  const { user, isUserLoading } = useUser()

  if (isUserLoading)
    return <div className="w-10 h-10 rounded-full animate-pulse bg-accent" />

  const name = user?.name || user?.username
  const twoCharsName = name?.slice(0, 2).toUpperCase() || 'BU'

  return (
    <Avatar>
      <AvatarImage alt={`${name}'s avatar`} src={user?.avatar} />
      <AvatarFallback>{twoCharsName}</AvatarFallback>
    </Avatar>
  )
}

const SidebarUserDetails = () => {
  const { user, isUserLoading } = useUser()

  return (
    <div className="flex flex-col gap-0.5 items-start">
      {isUserLoading ? (
        <>
          <div className="w-10 h-4 rounded-md animate-pulse bg-accent" />
          <div className="w-24 h-4 rounded-md animate-pulse bg-accent" />
        </>
      ) : (
        <>
          <p className="text-sm font-bold">@{user?.username}</p>
          <p className="text-xs text-gray-500 max-w-[20ch] truncate">
            {user?.email}
          </p>
        </>
      )}
    </div>
  )
}

const SidebarUser = () => {
  const router = useRouter()
  const { mutateUser } = useUser()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center justify-between w-full gap-2"
          type="button">
          <div className="flex items-center gap-2">
            <SidebarUserAvatar />
            <SidebarUserDetails />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align="top" className="flex flex-col mb-2 ml-6 text-sm">
        <Link className="px-2 py-1 rounded hover:bg-accent" href="/profile">
          Profile
        </Link>
        <div className="w-full h-px my-2 bg-border" />
        <Link
          className="px-2 py-1 rounded hover:bg-accent text-start"
          href="/logout">
          Logout
        </Link>
      </PopoverContent>
    </Popover>
  )
}

export default SidebarUser
