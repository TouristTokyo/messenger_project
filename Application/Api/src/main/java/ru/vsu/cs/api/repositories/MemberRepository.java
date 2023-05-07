package ru.vsu.cs.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vsu.cs.api.models.Member;
import ru.vsu.cs.api.models.User;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, BigInteger> {
    List<Member> findByUser(User user);
}
