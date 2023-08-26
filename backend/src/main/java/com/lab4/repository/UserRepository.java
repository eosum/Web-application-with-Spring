package com.lab4.repository;

import com.lab4.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsUserByLogin(String login);

    User getUserByLogin(String login);
}
