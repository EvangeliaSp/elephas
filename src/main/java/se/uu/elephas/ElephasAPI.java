package se.uu.elephas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import se.uu.elephas.services.StorageService;


@SpringBootApplication
@ComponentScan({"se.uu.elephas.controllers", "se.uu.elephas.services"})
public class ElephasAPI extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ElephasAPI.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(ElephasAPI.class, args);
    }

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> {
            storageService.init();
        };
    }
}
