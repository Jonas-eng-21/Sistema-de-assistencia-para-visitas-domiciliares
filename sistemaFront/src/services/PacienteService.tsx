import axios from "axios";
import type { Patient } from "../models/Patient";
import { handleError } from "../helpers/ErrorHandler.";

const api = "http://localhost:8080/api/pacientes";
export const getAllPatientsAPI = async (): Promise<Patient[] | undefined> => {
  try {
    const response = await axios.get<Patient[]>(api);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getPatientByIdAPI = async (id: number): Promise<Patient | undefined> => {
  try {
    const response = await axios.get<Patient>(`${api}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createPatientAPI = async (patientData: Omit<Patient, "id">): Promise<Patient | undefined> => {
  try {
    const response = await axios.post<Patient>(api, patientData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updatePatientAPI = async (
  id: number,
  updatedData: Partial<Patient>
): Promise<Patient | undefined> => {
  try {
    const response = await axios.put<Patient>(`${api}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deletePatientAPI = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${api}/${id}`);
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};