import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table, Container, Modal } from "react-bootstrap";

const Student = () => {
  const [studentid, setStudentid] = useState("");
  const [studentname, setStudentName] = useState("");
  const [studentaddress, setStudentAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setStudent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

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

    // Check if the student already exists
    const existingStudent = students.find(
      (student) => student.studentname === studentname
    );

    if (existingStudent) {
      setModalContent("Student already exists!");
      setShowModal(true);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/student/save", {
        studentname: studentname,
        studentaddress: studentaddress,
        mobile: mobile,
      });
      setModalContent("Student registration successful!");
      setShowModal(true);
      clearFields();
      loadStudents();
    } catch (err) {
      console.error(err);
      setModalContent("Student registration failed!");
      setShowModal(true);
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
      setModalContent("Student deleted successfully!");
      setShowModal(true);
      loadStudents();
    } catch (err) {
      console.error(err);
      setModalContent("Failed to delete student!");
      setShowModal(true);
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
      setModalContent("Student details updated!");
      setShowModal(true);
      clearFields();
      loadStudents();
    } catch (err) {
      console.error(err);
      setModalContent("Failed to update student details!");
      setShowModal(true);
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
    <div className="bg-light py-5" style={{ minHeight: "100vh" }}>
      <Container className="bg-white p-5 rounded">
        <h1 className="text-center text-dark mb-4">Student Details</h1>
        <Form>
          <Form.Group className="mb-3" controlId="studentname">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              value={studentname}
              onChange={(event) => {
                setStudentName(event.target.value);
              }}
              style={{ backgroundColor: "#f8f9fa" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="studentaddress">
            <Form.Label>Student Address</Form.Label>
            <Form.Control
              type="text"
              value={studentaddress}
              onChange={(event) => {
                setStudentAddress(event.target.value);
              }}
              style={{ backgroundColor: "#f8f9fa" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
              style={{ backgroundColor: "#f8f9fa" }}
            />
          </Form.Group>

          <div className="text-center">
            <Button className="me-2" variant="primary" onClick={saveStudent}>
              Register
            </Button>
            <Button variant="warning" onClick={updateStudent}>
              Update
            </Button>
          </div>
        </Form>
      </Container>
      <br />
      <Table
        striped
        bordered
        hover
        variant="info"
        className="mx-auto w-75"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Address</th>
            <th>Student Mobile</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr key={student._id}>
              <td>{student.studentname}</td>
              <td>{student.studentaddress}</td>
              <td>{student.mobile}</td>
              <td>
                <Button
                  className="me-2"
                  variant="warning"
                  onClick={() => editStudent(student)}
                  style={{ backgroundColor: "#ffc107" }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteStudent(student._id)}
                  style={{ backgroundColor: "#dc3545" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Student;
