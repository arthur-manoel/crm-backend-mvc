export function validateQuery(schema) {

    return (req, res, next) => {
        
        const resultado = schema.safeParse(req.query);

        if (!resultado.success) {
            const erros = resultado.error.issues.map(e => e.message) || ["Erro de validação desconhecido"];
            return res.status(400).json({ erros });
        }

        req.query = resultado.data;

        next();

    }
}