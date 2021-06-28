const nodemailer = require("nodemailer");

const correoServidor = process.env.CORREO_USUARIO;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: correoServidor,
    pass: process.env.CORREO_CONTRASENA,
  },
});

exports.enviarCorreoConfirmacion = (
  nombreUsuario,
  correoUsuario,
  codigoConfirmacion
) => {
  transport.sendMail({
    from: correoServidor,
    to: correoUsuario,
    subject: "Por favor confime su cuenta",
    html: `<div>
        <h1>Confirmacion de Correo</h1>
        <h2>Hola, ${nombreUsuario}</h2>
        <p>
          Estamos agradecidos que quiera usar nuestros servicios, por favor
          confirme su cuenta al hacer click en el siguiente enlace:
        </p>
        <a href=${process.env.CLIENT_SERVER_URL}/confirmar/${codigoConfirmacion}>¡Haga Click Aqui!</a>
      </div>`,
  });
};

exports.enviarCorreoAgradecimiento = (nombreUsuario, correoUsuario) => {
  transport.sendMail({
    from: correoServidor,
    to: correoUsuario,
    subject: "Gracias por registrarte",
    html: `<div>
        <h1>¡Gracias por registrarte!</h1>
        <h2>Hola, ${nombreUsuario}</h2>
        <p>
          ¡Estamos agradecidos que hayas registrado y confirmado tu cuenta!. No
          dudes en contactarnos si tienes alguna duda. Para finalizar, aqui te
          dejamos el link a la pagina de inicio de sesion
        </p>
        <a href="${process.env.CLIENT_SERVER_URL}/login">Inicia sesion</a>
      </div>`,
  });
};

exports.enviarCorreoRecuperarContrasena = (
  nombreUsuario,
  idUsuario,
  correoUsuario,
  codigoConfirmacion
) => {
  transport.sendMail({
    from: correoServidor,
    to: correoUsuario,
    subject: "Recuperar contraseña",
    html: `<div>
        <h1>Recuperar Contraseña</h1>
        <h2>Hola, ${nombreUsuario}</h2>
        <p>
          Hemos recibido una solicitud para reiniciar tu contraseña, si no lo
          has hecho tu, por favor ignora este mensaje. Haz click en el siguiente
          enlace si quieres reiniciar tu contraseña.
        </p>
        <a href="${process.env.CLIENT_SERVER_URL}/recuperar/${idUsuario}/${codigoConfirmacion}">¡Haz Click Aqui!</a>
      </div>`,
  });
};

exports.enviarCorreoContrasenaCambiada = (nombreUsuario, correoUsuario) => {
  transport.sendMail({
    from: correoServidor,
    to: correoUsuario,
    subject: "Cambio de contraseña realizado",
    html: `<div>
        <h1>Contraseña cambiada</h1>
        <h2>Hola ${nombreUsuario}</h2>
        <p>
          Haz cambiado tu contraseña con exito. Si tu no has realizado esta
          accion, por favor contactanos por medio de este correo.
        </p>
      </div>`,
  });
};
