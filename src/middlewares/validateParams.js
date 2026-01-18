export function validateParams(schema) {

    return (req, res, next) => {
        
        const resultado = schema.safeParse(req.params);
        
        if (!resultado.success) {
            const erros = resultado.error.issues.map(e => e.message) || ["Erro de validação desconhecido"];
            return res.status(400).json({ erros });
        }
        
        req.params = resultado.data;
        
        next();
        
    }
}