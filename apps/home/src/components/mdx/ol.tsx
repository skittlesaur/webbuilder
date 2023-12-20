const Ol = ({ children, start }) => (
  <ol
    className="flex flex-col gap-3 ol-mdx"
    style={{
      counterReset: `item ${(start || 1) - 1}`,
    }}>
    {children}
  </ol>
)

export default Ol
