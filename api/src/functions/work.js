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
            
            const typeOrder = {
                "Internship Full-time": 1,
                "Contract Part-time": 2,
                "Freelance": 3,
                "Volunteer": 4
            };
            
            const sortedWork = work.sort((a, b) => {
                // First sort by type
                const typeCompare = typeOrder[a.type] - typeOrder[b.type];
                if (typeCompare !== 0) return typeCompare;
                
                // Within same type, sort by start date (most recent first)
                const getYear = (duration) => {
                    const match = duration.match(/(\w+) (\d{4})/);
                    if (!match) return 0;
                    const month = match[1];
                    const year = parseInt(match[2]);
                    const months = {
                        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
                        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
                        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'June': 6,
                        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
                    };
                    return year * 12 + (months[month] || 0);
                };
                
                return getYear(b.duration) - getYear(a.duration);
            });
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(sortedWork)
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
