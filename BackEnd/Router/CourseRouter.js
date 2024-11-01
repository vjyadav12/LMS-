import express from 'express'
import { CreateCourses, addLeacturesByCourseID, getAllCourse, getLecturesByCourseId, removeCourse, updateCourse } from '../Controllers/Course.Controller.js';
import isLoggedIn, { authorizedRoles } from '../MiddleWare/user.middleware.js';

// creating the instance.
const courseRouter = express.Router();

// here is the router or path 
courseRouter.route('/')
        .get(getAllCourse)
        .post(
                isLoggedIn,
                authorizedRoles('ADMIN'), //here we are define that which role is access the permission to Create_Course.
                CreateCourses)  

// here only id u have to pass after course/(and id nomber ) thats it. 
courseRouter.route('/:id')

            // isloggedIn because iam   jnn kjallowing that only that user/student see the leactures which is logged in first the they can see the lectures.
        .get(
                isLoggedIn,
                getLecturesByCourseId,)

        .put(
                isLoggedIn,
                authorizedRoles('ADMIN'),
                updateCourse)

        .delete(
                isLoggedIn,
                authorizedRoles('ADMIN'),
                removeCourse)
        
        .post(
                isLoggedIn,
                authorizedRoles('ADMIN'),
                addLeacturesByCourseID
        )

        

export default courseRouter