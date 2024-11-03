import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../Redux/Slices/CoursesSlice';

const CoursePage = () => {
    const { courseData } = useSelector((state) => state.courses);
    const dispatch = useDispatch();

    const loadCourses = async() => {
        await dispatch(getAllCourses());
        console.log(courseData); 
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <div className="flex h-[80vh] justify-center items-center p-4">
            <div className="flex flex-col justify-center items-center">
                {courseData && courseData.length > 0 ? (
                    courseData.map((course) => (
                        <div key={course.id}>
                            <h1>{course.title}</h1>
                        </div>
                    ))
                ) : (
                    <p>Loading courses...</p>
                )}
            </div>
        </div>
    );
};

export default CoursePage;
