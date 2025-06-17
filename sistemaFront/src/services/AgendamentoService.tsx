import axios from "axios";
import { handleError } from "../helpers/ErrorHandler.";
import type { ScheduleRequestDTO, ScheduleResponseDTO, ScheduleUpdateDTO } from "../models/Schedule";

const api = axios.create({
  baseURL: "https://back-sus-visitas-domiciliares.onrender.com/api", 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const endpoint = "/agendamentos";

export const createScheduleAPI = async (
  scheduleData: ScheduleRequestDTO
): Promise<ScheduleResponseDTO | undefined> => {
  try {
    const response = await api.post<ScheduleResponseDTO>(
      endpoint,
      scheduleData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllSchedulesAPI = async (): Promise<
  ScheduleResponseDTO[] | undefined
> => {
  try {
    const response = await api.get<ScheduleResponseDTO[]>(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getScheduleByIdAPI = async (
  id: number
): Promise<ScheduleResponseDTO | undefined> => {
  try {
    const response = await api.get<ScheduleResponseDTO>(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateScheduleAPI = async (
  id: number,
  updatedData: ScheduleUpdateDTO
): Promise<ScheduleResponseDTO | undefined> => {
  try {
    const response = await api.put<ScheduleResponseDTO>(
      `${endpoint}/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const completeScheduleAPI = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`${endpoint}/${id}`);
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};
