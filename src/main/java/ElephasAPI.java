import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

// @SpringBootApplication instead of @EnableAutoConfiguration and @ComponentScan
@EnableSwagger2
@EnableAutoConfiguration
//@SpringBootApplication
@ComponentScan({"controllers"})
public class ElephasAPI extends SpringBootServletInitializer {

    @Bean
    public Docket bidderApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .paths(PathSelectors.regex("/.*"))
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Elephas API")
                .description("")
                .termsOfServiceUrl("")
                .contact("")
                .license("")
                .licenseUrl("")
                .version("0.9")
                .build();
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ElephasAPI.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(ElephasAPI.class, args);
    }

}
