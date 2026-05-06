package com.saadh.patientmanagement.controller;

import com.saadh.patientmanagement.data.dto.common.ApiResponse;
import com.saadh.patientmanagement.data.dto.patient.PatientRequestDTO;
import com.saadh.patientmanagement.data.dto.patient.PatientResponseDTO;
import com.saadh.patientmanagement.data.enums.common.ResponseStatus;
import com.saadh.patientmanagement.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("patient")
@RequiredArgsConstructor
@Tag(name = "Patient Management", description = "CRUD APIs for managing patients")
public class PatientController {
    private final PatientService patientService;

    @Operation(summary = "Create a new patient")
    @PostMapping
    public ApiResponse<PatientResponseDTO> create(@RequestBody PatientRequestDTO patientRequestDTO) {
        return new ApiResponse<>(
                "Patient Created",
                patientService.create(patientRequestDTO),
                ResponseStatus.SUCCESS
        );
    }

    @Operation(summary = "Get all patients")
    @GetMapping
    public ApiResponse<List<PatientResponseDTO>> getAllPatients() {
        return new ApiResponse<>(
                "All Patients Retrieved",
                patientService.getAll(),
                ResponseStatus.SUCCESS
        );
    }

    @Operation(summary = "Get patient by ID")
    @GetMapping("/{id}")
    public ApiResponse<PatientResponseDTO> getPatientById(@PathVariable Long id) {
        return new ApiResponse<>(
                "Patient Fetched",
                patientService.getById(id),
                ResponseStatus.SUCCESS
        );
    }
}
