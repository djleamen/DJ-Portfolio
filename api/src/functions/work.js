const { app } = require('@azure/functions');
const { connectToDatabase } = require('../../shared/db');

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
