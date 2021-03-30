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

  const [editForm, setEditForm] = useState(false);

  function removeForm(id) {
    setModel(true);
    setDeleteID(id);
  }

  function deleteStudent(id) {
    setStudents(students.filter((ele) => ele.id !== id));
    setModel(false);
  }

  function createStudentForm() {
    setRegisterForm(true)
    setRegID("")
    setRegName("")
    setRegEmail("")
    setRegPhone("")
    setRegBirthDate("")
  }
  
  function createStudent() {
    let arr = [...students];
    setRegID(regID + 1);
    const obj = {
      id: regID,
      name: regName,
      email: regEmail,
      phone: regPhone,
      birthday: regBirthDate
    };
    arr.unshift(obj);
    setStudents(arr);
    setRegisterForm(false);
  }

  function editStudentForm(id) {
    setRegisterForm(true)
    setEditForm(true)
    let obj = students.find((ele) => ele.id === id)
    setRegID(obj.id)
    setRegName(obj.name)
    setRegEmail(obj.email)
    setRegPhone(obj.phone)
    setRegBirthDate(obj.birthday)
    console.log(obj);
  }

  function editStudent() {
    let arr = [...students]
    let index = arr.findIndex((ele) => ele.id === regID)
    arr[index].name = regName
    arr[index].email = regEmail
    arr[index].phone = regPhone
    arr[index].birthday = regBirthDate
    setStudents(arr)
    setRegisterForm(false)
    setEditForm(false)
  }

  function cancelAllForm() {
    setEditForm(false)
    setRegisterForm(false)
  }

  const List = students.map((student) => (
    <tr>
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
    <div className="container">
      <div className="list-table">
        <div className="table-title">Danh sách học viên</div>
        <div className="add-btn">
          <span>
            <button onClick={createStudentForm}>
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
                  value={regName}
                  onChange={(event) => setRegName(event.target.value)}
                ></input>
                <label htmlFor="register-birthday">Date of birth</label>
                <input
                  type="text"
                  id="register-birthday"
                  value={regBirthDate}
                  onChange={(event) => setRegBirthDate(event.target.value)}
                ></input>
                <label htmlFor="register-email">Email</label>
                <input
                  type="text"
                  id="register-email"
                  value={regEmail}
                  onChange={(event) => setRegEmail(event.target.value)}
                ></input>
                <label htmlFor="register-phone">Phone Number</label>
                <input
                  type="text"
                  id="register-phone"
                  value={regPhone}
                  onChange={(event) => setRegPhone(event.target.value)}
                ></input>
              </div>
              <div className="delete-group-btn">
                {editForm 
                ? <button className="confirm-edit-btn" onClick={() => editStudent()}>
                  Edit Student
                </button> 
                : <button className="confirm-btn" onClick={() => createStudent()}>
                  Create New
                </button>}
                
                <button
                  className="cancel-btn"
                  onClick={() => cancelAllForm()}
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
