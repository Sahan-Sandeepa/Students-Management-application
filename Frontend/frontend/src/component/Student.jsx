import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Student = () => {
  const [studentid, setStudentid] = useState("");
  const [studentname, setStudentName] = useState("");
  const [studentaddress, setStudentAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setStudent] = useState([]);

  const Load = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/student/getAll"
    );
    setStudent(result.data);
    console.log(result.data);
  };

  const save = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/student/save", {
        studentname: studentname,
        studentaddress: studentaddress,
        mobile: mobile,
      });
      alert("Student Registration Successfully");
      setStudentid("");
      setStudentName("");
      setStudentAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("User Registration Failed");
    }
  };

  const editStudent = async (students) => {
    setStudentName(students.studentname);
    setStudentAddress(students.studentaddress);
    setMobile(students.mobile);
    setStudentid(students._id);
  };

  const DeleteStudent = async (studentid) => {
    await axios.delete(
      "http://localhost:8080/api/v1/student/delete/" + studentid
    );
    alert("Student deleted Successfully");
    Load();
  };

  const update = async (event) => {
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
      setStudentid("");
      setStudentName("");
      setStudentAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("Student Update Failed");
    }
  };

  useEffect(() => {
    (async () => await Load())();
  }, []);

  return (
    <div>
      <h1>Student Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <label>Student Name</label>
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

          <div className="form-group">
            <label>Student Address</label>
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

          <div className="form-group">
            <label>Mobile</label>
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

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>

            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Student Address</th>
            <th scope="col">Student Mobile</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {students?.map((student) => (
          <tbody key={student._id}>
            <tr>
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
                  onClick={() => DeleteStudent(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Student;
