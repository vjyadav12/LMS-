import { useSelector } from 'react-redux';

const CoursePage = () => {
    const CourseDataa = useSelector((state) => state.courses.courseData);

    return (
        <div className="flex h-[80vh] justify-center items-center p-4">
            <div className="flex flex-col justify-center items-center">
                {CourseDataa?.[0] ? (
                    <>
                        <img src={CourseDataa[0].thumbnail?.secure_url} alt="image" />
                        <h1>{CourseDataa[0].title}</h1>
                        <h1>{CourseDataa[0].description}</h1>
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
};

export default CoursePage;
