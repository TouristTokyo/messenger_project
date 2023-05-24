package ru.vsu.cs.api;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Linking API", version = "1.0.0", description = "API для веб-мессенджера Linking"))
public class MessengerApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MessengerApiApplication.class, args);
    }

}
