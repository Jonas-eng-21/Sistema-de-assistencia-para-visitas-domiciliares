import axios from "axios";
import { handleError } from "../helpers/ErrorHandler.";

const api = "http://localhost:8080/api/agendamentos";


export type ScheduleRequestDTO = {
  pacienteId: number;
  profissionalId: number;
  dataVisita: string; // formato ISO: "2025-06-04"
  turno: "MANHA" | "TARDE";
  observacoes?: string;
};

export type ScheduleResponseDTO = {
  id: number;
  pacienteId: number;
  profissionalId: number;
  dataVisita: string;
  turno: "MANHA" | "TARDE";
  observacoes?: string;
};


export const createScheduleAPI = async (
  scheduleData: ScheduleRequestDTO
): Promise<ScheduleResponseDTO | undefined> => {
  try {
    const response = await axios.post<ScheduleResponseDTO>(api, scheduleData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getAllSchedulesAPI = async (): Promise<ScheduleResponseDTO[] | undefined> => {
  try {
    const response = await axios.get<ScheduleResponseDTO[]>(api);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getScheduleByIdAPI = async (id: number): Promise<ScheduleResponseDTO | undefined> => {
  try {
    const response = await axios.get<ScheduleResponseDTO>(`${api}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const updateScheduleAPI = async (
  id: number,
  updatedData: Partial<ScheduleRequestDTO>
): Promise<ScheduleResponseDTO | undefined> => {
  try {
    const response = await axios.put<ScheduleResponseDTO>(`${api}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const deleteScheduleAPI = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${api}/${id}`);
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};