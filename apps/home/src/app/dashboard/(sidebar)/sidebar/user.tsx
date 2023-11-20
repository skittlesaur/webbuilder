import { Avatar, AvatarImage, AvatarFallback } from 'ui'
import useUser from '@/resolvers/use-user'

const SidebarUserAvatar = () => {
  const { user, isUserLoading } = useUser()

  if (isUserLoading)
    return <div className="animate-pulse w-10 h-10 rounded-full bg-accent" />

  const name = user.name || user.username
  const twoCharsName = name.slice(0, 2).toUpperCase()

  return (
    <Avatar>
      <AvatarImage alt={`${name}'s avatar`} src={user.avatar} />
      <AvatarFallback>{twoCharsName}</AvatarFallback>
    </Avatar>
  )
}

const SidebarUserDetails = () => {
  const { user, isUserLoading } = useUser()

  return (
    <div className="flex flex-col gap-0.5">
      {isUserLoading ? (
        <>
          <div className="animate-pulse w-10 h-4 bg-accent rounded-md" />
          <div className="animate-pulse w-24 h-4 bg-accent rounded-md" />
        </>
      ) : (
        <>
          <p className="font-bold text-sm">@{user.username}</p>
          <p className="text-xs text-gray-500 max-w-[20ch] truncate">
            {user.email}
          </p>
        </>
      )}
    </div>
  )
}

const SidebarUser = () => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <SidebarUserAvatar />
        <SidebarUserDetails />
      </div>
      {/* <div className="w-5 h-5 bg-red-50"></div> */}
    </div>
  )
}

export default SidebarUser
