import course from "../Schema/Course.Schema.js";
// import cloudinary from 'cloudinary'

// Get all the Courses not the leactures. (get request)
const getAllCourse = async (req, res, next) => {
  try {
    const Courses = await course.find({}).select("-lectures");

    return res.status(200).json({
      success: true,
      message: "Here is the courses",
      Courses,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Fail to fetch the data from DB",
    });
  }
};

// Get all the leactures With the help of lecture ID (get Request)
const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Course = await course.findById(id);

    if (!Course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All lectures fetched successfully",
      Course,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Failed to get the lectures from DB",
    });
  }
};

// Create Courses. (Post Request)
const CreateCourses = async (req, res, next) => {
  try {
    const { title, description, createdBy, category } = req.body;

    // checking every field is present or not.
    if (!title || !description || !createdBy || !category) {
      return res.status(400).json({
        success: false,
        message: "All Field is Required to create course",
      });
    }

    const Course = await course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id:
          "https://tse2.mm.bing.net/th?id=OIP.PMBiSa-JBIhSrPqckRRxyQHaEK&pid=Api&P=0&h=220",
        secure_url:
          "https://tse2.mm.bing.net/th?id=OIP.PMBiSa-JBIhSrPqckRRxyQHaEK&pid=Api&P=0&h=220",
      },
    });

    if (!Course) {
      return res.status(500).json({
        success: false,
        message: "Course Creation Fail, try next time ",
      });
    }

    Course.save();

    return res.status(200).json({
      success: true,
      message: "Course Create Successfully",
      Course,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: ("Course Creation Fails, Plz Try again ", e.message),
    });
  }
};

// Update Courses
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    // update ke case me we use other methods also but mongoose provide some good and power full this , that we can use it to update the data(GIVEN BELOW).

    const Course = await course.findByIdAndUpdate(
      id, //it means that kon si ID ke corresponding data change karna hai.

      {
        $set: req.body, //  here i want to set some optional things like... (Is line ka mtlb hai ki req.body me jo bhi milega vo sab simply over write kar do in the DB) {jo data bheja hai vahi data change hoga orr kuch bhi data me changement nahi hoga }
      },
      {
        runValidators: true, // this is use because it will check that what data comes in req.body is Right or not it means that pass thorugh the COURSE_SCHEMA structure.
      }
    );

    if (!Course) {
      return res.status(400).json({
        success: false,
        message: "Course Id is Invalid",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course Update SuccessFUlly",
      Course,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Course Updation Fails, PLz Trl again",
    });
  }
};

// Remove the course from the Id
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Course = await course.findByIdAndDelete(id);

    // if Course me kuch nahi aya to it will show an error that given id is invalid or course of this ID is not present.

    if (!Course) {
      return res.status(400).json({
        success: false,
        message: "Course ID is Invalid, try again",
      });
    }

    // if Course Is present then simply u have to remove the Course of that id.
    if (Course) {
      return res.status(200).json({
        success: true,
        message: "Course Remove Successfully",
      });
    }
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: ("Course Remove Fails, Please Try again", e.message),
    });
  }
};

// here we are creating a Leactures inside the courses.
const addLeacturesByCourseID = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    // Create the lecture data
    const leactureData = {
      title,
      description,
      leacture: {
        public_id:
          "https://img.freepik.com/premium-photo/3d-cute-cartoon-girl-studying-education-illustration_988987-3178.jpg?w=2000",
        secure_url:
          "https://img.freepik.com/premium-photo/3d-cute-cartoon-girl-studying-education-illustration_988987-3178.jpg?w=2000",
      },
    };

    // Update the course with $push to add the lecture to the lectures array and increment the numberOfLecture
    const result = await course.updateOne(
      { _id: id }, // Find course by ID
      {
        $push: { lectures: leactureData }, // Add new lecture
        $inc: { numberOfLecture: 1 }, // Increment numberOfLecture by 1
      }
    );

    // If no course was updated, return an error // or we can say that when id of the leacture is wrong then it will show an error that with this ID noleacture is available.

    if (result.nModified === 0) {
      return res.status(400).json({
        success: false,
        message: "Course with this ID not found or lecture not added.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lecture added successfully!",
    });
    
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: `Failed to add lecture: ${e.message}`,
    });
  }
};



export {
  getAllCourse,
  getLecturesByCourseId,
  CreateCourses,
  updateCourse,
  removeCourse,
  addLeacturesByCourseID,
};
