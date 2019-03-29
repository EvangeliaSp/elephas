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
//@EntityScan({"se.uu.elephas.services"})
//@EnableJpaRepositories("se.uu.elephas.repository")
public class ElephasAPI extends SpringBootServletInitializer {

//    @Bean
//    public Docket bidderApi() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .apiInfo(apiInfo())
//                .select()
//                .paths(PathSelectors.regex("/.*"))
//                .build();
//    }
//
//    private ApiInfo apiInfo() {
//        return new ApiInfoBuilder()
//                .title("Elephas API")
//                .description("")
//                .termsOfServiceUrl("")
//                .contact("")
//                .license("")
//                .licenseUrl("")
//                .version("0.9")
//                .build();
//    }

    //    @Bean
//    public BCryptPasswordEncoder bCryptPasswordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

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
            // deletes all current images in the folder
            // storageService.deleteAll();
            storageService.init();
        };
    }
}
