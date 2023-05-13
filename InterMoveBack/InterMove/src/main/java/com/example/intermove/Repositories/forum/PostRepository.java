package com.example.intermove.Repositories.forum;


import com.example.intermove.Entities.forum.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
