export default function Pagination ( { goToPage, totalItem, activePage } ) {
    let totalPages = Math.ceil(totalItem / 8)
    let pagesItem = []
        for(let i = 1; i <= totalPages; i++) {
                pagesItem.push(i)
            }

    const Pages = pagesItem.map(page => {
        if (activePage === page) {
            return <span className="active" onClick={() => goToPage(page)}>{page}</span>
        } else {
            return <span onClick={() => goToPage(page)}>{page}</span>
        }
    })
                
    return (
        <div className="paging">
            {Pages}
        </div>
    )
}