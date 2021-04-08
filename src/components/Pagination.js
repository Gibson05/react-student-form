export default function Pagination ( { goToPage, totalItem }) {
    let totalPages = Math.round(totalItem / 8)
    let pagesItem = []
        for(let i = 1; i <= totalPages; i++) {
                pagesItem.push(i)
            }

    const Pages = pagesItem.map(page => (
        <span onClick={() => goToPage(page)}>{page}</span>
    ))
                
    return (
        <div className="paging">
            {Pages}
        </div>
    )
}