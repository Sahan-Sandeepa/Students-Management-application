import React, { useEffect, useState } from "react";
import axios from "axios";

const Student = () => {
  const [studentid, setStudentid] = useState("");
  const [studentname, setStudentName] = useState("");
  const [studentaddress, setStudentAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setStudent] = useState([]);

  const loadStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/student/getAll"
      );
      setStudent(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveStudent = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/v1/student/save", {
        studentname: studentname,
        studentaddress: studentaddress,
        mobile: mobile,
      });
      alert("Student Registration Successful");
      clearFields();
      loadStudents();
    } catch (err) {
      alert("User Registration Failed");
    }
  };

  const editStudent = (student) => {
    setStudentName(student.studentname);
    setStudentAddress(student.studentaddress);
    setMobile(student.mobile);
    setStudentid(student._id);
  };

  const deleteStudent = async (studentid) => {
    try {
      await axios.delete(
        "http://localhost:8080/api/v1/student/delete/" + studentid
      );
      alert("Student deleted successfully");
      loadStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStudent = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        "http://localhost:8080/api/v1/student/edit/" + studentid,
        {
          studentname: studentname,
          studentaddress: studentaddress,
          mobile: mobile,
        }
      );
      alert("Details Updated");
      clearFields();
      loadStudents();
    } catch (err) {
      alert("Student Update Failed");
    }
  };

  const clearFields = () => {
    setStudentid("");
    setStudentName("");
    setStudentAddress("");
    setMobile("");
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-4">Student Details</h1>
      <div className="container mt-4">
        <form>
          <div className="mb-3">
            <label htmlFor="studentname" className="form-label">
              Student Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentname"
              value={studentname}
              onChange={(event) => {
                setStudentName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="studentaddress" className="form-label">
              Student Address
            </label>
            <input
              type="text"
              className="form-control"
              id="studentaddress"
              value={studentaddress}
              onChange={(event) => {
                setStudentAddress(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
            />
          </div>

          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={saveStudent}
            >
              Register
            </button>
            <button
              className="btn btn-warning mt-2"
              type="button"
              onClick={updateStudent}
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <br />
      <table className="table table-dark table-striped" align="center">
        <thead>
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Student Address</th>
            <th scope="col">Student Mobile</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr key={student._id}>
              <td>{student.studentname}</td>
              <td>{student.studentaddress}</td>
              <td>{student.mobile}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteStudent(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
