const QuizSubmission = require('../models/quizModel');
const QuizEnthusiast = require('../models/liveQuizModel');

// POST /api/quiz/submit
exports.submitQuiz = async (req, res) => {
    try {
        const { name, mobile, state, score, total, timeTaken, timedOut, answers } = req.body;

        // validation
        if (!name || !mobile || !state || score === undefined || !total) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            return res.status(400).json({ error: 'Invalid mobile number' });
        }

        const percentage = Math.round((score / total) * 100);

        const submission = await QuizSubmission.create({
            name, mobile, state, score, total, percentage,
            timeTaken: timeTaken || null,
            timedOut: timedOut || false,
            answers: Array.isArray(answers) ? answers : [],
        });

        return res.status(201).json({
            success: true,
            message: 'Quiz submitted successfully',
            submissionId: submission._id,
            score,
            total,
            percentage,
        });
    } catch (err) {
        console.error('submitQuiz error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// GET /api/quiz/leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const allDocs = await QuizSubmission
            .find({}, 'name mobile state score total percentage submittedAt timeTaken')
            .sort({ score: -1, submittedAt: 1 })
            .limit(10000)
            .lean();

        const ranked = [];
        let rank = 0;
        let prevScore = null;
        let distinctRanks = 0;

        for (const doc of allDocs) {
            if (doc.score !== prevScore) {
                distinctRanks++;
                if (distinctRanks > 100) break;
                rank = distinctRanks;
                prevScore = doc.score;
            }

            ranked.push({
                rank,
                name: doc.name,
                state: doc.state,
                score: doc.score,
                total: doc.total,
                percentage: doc.percentage,
                timeTaken: doc.timeTaken,
                submittedAt: doc.submittedAt,
            });
        }

        return res.json({
            success: true,
            total: ranked.length,
            leaderboard: ranked,
        });
    } catch (err) {
        console.error('getLeaderboard error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

function buildPayload(body) {
    const {
        name,
        age,
        gender,
        youAre,
        city,
        state,
        institution,
        class: studentClass,
        course,
        contact,
        parentName,
        parentContact,
        referralSource,
    } = body || {};

    const trim = (v) => (typeof v === 'string' ? v.trim() : v);
    const numericOnly = (v) => (typeof v === 'string' ? v.replace(/\D/g, '') : v);

    return {
        name: trim(name),
        age: typeof age === 'string' ? Number(age) : age,
        gender: trim(gender),
        youAre: trim(youAre),
        city: trim(city),
        state: trim(state),
        institution: trim(institution),
        class: youAre === 'school student' ? trim(studentClass) || null : null,
        course:
            youAre === 'undergrad' || youAre === 'post-grad'
                ? trim(course) || null
                : null,
        contact: numericOnly(trim(contact)),
        parentName: trim(parentName),
        parentContact: numericOnly(trim(parentContact)),
        referralSource: trim(referralSource),
    };
}


function formatValidationError(err) {
    const fieldErrors = {};
    if (err && err.errors) {
        for (const [field, info] of Object.entries(err.errors)) {
            fieldErrors[field] = info.message || 'Invalid value';
        }
    }
    return fieldErrors;
}


 /* POST /api/quiz/enthusiasts */
exports.registerEnthusiast = async (req, res) => {
    try {
        const payload = buildPayload(req.body);

        payload.ipAddress =
            req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
            req.socket?.remoteAddress ||
            null;
        payload.userAgent = req.headers['user-agent'] || null;

        const doc = await QuizEnthusiast.create(payload);

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                id: doc._id,
                name: doc.name,
                contact: doc.contact,
                createdAt: doc.createdAt,
            },
        });
    } catch (err) {
        // Validation errors from Mongoose
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: formatValidationError(err),
            });
        }

        // Duplicate contact (unique index violation)
        if (err && err.code === 11000) {
            const field = Object.keys(err.keyPattern || { contact: 1 })[0];
            return res.status(409).json({
                success: false,
                message:
                    field === 'contact'
                        ? 'This contact number has already been registered.'
                        : 'Duplicate entry.',
                errors: { [field]: 'Already registered' },
            });
        }

        console.error('[registerEnthusiast] unexpected error:', err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
};

/* GET /api/quiz/enthusiasts */
exports.listEnthusiasts = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 200);
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            QuizEnthusiast.find({})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            QuizEnthusiast.countDocuments({}),
        ]);

        return res.json({
            success: true,
            data: items,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        console.error('[listEnthusiasts] error:', err);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch registrations',
        });
    }
};

/* GET /api/quiz/enthusiasts/count */
exports.countEnthusiasts = async (_req, res) => {
    try {
        const count = await QuizEnthusiast.countDocuments({});
        return res.json({ success: true, count });
    } catch (err) {
        console.error('[countEnthusiasts] error:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch count' });
    }
};