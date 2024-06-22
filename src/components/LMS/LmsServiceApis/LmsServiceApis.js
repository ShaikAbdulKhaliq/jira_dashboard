import axios from "axios";

const live_base_url = import.meta.env.VITE_live_base_url;

export const GetCourseDataForEachEmployee = async (employeeID) => {
    try {
        // Make a GET request to the endpoint with the employeeID as a path parameter
        const response = await axios.get(`${live_base_url}/lms/LandD/employee/${employeeID}`);
        const data = response.data;

        // Log and return the CoursesAligned array
        console.log("Courses Aligned:", data.CoursesAligned);
        return data.CoursesAligned;
    } catch (error) {
        console.error("Error fetching course data:", error);
        throw error;
    }
}

