const mongoose = require('mongoose');

const enthusiastSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [120, 'Name is too long'],
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [16, 'Age must be at least 16'],
            max: [26, 'Age must be at most 26'],
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: {
                values: ['Male', 'Female', 'Other', 'Prefer not to say'],
                message: 'Invalid gender value',
            },
        },
        youAre: {
            type: String,
            required: [true, 'Please select what you are'],
            enum: {
                values: ['school student', 'undergrad', 'post-grad', 'NA'],
                message: 'Invalid option for "you are a"',
            },
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
            maxlength: 80,
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true,
            maxlength: 80,
        },
        institution: {
            type: String,
            required: [true, 'Institution is required'],
            trim: true,
            maxlength: 200,
        },
        // Conditional: required only when youAre === 'school student'
        class: {
            type: String,
            trim: true,
            maxlength: 30,
            default: null,
        },
        // Conditional: required only when youAre is undergrad / post-grad
        course: {
            type: String,
            trim: true,
            maxlength: 120,
            default: null,
        },
        contact: {
            type: String,
            required: [true, 'Contact number is required'],
            trim: true,
            match: [/^\d{10}$/, 'Contact must be a 10-digit number'],
            index: true,
        },
        parentName: {
            type: String,
            required: [true, "Parent's name is required"],
            trim: true,
            maxlength: 120,
        },
        parentContact: {
            type: String,
            required: [true, "Parent's contact is required"],
            trim: true,
            match: [/^\d{10}$/, "Parent's contact must be a 10-digit number"],
        },
        referralSource: {
            type: String,
            required: [true, 'Referral source is required'],
            trim: true,
            maxlength: 200,
        },

        // Useful metadata
        ipAddress: { type: String, default: null },
        userAgent: { type: String, default: null },
    },
    {
        timestamps: true, // adds createdAt + updatedAt
        versionKey: false,
    }
);

// Cross-field validation for conditional fields.
enthusiastSchema.pre('validate', function (next) {
    if (this.youAre === 'school student' && (!this.class || !this.class.trim())) {
        this.invalidate('class', 'Class is required for school students');
    }
    if (
        (this.youAre === 'undergrad' || this.youAre === 'post-grad') &&
        (!this.course || !this.course.trim())
    ) {
        this.invalidate('course', 'Course is required for college students');
    }
    next();
});

// Prevent duplicate registrations from the same contact number.
enthusiastSchema.index({ contact: 1 }, { unique: true });

module.exports = mongoose.model('QuizEnthusiast', enthusiastSchema);