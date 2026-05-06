package com.saadh.patientmanagement.handler.exception;

import com.saadh.patientmanagement.data.dto.common.ApiResponse;
import com.saadh.patientmanagement.data.enums.common.ResponseStatus;
import com.saadh.patientmanagement.exception.ResourceNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ApiResponse<String> handleNotFound(ResourceNotFoundException ex) {
        return new ApiResponse<>(
                ex.getMessage(),
                null,
                ResponseStatus.ERROR
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ApiResponse<String> handleRuntime(RuntimeException ex) {
        return new ApiResponse<>(
                ex.getMessage(),
                null,
                ResponseStatus.ERROR
        );
    }


    @ExceptionHandler(Exception.class)
    public ApiResponse<String> handleGeneric(Exception ex) {
        return new ApiResponse<>(
                "Something went wrong",
                null,
                ResponseStatus.ERROR
        );
    }
}
