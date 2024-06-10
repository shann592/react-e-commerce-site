function Table({ headings, children }) {
  return (
    <table className="w-full mb-16px border-collapse bg-white shadow-md">
      <thead className="*:h-12 *:bg-[#363041] text-white *:uppercase">
        <tr>
          {headings.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  )
}
export default Table
