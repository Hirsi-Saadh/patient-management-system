package com.saadh.patientmanagement.data.dto.patient;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientResponseDTO {
    public Long id;
    public String firstName;
    public String lastName;
    public String email;
}
