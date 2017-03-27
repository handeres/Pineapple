/**
 * Created by Hannes on 22.03.2017.
 */
import 'reflect-metadata';
import { TestBed, async, inject } from '@angular/core/testing';
import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './';

describe('ErrorHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ErrorHandlerService]
        });
    });

    it('should ...', inject([ErrorHandler], (service: ErrorHandlerService) => {
        expect(service).toBeTruthy();
    }));
});