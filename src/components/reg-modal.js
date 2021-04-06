export default function Modal({ editForm, regName, setRegName, regBirthDate, setRegBirthDate, regEmail, setRegEmail, regPhone, setRegPhone, editStudent, createStudent, cancelAllForm }) {
    return (
        <div className="resister-form-container">
          <div className="register-form">
            <div className="resister-form-text">
              {editForm ? (
                <p>Edit Student information</p>
              ) : (
                <p>New Student information</p>
              )}
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
                type="email"
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
              {editForm ? (
                <button
                  type="submit"
                  className="confirm-edit-btn"
                  onClick={() => editStudent()}
                >
                  Edit Student
                </button>
              ) : (
                <button
                  type="submit"
                  className="confirm-btn"
                  onClick={() => createStudent()}
                >
                  Create New
                </button>
              )}

              <button className="cancel-btn" onClick={() => cancelAllForm()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
    )
}