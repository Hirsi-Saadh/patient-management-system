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
    public String address;
    public String city;
    public String state;
    public String zipCode;
    public String phoneNumber;
    public String email;

}
