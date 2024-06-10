function Pagination({
  totalPosts,
  postPerPage,
  handlePageChange,
  currentPage,
}) {
  let pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i)
  }
  let btnStyleStr =
    'w-10 h-10 mx-2 text-sm font-semibold border-1 border-[#e5e5e5] rounded-md cursor-pointer duration-1000  ease-in-out'
  return (
    <>
      {pages.length > 1 && (
        <ul className="flex justify-center flex-wrap m-4 ">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={
                  parseInt(currentPage) === page
                    ? btnStyleStr + ' text-white bg-black'
                    : btnStyleStr + ' bg-white text-black'
                }
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
export default Pagination
