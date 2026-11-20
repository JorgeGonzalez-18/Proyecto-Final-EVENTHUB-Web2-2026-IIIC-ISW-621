const paginate = async (model, queryParams, options = {}) => {
    const page = Math.max(1, parseInt(queryParams.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const filter = {};

    // Bsqueda por texto si se definen searchFields y viene query "search"
    if (queryParams.search && options.searchFields && options.searchFields.length > 0) {
        filter.$or = options.searchFields.map((field) => ({
            [field]: { $regex: queryParams.search, $options: "i" },
        }));
    }

    // Filtros adicionales pasados en options o queryParams
    if (options.baseFilter) {
        Object.assign(filter, options.baseFilter);
    }

    // Configuracion de ordenamiento
    let sort = options.defaultSort || { createdAt: -1 };
    if (queryParams.sortBy && options.allowedSort && options.allowedSort.includes(queryParams.sortBy)) {
        const order = queryParams.order === "asc" ? 1 : -1;
        sort = { [queryParams.sortBy]: order };
    }

    const [data, total] = await Promise.all([
        model.find(filter).sort(sort).skip(skip).limit(limit),
        model.countDocuments(filter),
    ]);

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1,
        },
    };
};

module.exports = { paginate };