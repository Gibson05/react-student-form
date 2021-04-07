import "./App.css";
import { useState, useEffect } from "react";
import { STUDENTS, URL } from "./mock-data";
import Login from "./components/login.js";
import Table from "./components/table.js";
import DeleteModal from "./components/DeleteModal.js";
import Modal from "./components/RegModal.js";
import getUser from "./api.js";

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
  const [totalItem, setTotalItem] = useState(0);
  const [sortProp, setSortProp] = useState("")
  const [sortDirection, setSortDirection] = useState("")
  

  useEffect(() => {
    async function fetchData() {
      const { data, totalCount } = await getUser(1);
      setStudents(data)
      setTotalItem(totalCount)
    }
    fetchData()
  }, []);

  function removeForm(id) {
    setModel(true);
    setDeleteID(id);
  }

  function deleteStudent(id) {
    fetch(`${URL}${id}`, {
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

    fetch(`${URL}`, {
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

    fetch(`${URL}${regID}`, {
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

  async function sortASC(prop) {
    const { data, totalCount } = await getUser(1, prop, "asc")
    setStudents(data)
    setSortProp(prop)
    setSortDirection("asc")
    setSorting(false)
  }

  async function sortDESC(prop) {
    const { data, totalCount } = await getUser(1, prop, "desc")
    setStudents(data)
    setSortProp(prop)
    setSortDirection("desc")
    setSorting(true)
  }

  async function goToPage(page) {
    const { data, totalCount } = await getUser(page, sortProp, sortDirection);
    setStudents(data)
  }

  let totalPages = Math.round(totalItem / 8)
  let pagesItem = []
  for(let i = 1; i <= totalPages; i++) {
    pagesItem.push(i)
  }

  const Pages = pagesItem.map(page => (
    <span onClick={() => goToPage(page)}>{page}</span>
  ))

  return (
    <div className="container">
      {loginPage ? (
        <Login setLoginPage={setLoginPage} />
      ) : (
        <>
        <Table
          setLoginPage={setLoginPage}
          createStudentForm={createStudentForm}
          sorting={sorting}
          sortASC={sortASC}
          sortDESC={sortDESC}
          students={students} 
          editStudentForm={editStudentForm}
          removeForm={removeForm}
        />
        <div className="paging">
            {Pages}
        </div>
        </>
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
