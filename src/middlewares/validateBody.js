export function validateBody(schema) {

    return (req, res, next) => {
        
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map(e => e.message) || ["Unknown validation error"];
            return res.status(400).json({ errors });
        }

        req.body = result.data;
        next();
        
    }
}