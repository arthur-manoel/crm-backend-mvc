export function validateBody(schema) {

    return (req, res, next) => {
        
        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            const erros = resultado.error.issues.map(e => e.message) || ["Erro de validação desconhecido"];
            return res.status(400).json({ erros });
        }

        req.body = resultado.data;

        next();
    }
}