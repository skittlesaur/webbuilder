'use client'
import { Avatar, AvatarImage, AvatarFallback, Input } from 'ui'
import { useState } from 'react'
import cn from 'classnames'
import { toast } from 'sonner'
import FullLoader from '@/components/full-loader'
import useUser from '@/resolvers/use-user'
import Spinner from '@/components/spinner'
import uploadImage from '@/lib/upload-image'
import api from '@/lib/api'
import getErrorMessage from '@/lib/get-error-message'
import { useRouter } from 'next/navigation'

const ProfilesPage = () => {
  const router = useRouter()

  const { user, isUserLoading, mutateUser } = useUser()

  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [nameInput, setNameInput] = useState(user?.name)
  const [username, setUsername] = useState(user?.username)
  const [isSaving, setIsSaving] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setImage(URL.createObjectURL(file))

    try {
      setIsLoading(true)

      const url = await uploadImage(file)

      await api.put('/user', {
        avatar: url,
      })

      await mutateUser()
    } catch (err) {
      toast.error(getErrorMessage(err) as string)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    try {
      setIsSaving(true)
      setImage(user?.avatar)

      await api.put('/user', {
        name: nameInput,
        username,
      })

      await mutateUser()

      toast.success('Profile updated successfully')
    } catch (err) {
      toast.error(getErrorMessage(err) as string)
    } finally {
      setIsSaving(false)
    }
  }

  const name = user?.name || user?.username
  const twoCharsName = name?.slice(0, 2).toUpperCase() || 'BU'

  if (isUserLoading) return <FullLoader title="Loading Profile" />

  return (
    <div className="flex flex-col max-w-screen-md gap-8 py-10 mx-auto md:py-20">
      <div className="flex flex-col gap-1 pb-10 border-b border-border">
        <button
          className="self-start px-2 py-1 mb-2 -ml-2 text-xs rounded hover:bg-accent text-neutral-400"
          type="button"
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              router.back()
            } else {
              router.push('/app')
            }
          }}>
          Back
        </button>
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
            <div className="absolute inset-0 z-10 bg-background/70">
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
              <AvatarImage
                alt={`${name}'s avatar`}
                src={image || user?.avatar}
              />
              <AvatarFallback className="text-4xl">
                {twoCharsName}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm">Email</p>
        <p className="text-neutral-400">{user?.email}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="username">
            Username
          </label>
          <Input
            defaultValue={user?.username}
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="name">
            Name
          </label>
          <Input
            defaultValue={user?.name}
            id="name"
            name="name"
            placeholder="Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <button
          className="col-span-2 px-4 py-2 tracking-wider uppercase border rounded-md bg-primary hover:bg-primary-700 disabled:bg-accent border-border disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            isSaving ||
            (nameInput === user?.name &&
              (!username || username === user?.username))
          }
          type="button"
          onClick={handleUpdateProfile}>
          {isSaving ? 'Updating Profile...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default ProfilesPage
