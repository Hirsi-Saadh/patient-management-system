package com.saadh.patientmanagement.controller.patient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saadh.patientmanagement.controller.PatientController;
import com.saadh.patientmanagement.data.dto.patient.PatientRequestDTO;
import com.saadh.patientmanagement.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PatientController.class)
class PatientControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PatientService patientService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCreatePatient() throws Exception {
        PatientRequestDTO patientRequestDTO = new PatientRequestDTO();
        patientRequestDTO.setFirstName("FirstName");
        patientRequestDTO.setLastName("LastName");
        patientRequestDTO.setAddress("123 Main St");
        patientRequestDTO.setCity("City");
        patientRequestDTO.setState("State");
        patientRequestDTO.setZipCode("12345");
        patientRequestDTO.setPhoneNumber("123-456-7890");
        patientRequestDTO.setEmail("test@email.com");

        mockMvc.perform(post("/patient")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(patientRequestDTO)))
                .andExpect(status().isOk());


    }

    @Test
    void testGetAllPatients() throws Exception {
        mockMvc.perform(get("/patient"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetPatientById() throws Exception {
        mockMvc.perform(get("/patient/2"))
                .andExpect(status().isOk());
    }

    @Test
    void testDeletePatient() throws Exception {
        mockMvc.perform(delete("/patient/2"))
                .andExpect(status().isOk());
    }

}
