const prisma = require('../config/database');


// Serviço para buscar todos os armários
exports.getAllLockers = async () => {
    return await prisma.locker.findMany();
};

// Serviço para buscar um armário específico
exports.getLockerById = async (id) => {
    return await prisma.locker.findUnique({ where: { id: parseInt(id) } });
};

// Serviço para criar um armário
exports.createLocker = async (lockerData) => {
    return await prisma.locker.create({
        data: {
            number: lockerData.number,
            location: lockerData.location,
            status: lockerData.status || 'available',
            etec: lockerData.etec,
            userId: lockerData.userId,
            startDate: lockerData.startDate ? new Date(lockerData.startDate) : null,
            endDate: lockerData.endDate ? new Date(lockerData.endDate) : null,
        },
    });
};

// Serviço para atualizar um armário
exports.updateLocker = async (id, lockerData) => {
    return await prisma.locker.update({
        where: { id: parseInt(id) },
        data: {
            number: lockerData.number,
            location: lockerData.location,
            status: lockerData.status,
            etec: lockerData.etec,
            userId: lockerData.userId,
            startDate: lockerData.startDate ? new Date(lockerData.startDate) : null,
            endDate: lockerData.endDate ? new Date(lockerData.endDate) : null,
        },
    });
};

// Serviço para deletar um armário
exports.deleteLocker = async (id) => {
    return await prisma.locker.delete({ where: { id: parseInt(id) } });
};

