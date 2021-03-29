import "./App.css";
import { useState } from "react";
import { STUDENTS } from "./mock-data";

function App() {
  const [students, setStudents] = useState(STUDENTS);

  const [model, setModel] = useState(false);

  const [registerForm, setRegisterForm] = useState(false);

  const [deleteID, setDeleteID] = useState(0);

  const [regID, setRegID] = useState(STUDENTS.length + 2);

  const [regName, setRegName] = useState("");

  const [regBirthDate, setRegBirthDate] = useState("");

  const [regEmail, setRegEmail] = useState("");

  const [regPhone, setRegPhone] = useState("");

  function removeForm(id) {
    setModel(true);
    setDeleteID(id);
  }

  function deleteStudent(id) {
    setStudents(students.filter((ele) => ele.id !== id));
    setModel(false);
  }

  function createStudent() {
    let arr = [...students];
    const obj = new Object();
    setRegID(regID + 1);
    obj.id = regID;
    obj.name = regName;
    obj.email = regEmail;
    obj.phone = regPhone;
    obj.birthday = regBirthDate;
    arr.unshift(obj);
    setStudents(arr);
    setRegisterForm(false);
  }

  const List = students.map((student) => (
    <tr>
      <td>{student.name}</td>
      <td>{student.birthday}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>
        <span className="edit-text">
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
    <div className="container">
      <div className="list-table">
        <div className="table-title">Danh sách học viên</div>
        <div className="add-btn">
          <span>
            <button onClick={() => setRegisterForm(true)}>
              <i className="add-student-btn fa fa-plus-circle"></i> Thêm học
              viên
            </button>
          </span>
        </div>
        {registerForm && (
          <div className="resister-form-container">
            <div className="register-form">
              <div className="resister-form-text">
                <p>New Student information</p>
              </div>
              <div className="resister-form-input">
                <label htmlFor="register-name">Name</label>
                <input
                  type="text"
                  id="register-name"
                  onChange={(event) => setRegName(event.target.value)}
                ></input>
                <label htmlFor="register-birthday">Date of birth</label>
                <input
                  type="text"
                  id="register-birthday"
                  onChange={(event) => setRegBirthDate(event.target.value)}
                ></input>
                <label htmlFor="register-email">Email</label>
                <input
                  type="text"
                  id="register-email"
                  onChange={(event) => setRegEmail(event.target.value)}
                ></input>
                <label htmlFor="register-phone">Phone Number</label>
                <input
                  type="text"
                  id="register-phone"
                  onChange={(event) => setRegPhone(event.target.value)}
                ></input>
              </div>
              <div className="delete-group-btn">
                <button className="confirm-btn" onClick={() => createStudent()}>
                  Create New
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setRegisterForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {model && (
          <div
            className="delete-form-container"
            onClick={() => setModel(false)}
          >
            <div className="delete-form">
              <div className="delete-form-text">
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="delete-group-btn">
                <button
                  className="confirm-delete-btn"
                  onClick={() => deleteStudent(deleteID)}
                >
                  Yes
                </button>
                <button className="cancel-btn" onClick={() => setModel(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <td>Họ tên</td>
              <td>Năm sinh</td>
              <td>Email</td>
              <td>Số Điện Thoại</td>
              <td></td>
            </tr>
          </thead>
          <tbody>{List}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
