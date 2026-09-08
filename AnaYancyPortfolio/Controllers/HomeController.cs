using AnaYancyPortfolio.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.RegularExpressions;
using AnaYancyPortfolio.Services;

namespace AnaYancyPortfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly EmailService _emailService;

        public HomeController(
    ILogger<HomeController> logger,
    EmailService emailService)
        {
            _logger = logger;
            _emailService = emailService;
        }

        // ==========================================
        // SANITIZAR TEXTO
        // ==========================================

        private string SanitizarTexto(string texto)
        {
            if (string.IsNullOrWhiteSpace(texto))
                return string.Empty;

            texto = texto.Trim();

            // Elimina etiquetas HTML
            texto = Regex.Replace(texto, "<.*?>", string.Empty);

            // Elimina caracteres de control
            texto = Regex.Replace(
                texto,
                @"[\x00-\x08\x0B\x0C\x0E-\x1F]",
                ""
            );

            return texto;
        }


        // ==========================================
        // INICIO
        // ==========================================

        public IActionResult Index()
        {
            return View();
        }


        // ==========================================
        // SOBRE MÍ
        // ==========================================

        public IActionResult SobreMi()
        {
            return View();
        }


        // ==========================================
        // HABILIDADES
        // ==========================================

        public IActionResult Habilidades()
        {
            return View();
        }


        // ==========================================
        // PROYECTOS
        // ==========================================

        public IActionResult Proyectos()
        {
            return View();
        }


        // ==========================================
        // CERTIFICACIONES
        // ==========================================

        public IActionResult Certificaciones()
        {
            return View();
        }


        // ==========================================
        // CONTACTO - MOSTRAR FORMULARIO
        // ==========================================

        [HttpGet]
        public IActionResult Contacto()
        {
            return View();
        }


        // ==========================================
        // CONTACTO - RECIBIR FORMULARIO
        // ==========================================

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Contacto(ContactoModel contacto)
        {
            contacto.Nombre = SanitizarTexto(contacto.Nombre);

            contacto.Email = contacto.Email?
                .Trim()
                .ToLower() ?? string.Empty;

            contacto.Asunto = SanitizarTexto(contacto.Asunto);

            contacto.Mensaje = SanitizarTexto(contacto.Mensaje);

            if (!ModelState.IsValid)
            {
                return View(contacto);
            }

            try
            {
                await _emailService.EnviarCorreoAsync(
                    contacto.Nombre,
                    contacto.Email,
                    contacto.Asunto,
                    contacto.Mensaje
                );

                TempData["MensajeEnviado"] =
                    "¡Tu mensaje fue enviado correctamente!";
            }
            catch
            {
                TempData["MensajeError"] =
                    "Hubo un problema al enviar el mensaje.";
            }

            return RedirectToAction(nameof(Contacto));
        }
        // ==========================================
        // PRIVACIDAD
        // ==========================================

        public IActionResult Privacy()
        {
            return View();
        }


        // ==========================================
        // ERROR
        // ==========================================

        [ResponseCache(
            Duration = 0,
            Location = ResponseCacheLocation.None,
            NoStore = true
        )]
        public IActionResult Error()
        {
            return View(
                new ErrorViewModel
                {
                    RequestId =
                        Activity.Current?.Id ??
                        HttpContext.TraceIdentifier
                }
            );
        }
    }
}