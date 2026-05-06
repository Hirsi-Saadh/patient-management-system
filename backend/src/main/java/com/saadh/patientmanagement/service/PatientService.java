package com.saadh.patientmanagement.service;

import com.saadh.patientmanagement.data.dao.PatientRepository;
import com.saadh.patientmanagement.data.dto.patient.PatientRequestDTO;
import com.saadh.patientmanagement.data.dto.patient.PatientResponseDTO;
import com.saadh.patientmanagement.data.entity.patient.Patient;
import com.saadh.patientmanagement.exception.ResourceNotFoundException;
import com.saadh.patientmanagement.util.mapper.PatientMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    public PatientResponseDTO create(PatientRequestDTO patientRequestDTO) {
        Patient mappedPatient = PatientMapper.toEntity(patientRequestDTO);
        Patient newPatient = patientRepository.save(mappedPatient);
        return PatientMapper.toDTO(newPatient);
    }

    public List<PatientResponseDTO> getAll() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream()
                .map(PatientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public PatientResponseDTO getById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        return PatientMapper.toDTO(patient);
    }
}
