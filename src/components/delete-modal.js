export default function DeleteModal({ setModel, deleteStudent, deleteID }) {
    return (
        <div className="delete-form-container" onClick={() => setModel(false)}>
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
    )
}