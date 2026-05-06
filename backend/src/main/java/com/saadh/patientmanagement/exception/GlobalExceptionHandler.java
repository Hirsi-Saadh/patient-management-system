package com.saadh.patientmanagement.exception;

import com.saadh.patientmanagement.data.dto.common.ApiResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ApiResponse<String> handleRuntime(RuntimeException ex) {
        return new ApiResponse<>(
                ex.getMessage(),
                null,
                "ERROR"
        );
    }

    @ExceptionHandler(Exception.class)
    public ApiResponse<String> handleGeneric(Exception ex) {
        return new ApiResponse<>(
                "Something went wrong",
                null,
                "ERROR"
        );
    }
}
