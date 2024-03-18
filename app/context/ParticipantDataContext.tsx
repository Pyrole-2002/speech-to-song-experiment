import { createContext, useState } from "react";

interface ParticipantData {
    login: {
        participantID: number;
        sessionNumber: number;
    };
    audio1: {
        field1: number;
        field2: number;
        field3: number;
    };
    audio2: {
        field1: number;
        field2: number;
        field3: number;
    };
    audio3: {
        field1: number;
        field2: number;
        field3: number;
    };
    audio4: {
        field1: number;
        field2: number;
        field3: number;
    };
}

const ParticipantDataContext = createContext<Partial<ParticipantData>>({});

export const ParticipantDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [participantData, setParticipantData] = useState<Partial<ParticipantData>>({});

    const updateParticipantData = (newData: Partial<ParticipantData>) => {
        setParticipantData({ ...participantData, ...newData });
    }

    return (
        <ParticipantDataContext.Provider value={{ ...participantData, updateParticipantData }}>
            {children}
        </ParticipantDataContext.Provider>
    );
};

export default ParticipantDataContext;
