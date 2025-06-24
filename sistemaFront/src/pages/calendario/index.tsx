import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import Header from "../../components/Header"; // Seu componente de Header
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  addWeeks,
  subWeeks,
  getWeek,
  setMonth,
  getMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { getAllSchedulesAPI } from "../../services/AgendamentoService";
import type { ScheduleResponseDTO } from "../../models/Schedule";
import DetalhesAgendamentoModal from "../../components/DetalhesAgendamentoModal";

const Calendario: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetDateString = location.state?.targetDate;
  
  const initialDate = targetDateString
    ? new Date(targetDateString.replace(/-/g, '/'))
    : new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [schedules, setSchedules] = useState<ScheduleResponseDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleResponseDTO | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      const data = await getAllSchedulesAPI();
      if (data) {
        setSchedules(data);
      }
    };
    fetchSchedules();
  }, []);

  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const handlePreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(setMonth(new Date(), parseInt(e.target.value)));
  };

  const handleOpenModal = (schedule: ScheduleResponseDTO) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  const renderDays = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      const schedulesForDay = schedules.filter((schedule) =>
        isSameDay(new Date(schedule.dataAgendamento.replace(/-/g, '/')), day)
      );

      days.push(
        <S.DayColumn key={i}>
          <S.DayHeader>
            <div>{format(day, "EEE", { locale: ptBR }).toUpperCase()}</div>
            <div>{format(day, "d")}</div>
          </S.DayHeader>
          <S.DayBody>
            {schedulesForDay.map((schedule) => (
              <S.AppointmentCard
                key={schedule.id}
                prioridade={schedule.prioridade}
                onClick={() => handleOpenModal(schedule)}
              >
                {schedule.paciente.nome}
              </S.AppointmentCard>
            ))}
          </S.DayBody>
        </S.DayColumn>
      );
    }
    return days;
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Header>
          <S.Controls>
            <S.MonthSelect
              value={getMonth(currentDate)}
              onChange={handleMonthChange}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {format(new Date(0, i), "MMMM", { locale: ptBR })}
                </option>
              ))}
            </S.MonthSelect>
            <S.WeekNav>
              <IconButton onClick={handlePreviousWeek} size="small">
                <ArrowBackIosNewIcon fontSize="inherit" />
              </IconButton>
              <span>Semana {getWeek(currentDate)}</span>
              <IconButton onClick={handleNextWeek} size="small">
                <ArrowForwardIosIcon fontSize="inherit" />
              </IconButton>
            </S.WeekNav>
          </S.Controls>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/agendar-visita")}
          >
            Nova visita
          </Button>
        </S.Header>
        <S.CalendarGrid>{renderDays()}</S.CalendarGrid>
        <DetalhesAgendamentoModal
          open={isModalOpen}
          onClose={handleCloseModal}
          schedule={selectedSchedule}
        />
      </S.Container>
    </>
  );
};

export default Calendario;
