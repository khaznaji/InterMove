package com.example.intermove.Controllers.SkillsAndQuizz;


import com.example.intermove.Entities.SkillsAndQuizz.Question;
import com.example.intermove.Entities.SkillsAndQuizz.Quiz;
import com.example.intermove.Entities.SkillsAndQuizz.Response;
import com.example.intermove.Entities.User.User;
import com.example.intermove.Services.SkillsAndQuizz.IServiceQuiz;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")

public class QuizController {
    private IServiceQuiz serviceQuiz;

    public QuizController(IServiceQuiz serviceQuiz) {
        this.serviceQuiz = serviceQuiz;
    }
    @PostMapping("/addQuiz")
    public void addQuiz(@RequestBody Quiz quiz){
        serviceQuiz.addQuiz(quiz);
    }
    @PostMapping("/addQuestionToQuiz/{idQuiz}")
    public void addQuestionToQuiz(@RequestBody Question question, @PathVariable int idQuiz){
        serviceQuiz.addQuestionToQuiz(idQuiz,question);
    }
    @PostMapping("/addResponseToQuestion/{questionId}/{studentId}")
    public void addResponseToQuestion(@PathVariable Integer questionId, @RequestBody StudentResponse studentResponses, @PathVariable int studentId){
        serviceQuiz.addResponseToQuestion(questionId, studentResponses.getStudentResponse(), studentId);
    }
    @GetMapping("/displayQuiz")
    public List<Quiz> displayQuiz(){
        return serviceQuiz.displayQuiz();
    }
    @GetMapping("/displayQuestion")
    public List<Question> displayQuestion(){
        return serviceQuiz.displayQuestion();
    }
    @GetMapping("/displayResponse")
    public List<Response> displayResponse(){
        return serviceQuiz.displayResponse();
    }
    @DeleteMapping("/deleteQuiz/{idQuiz}")
    public void deleteQuiz(@PathVariable Integer idQuiz){
        serviceQuiz.deleteQuiz(idQuiz);
    }
    @DeleteMapping("/deleteQuestion/{idQuestion}")
    public void deleteQuestion(@PathVariable Integer idQuestion){
        serviceQuiz.deleteQuestion(idQuestion);
    }
    @PutMapping("/updateQuiz")
    public void updateQuiz(@RequestBody Quiz quiz){
        serviceQuiz.updateQuiz(quiz);
    }
    @PutMapping("/updateQuestion")
    public void updateQuestion(@RequestBody Question Question){
        serviceQuiz.updateQuestion(Question);
    }
    @GetMapping("/diplayShuffledQuestionOfQuiz/{idQuiz}")
    public List<Question> shuffleResponses(@PathVariable int idQuiz){
        return serviceQuiz.shuffleResponses(idQuiz);
    }
    @GetMapping("/displayUsersByScore")
    public List<User> sortByScore(){
        return serviceQuiz.getUsersByScore();
    }
    @GetMapping("/getMostRespondedQuestionOnQuiz/{idQuiz}")
    public Question getMostRespondedQuestionOnQuiz(@PathVariable int idQuiz){
        return serviceQuiz.getMostRespondedQuestionOnQuiz(idQuiz);
    }
}
@Getter
@Setter
class StudentResponse{
    List<String> studentResponse;
}