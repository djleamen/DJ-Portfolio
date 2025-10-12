const { app } = require('@azure/functions');
const { connectToDatabase } = require('../shared/db');

// Get Certifications
app.http('GetCerts', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'certs',
    handler: async (request, context) => {
        try {
            const db = await connectToDatabase();
            const certs = await db.collection('certs').find({}).toArray();
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(certs)
            };
        } catch (error) {
            context.error('Error fetching certs:', error);
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Failed to fetch certifications' })
            };
        }
    }
});

// Get Courses (consolidated with education details)
app.http('GetCourses', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'courses',
    handler: async (request, context) => {
        try {
            const db = await connectToDatabase();
            const educationData = await db.collection('education').find({}).toArray();
            const coursesData = await db.collection('courses').find({}).toArray();
            
            const consolidatedData = educationData.map(edu => {
                if (edu.courses && Array.isArray(edu.courses)) {
                    edu.courses = edu.courses.map(course => {
                        const courseDetail = coursesData.find(c => c.name === course.name);
                        return {
                            ...course,
                            description: courseDetail?.description || course.description || ''
                        };
                    });
                }
                return edu;
            });
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(consolidatedData)
            };
        } catch (error) {
            context.error('Error fetching courses:', error);
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Failed to fetch courses' })
            };
        }
    }
});

// Get Projects
app.http('GetProjects', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'projects',
    handler: async (request, context) => {
        try {
            const db = await connectToDatabase();
            const projects = await db.collection('projects').find({}).toArray();
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(projects)
            };
        } catch (error) {
            context.error('Error fetching projects:', error);
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Failed to fetch projects' })
            };
        }
    }
});

// Get Skills
app.http('GetSkills', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'skills',
    handler: async (request, context) => {
        try {
            const db = await connectToDatabase();
            const skillsDoc = await db.collection('skills').findOne({});
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(skillsDoc || {})
            };
        } catch (error) {
            context.error('Error fetching skills:', error);
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Failed to fetch skills' })
            };
        }
    }
});

// Get Work Experience
app.http('GetWork', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'work',
    handler: async (request, context) => {
        try {
            const db = await connectToDatabase();
            const work = await db.collection('work').find({}).toArray();
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(work)
            };
        } catch (error) {
            context.error('Error fetching work experience:', error);
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Failed to fetch work experience' })
            };
        }
    }
});
