package com.example.intermove.Services.forum;



import com.example.intermove.Controllers.forum.ResourceNotFoundException;
import com.example.intermove.Entities.forum.Comment;
import com.example.intermove.Repositories.forum.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll(Sort.by(Sort.Direction.DESC, "created_at"));
    }

    public Comment getCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "commentID", commentId));
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long commentId, Comment commentDetails) {
        Comment comment = getCommentById(commentId);
        comment.setContent(commentDetails.getContent());
        comment.setCreated_at(commentDetails.getCreated_at());
        return commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
    public List<Comment> findAllByPostId(Long postId) {
        return commentRepository.findAllByPostId(postId);}
}
