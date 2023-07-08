package dev.sahan.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/student")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
        

    @PostMapping(value = "/save")
    private String saveStudent(@RequestBody Student student){

    studentService.saveOrUpdate(student);
        return student.get_id();
    }

    @GetMapping(value = "/getAll")
    private Iterable<Student> getStudent() {
        return studentService.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    private Student update(@RequestBody Student student, @PathVariable(name = "id") String _id) {

        student.set_id(_id);
        studentService.saveOrUpdate(student);
        return student;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteStudent(@PathVariable("id") String _id) {
        studentService.deleteStudent(_id);
    }

    @RequestMapping("/search/{id}")
    private Student getStudent(@PathVariable(name = "id") String id) {
        return studentService.getStudentById(id);
    }
}
