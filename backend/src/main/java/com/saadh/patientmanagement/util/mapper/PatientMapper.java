package com.saadh.patientmanagement.util.mapper;

import com.saadh.patientmanagement.data.dto.patient.PatientRequestDTO;
import com.saadh.patientmanagement.data.dto.patient.PatientResponseDTO;
import com.saadh.patientmanagement.data.entity.patient.Patient;

public class PatientMapper {

    public static Patient toEntity(PatientRequestDTO dto) {
        Patient patient = new Patient();
        patient.setFirstName(dto.firstName);
        patient.setLastName(dto.lastName);
        patient.setAddress(dto.address);
        patient.setCity(dto.city);
        patient.setState(dto.state);
        patient.setZipCode(dto.zipCode);
        patient.setPhoneNumber(dto.phoneNumber);
        patient.setEmail(dto.email);
        return patient;
    }

    public static PatientResponseDTO toDTO(Patient entity) {
        PatientResponseDTO dto = new PatientResponseDTO();
        dto.id = entity.getId();
        dto.firstName = entity.getFirstName();
        dto.lastName = entity.getLastName();
        dto.address = entity.getAddress();
        dto.city = entity.getCity();
        dto.state = entity.getState();
        dto.zipCode = entity.getZipCode();
        dto.phoneNumber = entity.getPhoneNumber();
        dto.email = entity.getEmail();
        return dto;
    }
}
