package com.saadh.patientmanagement.service.patient;

import com.saadh.patientmanagement.data.dao.PatientRepository;
import com.saadh.patientmanagement.data.dto.patient.PatientRequestDTO;
import com.saadh.patientmanagement.data.entity.patient.Patient;
import com.saadh.patientmanagement.exception.ResourceNotFoundException;
import com.saadh.patientmanagement.service.PatientService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientService patientService;

    public PatientServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetById_success() {
        Patient patient = new Patient();
        patient.setId(1L);

        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));

        assertNotNull(patientService.getById(1L));
    }

    @Test
    void testGetById_notFound() {
        when(patientRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> patientService.getById(1L));
    }

    @Test
    void testCreate_success() {
        PatientRequestDTO dto = new PatientRequestDTO();
        dto.setFirstName("John");

        Patient saved = new Patient();
        saved.setId(1L);

        when(patientRepository.save(any())).thenReturn(saved);

        assertNotNull(patientService.create(dto));
    }

    @Test
    void testDelete_success() {
        Patient patient = new Patient();
        patient.setId(1L);

        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));

        patientService.deletePatient(1L);

        verify(patientRepository, times(1)).delete(patient);
    }
}
