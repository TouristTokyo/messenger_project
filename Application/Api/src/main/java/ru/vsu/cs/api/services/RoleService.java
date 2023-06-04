package ru.vsu.cs.api.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.Role;
import ru.vsu.cs.api.repositories.RoleRepository;

import java.math.BigInteger;

@Service
@Slf4j
public class RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Transactional
    public Role save(Role role) {
        log.info("Create role (" + role.getName() + ", " + role.getIsAdmin() + ", " + role.getIsCreator() + ")");
        return roleRepository.saveAndFlush(role);
    }

    @Transactional
    public Role update(BigInteger id, Role role) {
        role.setId(id);
        roleRepository.save(role);
        return role;
    }

    @Transactional
    public void delete(BigInteger id) {
        log.info("Deleted role with id: " + id);
        roleRepository.deleteById(id);
    }
}
