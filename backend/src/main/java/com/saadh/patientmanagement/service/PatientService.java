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

    public PatientResponseDTO updatePatient(Long id, PatientRequestDTO patientRequestDTO) {
        Patient existingPatient  = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        Patient updatedPatient = PatientMapper.toEntity(patientRequestDTO);
        updatedPatient.setId(existingPatient.getId());

        Patient savedPatient = patientRepository.save(updatedPatient);
        return PatientMapper.toDTO(savedPatient);
    }

    public PatientResponseDTO partialUpdatePatient(Long id, PatientRequestDTO dto) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        if (dto.getFirstName() != null) patient.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) patient.setLastName(dto.getLastName());
        if (dto.getAddress() != null) patient.setAddress(dto.getAddress());
        if (dto.getCity() != null) patient.setCity(dto.getCity());
        if (dto.getState() != null) patient.setState(dto.getState());
        if (dto.getZipCode() != null) patient.setZipCode(dto.getZipCode());
        if (dto.getPhoneNumber() != null) patient.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getEmail() != null) patient.setEmail(dto.getEmail());

        Patient saved = patientRepository.save(patient);

        return PatientMapper.toDTO(saved);
    }

    public String deletePatient(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        patientRepository.delete(patient);

        return "Successfully deleted Patient with id: " + id;
    }
}
