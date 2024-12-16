const express = require('express');
const { requireAuth } = require('../middleware/requireAuth');  
const AuthController = require('../controllers/authController');
const AdminController = require('../controllers/adminController');
const lockerController = require("../controllers/lockerController");
const router = express.Router();


// Rotas de administração
router.get('/loginAdm', AdminController.getLogin);
router.post('/loginAdm', AdminController.postLogin);
router.get('/registerAdm', AdminController.getRegister);
router.post('/registerAdm', AdminController.postRegister);
router.get('/approve/:token', AdminController.approveUser);
router.get('/reject/:token', AdminController.rejectUser);
router.get('/logoutAdm', AdminController.logout);

// Rotas de autenticação de usuário
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});
router.post('/login', AuthController.login);

router.get('/register', (req, res) => {
    res.render('register', { error: null });
});
router.post('/register', AuthController.register);

router.get('/reset-password', (req, res) => {
    res.render('reset-password', { error: null });
});
router.post('/reset-password', AuthController.requestPasswordReset);

// Redefinição de senha com token
// Caso o usuário esteja na página de redefinição de senha com token
router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params; // Pega o token da URL
  res.render('reset-password-token', { token, error: null }); // Passa o token para a view
});

router.post('/reset-password/:token', AuthController.resetPassword);

// Confirmação de e-mail com token
router.get('/confirm/:token', AuthController.confirmEmail);

// Rota protegida com autenticação
router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard');
});

// Rota protegida com autenticação
router.get('/profile', requireAuth, (req, res) => {
    res.render('profile');
});

// Logout do usuário
router.get('/logout', AuthController.logout);


router.get('/lockers', lockerController.getLockersPage);

// Rota para renderizar a página de adicionar armário
router.get('/lockers/add', lockerController.getAddLockerPage);

// Rota para adicionar um armário
router.post('/lockers/add', lockerController.postAddLocker);

// Rota para renderizar a página de editar armário
router.get('/lockers/edit/:id', lockerController.getEditLockerPage);

// Rota para atualizar um armário
router.post('/lockers/edit/:id', lockerController.postEditLocker);

// Rota para deletar um armário
router.post('/lockers/delete/:id', lockerController.deleteLocker);





module.exports = router;
