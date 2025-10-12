const { app } = require('@azure/functions');
const { connectToDatabase } = require('../../shared/db');

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
