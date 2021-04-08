import { Link } from "react-router-dom"
export default function Table({
  students,
  editStudentForm,
  removeForm,
  setLoginPage,
  createStudentForm,
  sorting,
  sortASC,
  sortDESC
}) {
  const List = students.map((student) => (
    <tr key={student.id}>
      <td>{student.name}</td>
      <td>{student.birthday}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>
        <span className="edit-text" onClick={() => editStudentForm(student.id)}>
          <i className="fa fa-edit"></i> Chỉnh Sửa
        </span>
        |
        <span className="delete-text" onClick={() => removeForm(student.id)}>
          <i className="fa fa-trash-o"></i> Xóa
        </span>
      </td>
    </tr>
  ));

  return (
    <div className="list-table">
      <button className="logout-btn">
      <Link to="/login">Logout</Link>
      </button>
      <div className="table-title">Danh sách học viên</div>
      <div className="add-btn">
        <span>
          <button onClick={createStudentForm}>
            <i className="add-student-btn fa fa-plus-circle"></i> Thêm học viên
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
                  onClick={() => sortASC("name")}
                  className="sorting fa fa-angle-up"
                ></span>
              ) : (
                <span
                  onClick={() => sortDESC("name")}
                  className="sorting fa fa-angle-down"
                ></span>
              )}
            </td>
            <td>Năm sinh</td>
            <td>
              Email{" "}
              {sorting ? (
                <span
                  onClick={() => sortASC("email")}
                  className="sorting fa fa-angle-up"
                ></span>
              ) : (
                <span
                  onClick={() => sortDESC("email")}
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
  );
}
