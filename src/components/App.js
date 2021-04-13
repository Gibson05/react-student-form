import "./App.css";
import { useState, useEffect } from "react";
import { URL } from "../mock-data";
import Table from "./table.js";
import DeleteModal from "./DeleteModal.js";
import Modal from "./RegModal.js";
import Pagination from "./Pagination.js";
import { getUser } from "../api.js";
import { useHistory } from "react-router-dom"


function App() {
  const [students, setStudents] = useState([]);
  const [model, setModel] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [deleteID, setDeleteID] = useState(0);
  const [regID, setRegID] = useState(students.length + 2);
  const [regName, setRegName] = useState("");
  const [regBirthDate, setRegBirthDate] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [sorting, setSorting] = useState(true);
  const [totalItem, setTotalItem] = useState(0);
  const [sortProp, setSortProp] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [spinner, setSpinner] = useState(false);

  const history = useHistory()

  useEffect(() => {
    setSpinner(true);
    async function fetchData() {
      const { data, totalCount } = await getUser(1);
      setStudents(data);
      setTotalItem(totalCount);
      setSpinner(false);
    }
    fetchData();
    console.log(localStorage.getItem("token"));
    if (!localStorage.getItem("token")) {
      history.push("/login")
    }
  }, [history]);

  function removeForm(id) {
    setModel(true);
    setDeleteID(id);
  }

  function deleteStudent(id) {
    fetch(`${URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + localStorage.getItem("token"),
      },
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
        "Authorization": "Bearer " + localStorage.getItem("token")
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
        "Authorization": "Bearer " + localStorage.getItem("token")
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
    const { data } = await getUser(1, prop, "asc");
    setStudents(data);
    setSortProp(prop);
    setSortDirection("asc");
    setSorting(false);
    setActivePage(1);
  }

  async function sortDESC(prop) {
    const { data } = await getUser(1, prop, "desc");
    setStudents(data);
    setSortProp(prop);
    setSortDirection("desc");
    setSorting(true);
    setActivePage(1);
  }

  async function goToPage(page) {
    setStudents([]);
    setSpinner(true);
    const { data } = await getUser(page, sortProp, sortDirection);
    setActivePage(page);
    setSpinner(false);
    setStudents(data);
  }

  return (
    <div className="container">
      <>
        <Table
          createStudentForm={createStudentForm}
          sorting={sorting}
          sortASC={sortASC}
          sortDESC={sortDESC}
          students={students}
          editStudentForm={editStudentForm}
          removeForm={removeForm}
          spinner={spinner}
        />
        <Pagination
          totalItem={totalItem}
          goToPage={goToPage}
          activePage={activePage}
        />
      </>

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
