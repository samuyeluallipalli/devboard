import {
    createContext,
    useContext,
    useState,
} from "react";

import client from "../api/client";

const ActivityContext = createContext();

export const ActivityProvider = ({
    children,
}) => {
    const [activities, setActivities] =
        useState([]);

    const getActivitiesByProject = async (projectId) => {
        try {
            const res = await client.get(
                `/activities/project/${projectId}`
            );

            console.log("Activities API:", res.data);

            setActivities(res.data);

            return res.data;
        } catch (error) {
            console.log(
                "Activity Error:",
                error.response?.data ||
                error.message
            );
        }
    };

    return (
        <ActivityContext.Provider
            value={{
                activities,
                getActivitiesByProject,
            }}
        >
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivities = () =>
    useContext(ActivityContext);