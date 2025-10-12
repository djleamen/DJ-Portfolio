const { app } = require('@azure/functions');
const { connectToDatabase } = require('../../shared/db');

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
