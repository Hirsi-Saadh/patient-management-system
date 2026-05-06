package com.saadh.patientmanagement.data.dto.common;

import com.saadh.patientmanagement.data.enums.common.ResponseStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private String message;
    private T data;
    private ResponseStatus status;
}
