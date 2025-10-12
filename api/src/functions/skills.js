const { app } = require('@azure/functions');
const { connectToDatabase } = require('../../shared/db');

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
