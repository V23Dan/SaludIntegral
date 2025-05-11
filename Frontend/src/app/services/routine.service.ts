import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private readonly baseUrl = 'http://localhost:5000/routines';

  constructor() {
    axios.defaults.withCredentials = true;
  }

  async createRoutine(data: any) {
    try {
      const response = await axios.post(`${this.baseUrl}/create`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async groupByDifficulty() {
    try {
      const response = await axios.get(`${this.baseUrl}/grouped`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async projectRoutineFields() {
    try {
      const response = await axios.get(`${this.baseUrl}/projected`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async sortByDate() {
    try {
      const response = await axios.get(`${this.baseUrl}/sorted`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async matchByDificultad(dificultad: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/filter`, {
        params: { dificultad },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async limitRoutines(limit: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/limit`, {
        params: { limit },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async skipRoutines(skip: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/skip`, {
        params: { skip },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async unwindExercises() {
    try {
      const response = await axios.get(`${this.baseUrl}/unwind`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async lookupUserRoutines() {
    try {
      const response = await axios.get(`${this.baseUrl}/lookup`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
}
