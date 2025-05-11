import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { physicalData, User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class PhysicalDataService {
  private readonly API_URL = 'http://localhost:5000/physicalData';

  constructor() {}

  async registerPhysicalData(data: {
    sexo: string;
    altura: number;
    peso: number;
    edad: number;
  }): Promise<any> {
    try {
      const response = await axios.post(`${this.API_URL}/register`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw 'Ocurrió un error desconocido';
      }
    }
  }

  getPhysicalData(): Observable<physicalData | null> {
    return from(
      axios.get(`${this.API_URL}/get`, {
        withCredentials: true,
      })
    ).pipe(
      map((response) => {
        if (response.data && response.data.success) {
          const rawData = response.data.data;
          const physicalData: physicalData = {
            sexo: rawData.sexo,
            edad: rawData.edad,
            altura: rawData.altura.$numberDecimal
              ? parseFloat(rawData.altura.$numberDecimal)
              : 0,
            peso: rawData.peso.$numberDecimal
              ? parseFloat(rawData.peso.$numberDecimal)
              : 0,
          };
          return physicalData;
        }
        return null;
      }),
      catchError(() => {
        return from([null]);
      })
    );
  }

  async updatePhysicalData(data: {
    sexo: string;
    altura: number;
    peso: number;
    edad: number;
  }): Promise<any> {
    try {
      const response = await axios.put(`${this.API_URL}/update`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw 'Ocurrió un error desconocido';
      }
    }
  }
}
