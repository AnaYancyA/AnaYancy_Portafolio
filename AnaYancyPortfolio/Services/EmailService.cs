using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace AnaYancyPortfolio.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task EnviarCorreoAsync(
            string nombre,
            string email,
            string asunto,
            string mensaje)
        {
            var emailSettings =
                _configuration.GetSection("EmailSettings");

            string smtpServer =
                emailSettings["SmtpServer"]!;

            int port =
                int.Parse(emailSettings["Port"]!);

            string senderName =
                emailSettings["SenderName"]!;

            string senderEmail =
                emailSettings["SenderEmail"]!;

            string username =
                emailSettings["Username"]!;

            string password =
                emailSettings["Password"]!;


            using var smtp = new SmtpClient(smtpServer)
            {
                Port = port,
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true
            };


            var correo = new MailMessage
            {
                From = new MailAddress(
                    senderEmail,
                    senderName
                ),

                Subject = $"Nuevo mensaje: {asunto}",

                Body = $@"
Nombre: {nombre}

Correo: {email}

Mensaje:

{mensaje}
",

                IsBodyHtml = false
            };


            // El correo llegará a tu mismo correo
            correo.To.Add(senderEmail);


            await smtp.SendMailAsync(correo);
        }
    }
}