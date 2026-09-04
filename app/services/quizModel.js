const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  question:   { type: String, required: true },
  selected:   { type: Number, default: null },
  correct:    { type: Number, required: true },
  isCorrect:  { type: Boolean, required: true },
}, { _id: false });

const quizSubmissionSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  mobile:     { type: String, required: true, trim: true },
  state:      { type: String, required: true },
  score:      { type: Number, required: true, min: 0 },
  total:      { type: Number, required: true },
  percentage: { type: Number, required: true },
  timeTaken:  { type: Number },
  timedOut:   { type: Boolean, default: false },
  answers:    { type: [answerSchema], default: [] },
  submittedAt:{ type: Date, default: Date.now },
}, { timestamps: true });

quizSubmissionSchema.index({ score: -1, submittedAt: 1 });

module.exports = mongoose.model('QuizSubmission', quizSubmissionSchema);