const { app } = require('@azure/functions');
const { connectToDatabase } = require('../../shared/db');

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
