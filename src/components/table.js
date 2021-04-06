export default function Table( {setLoginPage, createStudentForm, sorting, sortingASC, sortingDESC, sortingEmailASC, sortingEmailDESC, List} ) {
    return (
    <div className="list-table">
          <button className="logout-btn" onClick={() => setLoginPage(true)}>Log out</button>
          <div className="table-title">Danh sách học viên</div>
          <div className="add-btn">
            <span>
              <button onClick={createStudentForm}>
                <i className="add-student-btn fa fa-plus-circle"></i> Thêm học
                viên
              </button>
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <td>
                  Họ tên{" "}
                  {sorting ? (
                    <span
                      onClick={sortingASC}
                      className="sorting fa fa-angle-up"
                    ></span>
                  ) : (
                    <span
                      onClick={sortingDESC}
                      className="sorting fa fa-angle-down"
                    ></span>
                  )}
                </td>
                <td>Năm sinh</td>
                <td>
                  Email{" "}
                  {sorting ? (
                    <span
                      onClick={sortingEmailASC}
                      className="sorting fa fa-angle-up"
                    ></span>
                  ) : (
                    <span
                      onClick={sortingEmailDESC}
                      className="sorting fa fa-angle-down"
                    ></span>
                  )}
                </td>
                <td>Số Điện Thoại</td>
                <td></td>
              </tr>
            </thead>
            <tbody>{List}</tbody>
          </table>
        </div>
    )
}