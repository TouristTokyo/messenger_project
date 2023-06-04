package ru.vsu.cs.api.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.Channel;
import ru.vsu.cs.api.models.Member;
import ru.vsu.cs.api.models.Role;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.repositories.MemberRepository;
import ru.vsu.cs.api.utils.exceptions.MemberException;

import java.math.BigInteger;
import java.util.List;

@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional(readOnly = true)
    public List<Member> getMembersByUser(User user) {
        return memberRepository.findByUser(user);
    }

    @Transactional(readOnly = true)
    public List<Member> getMembersByChannel(Channel channel) {
        return memberRepository.findByChannel(channel);
    }

    @Transactional(readOnly = true)
    public Member getMemberByUserAndChannel(User user, Channel channel) {
        Member member = memberRepository.findByUserAndChannel(user, channel).orElse(null);
        if (member == null) {
            log.info("Not found member with name (" + user.getName() + ") for channel with name ( "
                    + channel.getName() + ")");
            throw new MemberException("Не существует участника (" + user.getName() + ") в канале ("
                    + channel.getName() + ")");
        }

        return member;
    }

    @Transactional
    public void save(Member member) {
        log.info(member.getUser().getName() + " join to " + member.getChannel().getName());
        memberRepository.save(member);
    }

    @Transactional
    public void delete(BigInteger id) {
        log.info("Deleted member with id: " + id);
        memberRepository.deleteById(id);
    }

    @Transactional
    public void updateRole(Member member, Role role) {
        log.info("Updated role for member (" + member.getUser().getName() + "). New role: (" + role.getName() +
                ", " + role.getIsAdmin() + ")");
        member.setRole(role);
        memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public void checkUserInChannel(User user, Channel channel) {
        if (memberRepository.findByUserAndChannel(user, channel).isPresent()) {
            log.warn("Exist user (" + user.getName() + ") in the channel (" + channel.getName() + ")");
            throw new MemberException("Вы уже присоединились к данному каналу");
        }
    }

    public void checkCreator(Member member) {
        if (member.getRole().getIsCreator()) {
            log.warn("The creator (" + member.getUser().getName() + ")tried to leave the channel");
            throw new MemberException("Создатель не может покинуть канал");
        }
    }
}
