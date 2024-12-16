const lockerService = require('../services/lockerService'); // Supondo que o serviço está em lockerService.js

// Controlador para renderizar a página de armários
exports.getLockersPage = async (req, res) => {
    try {
        const lockers = await lockerService.getAllLockers();
        res.render("admin/lockers", {
            title: 'Gerenciar Armários',
            lockers: lockers,
            error: req.query.error || null
        });
    } catch (error) {
        console.error("Erro ao buscar armários:", error);
        res.redirect("/lockers?error=server");
    }
};

// Controlador para renderizar a página de adicionar armário
exports.getAddLockerPage = (req, res) => {
    res.render("admin/addLocker", {
        title: 'Adicionar Armário',
        locker: null,
        error: req.query.error || null
    });
};

// Controlador para adicionar um armário
exports.postAddLocker = async (req, res) => {
    const lockerData = {
        number: parseInt(req.body.number), // Converte para inteiro
        location: req.body.location,
        status: req.body.status || 'available', // Define um valor padrão se não for fornecido
        etec: req.body.etec,
        userId: req.body.userId ? parseInt(req.body.userId) : null, // Converte para inteiro ou null
        startDate: req.body.startDate ? new Date(req.body.startDate) : null,
        endDate: req.body.endDate ? new Date(req.body.endDate) : null
    };

    try {
        await lockerService.createLocker(lockerData);
        res.redirect("/lockers");
    } catch (error) {
        console.error("Erro ao adicionar armário:", error);
        res.redirect("/lockers/add?error=unknown");
    }
};

// Controlador para renderizar a página de editar armário
exports.getEditLockerPage = async (req, res) => {
    const { id } = req.params;
    try {
        const locker = await lockerService.getLockerById(id);
        if (!locker) {
            return res.redirect("/lockers?error=not_found");
        }
        res.render("admin/editLocker", {
            title: 'Editar Armário',
            locker: locker,
            error: req.query.error || null
        });
    } catch (error) {
        console.error("Erro ao buscar armário:", error);
        res.redirect("/lockers?error=server");
    }
};

// Controlador para atualizar um armário
exports.postEditLocker = async (req, res) => {
    const { id } = req.params;
    const lockerData = req.body;
    try {
        await lockerService.updateLocker(id, lockerData);
        res.redirect("/lockers");
    } catch (error) {
        console.error("Erro ao atualizar armário:", error);
        res.redirect(`/lockers/edit/${id}?error=unknown`);
    }
};

// Controlador para deletar um armário
exports.deleteLocker = async (req, res) => {
    const { id } = req.params;
    try {
        await lockerService.deleteLocker(id);
        res.redirect("/lockers");
    } catch (error) {
        console.error("Erro ao deletar armário:", error);
        res.redirect("/lockers?error=unknown");
    }
};