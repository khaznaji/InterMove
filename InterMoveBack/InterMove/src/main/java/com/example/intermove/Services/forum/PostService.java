package com.example.intermove.Services.forum;


import com.example.intermove.Controllers.forum.ResourceNotFoundException;

import com.example.intermove.Entities.forum.Post;

import com.example.intermove.Repositories.forum.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(long postId) {
        return postRepository.findById(  postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "postID", postId));
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Post updatePost(long postId, Post newPost) {

        return postRepository.save(newPost);
    }

    public void deletePost(long postId) {
        postRepository.deleteById((long)postId);
    }
}

