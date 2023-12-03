'use client'
import { Avatar, AvatarImage, AvatarFallback } from 'ui'
import { useState } from 'react'
import cn from 'classnames'
import { toast } from 'sonner'
import FullLoader from '@/components/full-loader'
import useUser from '@/resolvers/use-user'
import Spinner from '@/components/spinner'
import uploadImage from '@/lib/upload-image'
import api from '@/lib/api'
import getErrorMessage from '@/lib/get-error-message'

const ProfilesPage = () => {
  const { user, isUserLoading, mutateUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setIsLoading(true)

      const url = await uploadImage(file)

      await mutateUser(
        () => {
          return api.post('/user/avatar', {
            avatar: url,
          })
        },
        {
          optimisticData: {
            ...user,
            avatar: url,
          },
          revalidate: false,
          rollbackOnError: true,
          populateCache: true,
        }
      )
    } catch (err) {
      toast.error(getErrorMessage(err) as string)
    } finally {
      setIsLoading(false)
    }
  }

  const name = user?.name || user?.username
  const twoCharsName = name?.slice(0, 2).toUpperCase() || 'BU'

  if (isUserLoading) return <FullLoader title="Loading Profile" />

  return (
    <div className="flex flex-col max-w-screen-md gap-4 py-10 mx-auto md:py-20">
      <div className="flex flex-col gap-1 pb-10 border-b border-border">
        <h1 className="text-2xl">Profile</h1>
        <p className="text-sm text-neutral-400">
          Manage your profile information.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="profile-picture">
          Profile Picture
        </label>
        <div
          className={cn(
            'relative w-40 h-40 overflow-hidden border rounded-full border-border',
            {
              'hover:border-primary': !isLoading,
            }
          )}>
          {isLoading ? (
            <div className="absolute inset-0 z-10 bg-background">
              <div className="relative flex items-center justify-center w-full h-full">
                <Spinner />
              </div>
            </div>
          ) : (
            <input
              accept="image/png, image/jpeg"
              className="absolute inset-0 z-10 opacity-0"
              disabled={isLoading}
              id="profile-picture"
              name="profile-picture"
              type="file"
              onChange={handleFileUpload}
            />
          )}
          <div className="[&_span]:w-40 [&_span]:h-40">
            <Avatar>
              <AvatarImage alt={`${name}'s avatar`} src={user?.avatar} />
              <AvatarFallback className="text-4xl">
                {twoCharsName}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilesPage
