using System.ComponentModel.DataAnnotations;

namespace AnaYancyPortfolio.Models
{
    public class ContactoModel
    {
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;


        [Required(ErrorMessage = "El correo es obligatorio.")]
        [EmailAddress(ErrorMessage = "Ingresa un correo válido.")]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;


        [Required(ErrorMessage = "El asunto es obligatorio.")]
        [StringLength(150)]
        public string Asunto { get; set; } = string.Empty;


        [Required(ErrorMessage = "El mensaje es obligatorio.")]
        [StringLength(2000)]
        public string Mensaje { get; set; } = string.Empty;
    }
}