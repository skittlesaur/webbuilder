const UnstyledDisplay = () => {
  return (
    <span
      className="block relative h-32 w-[calc(100%-0.125rem*2)] before:content-[''] mx-auto"
      style={{
        background: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='13' ry='13' stroke='%23923FDEFF' stroke-width='4' stroke-dasharray='10' stroke-dashoffset='15' stroke-linecap='butt'/%3e%3c/svg%3e")`,
      }}
    />
  )
}

export default UnstyledDisplay
