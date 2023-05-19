package ru.vsu.cs.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.Channel;
import ru.vsu.cs.api.models.Member;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.repositories.MemberRepository;

import java.math.BigInteger;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<Member> getMembersByUser(User user) {
        return memberRepository.findByUser(user);
    }

    public List<Member> getMembersByChannel(Channel channel) {
        return memberRepository.findByChannel(channel);
    }

    @Transactional
    public void save(Member member) {
        memberRepository.save(member);
    }

    @Transactional
    public void delete(BigInteger id) {
        memberRepository.deleteById(id);
    }
}
