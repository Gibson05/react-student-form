import "./App.css";
import { useState, useEffect } from "react";
import { STUDENTS } from "./mock-data";
import Login from "./components/login.js";
import Table from "./components/table.js";
import DeleteModal from "./components/delete-modal.js";
import Modal from "./components/reg-modal.js";

function App() {
  const [students, setStudents] = useState([]);
  const [model, setModel] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [deleteID, setDeleteID] = useState(0);
  const [regID, setRegID] = useState(STUDENTS.length + 2);
  const [regName, setRegName] = useState("");
  const [regBirthDate, setRegBirthDate] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [sorting, setSorting] = useState(true);
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch(
        "https://gibson-test-database.herokuapp.com/users"
      );
      const data = await res.json();
      setStudents(data);
    }
    console.log("get data");
    getUsers();
  }, []);

  function removeForm(id) {
    setModel(true);
    setDeleteID(id);
  }

  function deleteStudent(id) {
    fetch(`https://gibson-test-database.herokuapp.com/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setStudents(students.filter((ele) => ele.id !== id));
    setModel(false);
  }

  function createStudentForm() {
    setRegisterForm(true);
    setRegID("");
    setRegName("");
    setRegEmail("");
    setRegPhone("");
    setRegBirthDate("");
  }

  async function createStudent() {
    let arr = [...students];
    setRegID(regID + 1);
    const obj = {
      // id: regID,
      name: regName,
      email: regEmail,
      phone: regPhone,
      birthday: regBirthDate,
    };

    fetch("https://gibson-test-database.herokuapp.com/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        arr.unshift(data);
        setStudents(arr);
        setRegisterForm(false);
      });
  }

  function editStudentForm(id) {
    setRegisterForm(true);
    setEditForm(true);
    let obj = students.find((ele) => ele.id === id);
    setRegID(obj.id);
    setRegName(obj.name);
    setRegEmail(obj.email);
    setRegPhone(obj.phone);
    setRegBirthDate(obj.birthday);
  }

  function editStudent() {
    let arr = [...students];
    let index = arr.findIndex((ele) => ele.id === regID);
    arr[index].name = regName;
    arr[index].email = regEmail;
    arr[index].phone = regPhone;
    arr[index].birthday = regBirthDate;

    fetch(`https://gibson-test-database.herokuapp.com/users/${regID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arr[index]),
    });

    setStudents(arr);
    setRegisterForm(false);
    setEditForm(false);
  }

  function cancelAllForm() {
    setEditForm(false);
    setRegisterForm(false);
  }

  function sortingASC() {
    let arr = [...students];
    arr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    setStudents(arr);
    setSorting(false);
  }

  function sortingDESC() {
    let arr = [...students];
    arr.sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0));
    setStudents(arr);
    setSorting(true);
  }

  function sortingEmailASC() {
    let arr = [...students];
    arr.sort((a, b) => (a.email > b.email ? 1 : b.email > a.email ? -1 : 0));
    setStudents(arr);
    setSorting(false);
  }

  function sortingEmailDESC() {
    let arr = [...students];
    arr.sort((a, b) => (a.email > b.email ? -1 : b.email > a.email ? 1 : 0));
    setStudents(arr);
    setSorting(true);
  }

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
    <div className="container">
      {loginPage ? (
        <Login setLoginPage={setLoginPage} />
      ) : (
        <Table
          setLoginPage={setLoginPage}
          createStudentForm={createStudentForm}
          sorting={sorting}
          sortingASC={sortingASC}
          sortingDESC={sortingDESC}
          sortingEmailASC={sortingEmailASC}
          sortingEmailDESC={sortingEmailDESC}
          List={List}
        />
      )}

      {model && (
        <DeleteModal
          setModel={setModel}
          deleteStudent={deleteStudent}
          deleteID={deleteID}
        />
      )}
      {registerForm && (
        <Modal
          editForm={editForm}
          regName={regName}
          setRegName={setRegName}
          regBirthDate={regBirthDate}
          setRegBirthDate={setRegBirthDate}
          regEmail={regEmail}
          setRegEmail={setRegEmail}
          regPhone={regPhone}
          setRegPhone={setRegPhone}
          editStudent={editStudent}
          createStudent={createStudent}
          cancelAllForm={cancelAllForm}
        />
      )}
    </div>
  );
}

export default App;
