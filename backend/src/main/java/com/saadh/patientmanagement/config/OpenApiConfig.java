package com.saadh.patientmanagement.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI patientApi() {

        Contact contact = new Contact();
        contact.setName("Mohamed Saadh");
        contact.setEmail("itzmesaadh@gmail.com");
        contact.setUrl("https://www.linkedin.com/in/itzmesaadh");

        return new OpenAPI()
                .info(new Info()
                        .title("Patient Management System API")
                        .version("1.0")
                        .description("REST API for managing patients using Spring Boot")
                        .contact(contact)
                );
    }
}
