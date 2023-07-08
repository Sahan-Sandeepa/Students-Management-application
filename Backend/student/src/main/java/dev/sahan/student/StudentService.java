package dev.sahan.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public void saveOrUpdate(Student student) {

        studentRepository.save(student);

    }

    public Iterable<Student> listAll() {
        return this.studentRepository.findAll();
    }

    public void deleteStudent(String _id) {
        studentRepository.deleteById(_id);
    }

    public Student getStudentById(String id) {
        
        return studentRepository.findById(id).get();
        
    }
    
}
