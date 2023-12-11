const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-[100dvh] flex-1 max-w-xl mx-auto px-8">
      <div className="h-[65dvh] max-h-[35rem] w-full flex flex-col items-center justify-between gap-10">{children}</div>
    </main>
  )
}

export default OnboardingLayout
