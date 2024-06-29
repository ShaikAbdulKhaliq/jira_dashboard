const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for aligned courses
const alignedCourseSchema = new mongoose.Schema({
  CourseID: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  TotalLessons: {
    type: Number, // Use Number type
    required: true,
    validate: {
      validator: Number.isInteger, // Validate if it's an integer
      message: "{VALUE} is not an integer value for TotalLessons",
    },
  },
});

// Define the schema for in-progress courses
const inProgressCourseSchema = new mongoose.Schema({
  CourseID: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  InProgressLessons: {
    type: Number, // Use Number type
    required: true,
    validate: {
      validator: Number.isInteger, // Validate if it's an integer
      message: "{VALUE} is not an integer value for InProgressLessons",
    },
  },
});

// Define the schema for completed courses
const completedCourseSchema = new mongoose.Schema({
  CourseID: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  CompletionDate: {
    type: Date,
    required: true,
  },
  CertificationID: {
    type: String,
    required: true,
  },
  CompletedLessons: {
    type: Number, // Use Number type
    required: true,
    validate: {
      validator: Number.isInteger, // Validate if it's an integer
      message: "{VALUE} is not an integer value for CompletedLessons",
    },
  },
});

// Define the main employee schema
const employeeSchema = new mongoose.Schema(
  {
    EmployeeID: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Team: {
      type: String,
      required: true,
    },
    CoursesAligned: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    CoursesInProgress: [inProgressCourseSchema],
    CoursesCompleted: [completedCourseSchema],
  },
  { timestamps: true }
);

// Create the model from the schema
const Employees = mongoose.model("Employees", employeeSchema);

module.exports = Employees;
