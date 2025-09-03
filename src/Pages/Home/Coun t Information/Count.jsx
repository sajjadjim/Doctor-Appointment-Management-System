import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaUsers, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useFreeAxios from '../../../Hook/useAxios';

const Count = () => {
    const [loading, setLoading] = useState(true);
    const axiosInstance = useFreeAxios();

    // Fetch total doctors
    const { data: doctorsData } = useQuery({
        queryKey: ['doctorsCount'],
        queryFn: async () => {
            const res = await axiosInstance.get('/users/count/doctors');
            return res.data;
        },
    });

    // Fetch total patients
    const { data: patientsData } = useQuery({
        queryKey: ['patientsCount'],
        queryFn: async () => {
            const res = await axiosInstance.get('/users/count/patients');
            return res.data;
        },
    });

    // Fetch total appointments
    const { data: appointmentsData } = useQuery({
        queryKey: ['appointmentsCount'],
        queryFn: async () => {
            const res = await axiosInstance.get('/appointments/count');
            return res.data;
        },
    });

    // Start animation after data is loaded
    useEffect(() => {
        if (doctorsData && patientsData && appointmentsData) {
            setLoading(false);
        }
    }, [doctorsData, patientsData, appointmentsData]);

    const cardData = [
        {
            label: 'Doctors',
            count: doctorsData?.doctorsCount || 0,
            icon: <FaUsers className="text-white w-8 h-8" />,
            bg: 'bg-indigo-600',
        },
        {
            label: 'Patients',
            count: patientsData?.patientsCount || 0,
            icon: <FaChalkboardTeacher className="text-white w-8 h-8" />,
            bg: 'bg-green-600',
        },
        {
            label: 'Appointments',
            count: appointmentsData?.appointmentsCount || 0,
            icon: <FaClipboardList className="text-white w-8 h-8" />,
            bg: 'bg-pink-600',
        },
    ];

    return (
        <div className="2xl:max-w-7xl md:max-w-6xl mx-auto md:mb-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardData.map(({ label, count, icon, bg }) => (
                <div
                    key={label}
                    className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-200 hover:shadow-indigo-300 transition-all duration-300 group"
                >
                    {/* Decorative Icon Badge */}
                    <div className={`rounded-full p-4 ${bg} mb-4 shadow-lg group-hover:scale-110 transition`}>
                        {icon}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">{label}</h2>
                    {loading ? (
                        <div className="text-3xl font-extrabold text-indigo-600 animate-pulse">Loading...</div>
                    ) : (
                        <CountUp
                            start={0}
                            end={count}
                            duration={3}
                            separator=","
                            className="text-4xl font-extrabold text-indigo-700"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Count;
