package com.example.intermove;

import com.example.intermove.Proprety.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.websocket.server.ServerEndpoint;


@SpringBootApplication
@EnableConfigurationProperties({FileStorageProperties.class})
@EnableScheduling
public class InterMoveApplication  extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(InterMoveApplication.class);
    }
    public static void main(String[] args) {
        SpringApplication.run(InterMoveApplication.class, args);
    }

}
